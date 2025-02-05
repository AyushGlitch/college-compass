import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';

interface Email {
    payload: {
        headers: Array<{ name: string; value: string }>;
    };
}

interface EmailCardProps {
    email: Email;
    accessToken: string;
}

const EmailCard: React.FC<EmailCardProps> = ({ email, accessToken }) => {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // Extract Sender Information
    const senderHeader = email.payload.headers.find((h) => h.name === 'From');
    const senderName =
        senderHeader?.value.match(/^(.*?)\s*<.*>/)?.[1] ||
        senderHeader?.value ||
        '';
    // const senderEmail = senderHeader?.value.match(/<(.*)>/)?.[1] || senderHeader?.value || '';

    // const fetchProfileImage = async () => {
    //     if (!senderEmail) return;

    //     // ✅ Check AsyncStorage first to avoid unnecessary API calls
    //     const cachedImage = await AsyncStorage.getItem(`profile_${senderEmail}`);
    //     if (cachedImage) {
    //         setProfileImage(cachedImage);
    //         return;
    //     }

    //     try {
    //         // ✅ Fetch sender's profile image from Google People API
    //         const response = await fetch(
    //             `https://people.googleapis.com/v1/people/me?personFields=photos`,
    //             {
    //                 headers: { Authorization: `Bearer ${accessToken}` },
    //             }
    //         );

    //         if (!response.ok) {
    //             throw new Error(`Failed to fetch profile image: ${response.statusText}`);
    //         }

    //         const data = await response.json();
    //         const photoUrl = data.photos?.[0]?.url;

    //         if (photoUrl) {
    //             setProfileImage(photoUrl);
    //             await AsyncStorage.setItem(`profile_${senderEmail}`, photoUrl);
    //         } else {
    //             // ✅ Fallback Google profile URL
    //             const fallbackUrl = `https://www.google.com/s2/u/0/photos/public/${senderEmail}`;
    //             setProfileImage(fallbackUrl);
    //             await AsyncStorage.setItem(`profile_${senderEmail}`, fallbackUrl);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching profile image:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchProfileImage();
    // }, [senderEmail, accessToken]); // ✅ Fetch only when senderEmail or accessToken changes

    return (
        <View className="flex-row items-center gap-2 border-b border-gray-300 p-4">
            <Image
                source={{
                    uri:
                        profileImage ||
                        'https://ui-avatars.com/api/?name=' +
                            encodeURIComponent(senderName),
                }}
                className="aspect-square h-12 rounded-full"
            />

            <View className="flex-1">
                <Text className="text-lg font-semibold">{senderName}</Text>
                <Text
                    className="text-gray-500"
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {email.payload.headers.find((h) => h.name === 'Subject')
                        ?.value || 'No Subject'}
                </Text>
            </View>
        </View>
    );
};

export default EmailCard;
