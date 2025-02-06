import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    RefreshControl,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { categorizeEmail, fetchEmails } from '~/utils/gmailUtils';
import { Container } from '~/components/Container';
import EmailCard from '~/components/emailSorterComponents/EmailCard';

const EmailSorter = () => {
    const [emails, setEmails] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string>('');

    const getCategorizedEmails = (emails: any) => {
        if (!emails || emails.length === 0) return [];
        const categorizedEmails = emails.reduce((acc: any, email: any) => {
            const category = categorizeEmail(email);
            acc[category] = acc[category] ? [...acc[category], email] : [email];
            return acc;
        }, {});

        // console.log("Categorized emails: ", JSON.stringify(categorizedEmails, null, 4));
        
        return categorizedEmails;
          
    }

    // Fetch Emails Function
    const getEmails = useCallback(async () => {
        try {
            setLoading(true);
            setError(null); // Reset errors
            const fetchedEmails = await fetchEmails();

            if (fetchedEmails) {
                console.log("Fetched emails, categorizing now...");
                
                const catEmails = getCategorizedEmails(fetchEmails);
                console.log(catEmails);
                
                setEmails(catEmails);
            } else {
                setError('No emails found.');
                setEmails([]);
            }
        } catch (err) {
            setError('Failed to fetch emails. Please try again.');
            console.log(err)
            setEmails([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial Fetch on Mount
    useEffect(() => {
        getEmails();
    }, [getEmails]);

    // Pull-to-Refresh Handler
    const onRefresh = async () => {
        setRefreshing(true);
        await getEmails();
        setRefreshing(false);
    };

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
                <FlatList
                    data={emails}
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
                />
            )}
        </Container>
    );
};

export default EmailSorter;
