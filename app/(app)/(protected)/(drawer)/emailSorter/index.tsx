import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    RefreshControl,
} from 'react-native';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Picker } from '@react-native-picker/picker'; // Import Dropdown Picker
import { categorizeEmail, fetchEmails } from '~/utils/gmailUtils';
import { Container } from '~/components/Container';
import EmailCard from '~/components/emailSorterComponents/EmailCard';

const EmailSorter = () => {
    const [emails, setEmails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string>('');
    const [selectedCategory, setSelectedCategory] =
        useState<string>('IMPORTANT'); // Default category

    const getCategorizedEmails = useCallback((emails: any) => {
        if (!emails) return {};

        return emails.reduce((acc: any, email: any) => {
            const category = categorizeEmail(email);
            acc[category] = acc[category] ? [...acc[category], email] : [email];
            return acc;
        }, {});
    }, []);

    const getEmails = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedEmails = await fetchEmails();

            if (fetchedEmails) {
                console.log('Fetched emails, categorizing now...');
                setEmails(getCategorizedEmails(fetchedEmails));
                console.log('Emails categorized successfully.');
            } else {
                setError('No emails found.');
                setEmails([]);
            }
        } catch (err) {
            setError('Failed to fetch emails. Please try again.');
            console.error(err);
            setEmails([]);
        } finally {
            setLoading(false);
        }
    }, [getCategorizedEmails]);

    useEffect(() => {
        getEmails();
    }, [getEmails]);

    const onRefresh = async () => {
        setRefreshing(true);
        await getEmails();
        setRefreshing(false);
    };

    // Memoized list of emails for the selected category
    const filteredEmails = useMemo(
        () => emails?.[selectedCategory] || [],
        [emails, selectedCategory]
    );

    return (
        <Container>
            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#007AFF" />
                </View>
            ) : error ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="font-semibold text-red-500">{error}</Text>
                </View>
            ) : emails.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="font-medium text-gray-500">
                        No emails found.
                    </Text>
                </View>
            ) : (
                <View className="flex-1">
                    {/* Dropdown Menu */}
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) =>
                            setSelectedCategory(itemValue)
                        }
                        className="mb-4 rounded border border-gray-300 p-2">
                        <Picker.Item label="Important" value="IMPORTANT" />
                        <Picker.Item label="Clubs" value="CLUBS" />
                        <Picker.Item label="Mess" value="MESS" />
                        <Picker.Item label="Sports" value="SPORTS" />
                        <Picker.Item label="Others" value="OTHERS" />
                    </Picker>

                    {/* Emails List for Selected Category */}
                    <FlatList
                        data={filteredEmails}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <EmailCard email={item} accessToken={accessToken} />
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#007AFF']}
                            />
                        }
                        ListEmptyComponent={
                            <View className="flex-1 items-center justify-center">
                                <Text className="text-gray-500">
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
