import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';

interface Email {
    id: string;
    payload: {
        headers: Array<{ name: string; value: string }>;
    };
    labelIds: string[];
}

interface EmailCardProps {
    email: Email;
    category: string;
}

const EmailCard: React.FC<EmailCardProps> = ({ email, category }) => {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    // Extract Sender Information
    const senderHeader = email.payload.headers.find((h) => h.name === 'From');
    const senderName =
        senderHeader?.value.match(/^(.*?)\s*<.*>/)?.[1] ||
        senderHeader?.value ||
        '';
    const labels = email.labelIds || [];
    const isUnread = labels.includes('UNREAD');

    return (
        <View
            className={`relative flex-row items-center gap-2 border-b border-t border-glass p-4 py-2 ${isUnread ? 'bg-gray-900' : ''}`}>
            <View
                className={`absolute inset-y-2 left-2 w-1 rounded-full ${category === 'IMPORTANT' ? 'bg-red-500' : ''}`}
            />
            {/* <View className="w-fit rounded-full bg-black">
                <Image
                    source={{
                        uri:
                            profileImage ||
                            'https://ui-avatars.com/api/?name=' +
                                encodeURIComponent(senderName),
                    }}
                    className={`aspect-square h-12 rounded-full ${isUnread ? '' : 'opacity-60'}`}
                />
            </View> */}

            <View className="flex-1">
                <Text
                    className={`text-lg ${isUnread ? 'font-psemibold text-white' : 'font-pregular text-white/60'}`}>
                    {senderName}
                </Text>
                <Text
                    className={`${isUnread ? 'font-pregular text-white/80' : 'font-plight text-white/30'}`}
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
