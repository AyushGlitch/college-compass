import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Pressable,
} from 'react-native';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Picker } from '@react-native-picker/picker'; // Import Dropdown Picker
import { categorizeEmail, fetchEmails } from '~/utils/gmailUtils';
import { Container } from '~/components/Container';
import EmailCard from '~/components/emailSorterComponents/EmailCard';
import { useRouter } from 'expo-router';
import { useStore } from '~/store/store';
import AddCategoryModal from '~/components/emailSorterComponents/AddCategoryModal';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const EmailSorter = () => {
    const [categorizedEmails, setCategorizedEmails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string>('');
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] =
        useState<string>('IMPORTANT');

    // const { categories } = useStore();
    // console.log(JSON.stringify(categories, null, 2));

    const router = useRouter();

    const handleDeleteCategory = async () => {
        const { removeCategory } = useStore.getState();
        try {
            await removeCategory(selectedCategory);
            alert('Deleted category: ' + selectedCategory);
        } catch (error: any) {
            alert('Error! ' + error.message);
        }
    };

    const getCategorizedEmails = useCallback((emails: any) => {
        if (!emails) return {};

        return emails.reduce((acc: any, email: any) => {
            const categories = categorizeEmail(email);
            email.categories = categories;

            // Add email to each category bucket
            categories.forEach((category: string) => {
                acc[category] = acc[category]
                    ? [...acc[category], email]
                    : [email];
            });
            return acc;
        }, {});
    }, []);

    const getEmails = useCallback(
        async (forceRefresh = false) => {
            const {
                emails: storedEmails,
                lastFetched,
                loadEmailsFromDB,
                setEmails,
            } = useStore.getState();

            const now = Date.now();
            const THROTTLE_TIME = 60 * 1000; // 60 seconds

            try {
                setLoading(true);
                setError(null);

                // 🛑 If last fetch was within 60s & not a manual refresh, load from SQLite
                if (
                    !forceRefresh &&
                    lastFetched &&
                    now - lastFetched < THROTTLE_TIME
                ) {
                    console.log('Using cached emails from SQLite.');
                    await loadEmailsFromDB();
                    setCategorizedEmails(getCategorizedEmails(storedEmails));
                    return;
                }

                console.log('Fetching new emails from Gmail API...');
                const fetchedEmails = await fetchEmails();
                await setEmails(fetchedEmails); // Save to SQLite & update Zustand state

                setCategorizedEmails(getCategorizedEmails(fetchedEmails));
            } catch (err) {
                setError('Failed to fetch emails. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        },
        [getCategorizedEmails]
    );

    useEffect(() => {
        getEmails();
    }, [getEmails]);

    const onRefresh = async () => {
        setRefreshing(true);
        await getEmails(true); // Force reload = true
        setRefreshing(false);
    };

    // Memoized list of emails for the selected category
    const filteredEmails = useMemo(() => {
        if (selectedCategory === 'ALL') {
            const uniqueEmails = new Map(); // Uses email.id as key
            Object.values(categorizedEmails || {})
                .flat()
                .forEach((email: any) => {
                    if (!uniqueEmails.has(email.id)) {
                        uniqueEmails.set(email.id, email);
                    }
                });
            return Array.from(uniqueEmails.values());
        }
        return categorizedEmails?.[selectedCategory] || [];
    }, [categorizedEmails, selectedCategory]);

    return (
        <Container className="bg-licorice">
            {/* Utility Buttons */}
            <View className="mt-4 flex-row items-center justify-center self-center overflow-hidden rounded-full border border-glass">
                <Pressable
                    onPress={() => setShowAddCategoryModal(true)}
                    className="p-4 active:opacity-60">
                    <Text className="font-psemibold text-sm text-white ">
                        Add Category
                    </Text>
                </Pressable>
                <Pressable
                    className="border-l border-glass bg-red-600 p-4 active:opacity-60"
                    onPress={handleDeleteCategory}>
                    {/* TODO: Complete this */}
                    <MaterialIcons
                        name="delete-forever"
                        size={20}
                        color="white"
                    />
                </Pressable>
            </View>

            {/* Add Category Modal */}
            {showAddCategoryModal && (
                <AddCategoryModal setVisible={setShowAddCategoryModal} />
            )}

            {/* Main Content */}
            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="white" />
                </View>
            ) : error ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="font-semibold text-red-500">{error}</Text>
                </View>
            ) : !categorizedEmails || categorizedEmails.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="font-medium text-aquamarine">
                        No emails found.
                    </Text>
                </View>
            ) : (
                <View className="flex-1">
                    {/* Dropdown Menu */}
                    <View className="m-4 rounded-full border border-glass bg-licorice p-2 shadow-neon-glow backdrop-blur-lg">
                        <Picker
                            selectedValue={selectedCategory}
                            onValueChange={(itemValue) =>
                                setSelectedCategory(itemValue)
                            }
                            className="mb-4 p-2"
                            style={{
                                color: '#99edcc',
                                fontWeight: '700',
                            }}
                            dropdownIconColor="#99edcc"
                            itemStyle={{
                                backgroundColor: '#0b0014',
                                color: '#ff7094',
                            }}
                            mode="dropdown">
                            <Picker.Item label="ALL" value="ALL" />
                            {Object.keys(categorizedEmails).map(
                                (category, i) => (
                                    <Picker.Item
                                        key={`${category}-${i}`}
                                        label={category}
                                        value={category}
                                    />
                                )
                            )}
                        </Picker>
                    </View>

                    {/* Emails List for Selected Category */}
                    <FlatList
                        data={filteredEmails}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname:
                                            '/(app)/(protected)/(drawer)/emailSorter/emailDetail',
                                        params: {
                                            email: JSON.stringify(item),
                                        },
                                    })
                                }>
                                <EmailCard
                                    email={item}
                                    category={item.categories}
                                />
                            </Pressable>
                        )}
                        // contentContainerClassName="flex-1"
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#007AFF']}
                            />
                        }
                        ListEmptyComponent={
                            <View className="flex-1 items-center justify-center">
                                <Text className="p-6 text-white/60">
                                    No emails in this category.
                                </Text>
                            </View>
                        }
                    />
                </View>
            )}
        </Container>
    );
};

export default EmailSorter;

// New Component (add category modal)
