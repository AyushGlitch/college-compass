import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchEmails } from '~/utils/gmailUtils';
import { Container } from '~/components/Container';
import EmailCard from '~/components/emailSorterComponents/EmailCard';

const EmailSorter = () => {
    const [emails, setEmails] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [accessToken, setAccessToken] = useState<string>('');

    useEffect(() => {
        const getEmails = async () => {
            setLoading(true);
            const fetchedEmails = await fetchEmails();
            setEmails(fetchedEmails);
            setLoading(false);
        };

        getEmails();
    }, []);

    return (
        <Container>
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#007AFF"
                    className="flex-1 items-center justify-center"
                />
            ) : (
                <FlatList
                    data={emails}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <EmailCard email={item} accessToken={accessToken} />}
                />
            )}
        </Container>
    );
};

export default EmailSorter;
