import Groq from 'groq-sdk';
import { Pressable, TextInput, View } from 'react-native';
import CustomButton from '../CustomButton';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useStore } from '~/store/store';
import { useState } from 'react';

const groq = new Groq({
    apiKey: process.env.EXPO_PUBLIC_VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
});

async function getGroqChatCompletion(userInput: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `You are a smart assistant that helps organize emails in college id into categories. Given a category name, generate at least 10 keywords and sender matches without @domain that can be used to filter emails using an "isPresent" function on the email's title and body.
    
        Return the result as a single JavaScript object with this exact format:
        {
            name: 'CATEGORY_NAME',
            keywords: ['keyword1', 'keyword2'],
            senderMatch: ['sender1', 'sender2']
        }
        
        Do not include any explanations or extra text. Only output the object in the exact format. The CATEGORY_NAME must be included in both keywords and senderMatch.`,
            },
            {
                role: 'user',
                content: userInput, // This is the category name like "Sports" or "Finance"
            },
        ],
        model: 'llama3-70b-8192',
    });
}

const AddCategoryModal = ({
    setVisible,
}: {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [customCategoryName, setCustomCategoryName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGroqApiCall = async () => {
        if (!customCategoryName.trim()) {
            setVisible(false);
            return;
        }

        setIsLoading(true);
        try {
            const chatCompletion = await getGroqChatCompletion(
                customCategoryName.trim()
            );
            const rawResponse =
                chatCompletion.choices[0]?.message?.content || '';
            const cleaned = rawResponse
                .replace(/([a-zA-Z0-9_]+):/g, '"$1":') // wrap keys with quotes
                .replace(/'/g, '"'); // replace single quotes with double quotes

            console.log('Cleaned JSON:', cleaned);

            const { addCategory } = useStore.getState();
            const parsedCategory = JSON.parse(cleaned);
            await addCategory(parsedCategory);
        } catch (error: any) {
            alert(`Error! ${error.message}`);
        } finally {
            setIsLoading(false);
            setVisible(false);
        }
    };

    return (
        <View className="absolute inset-0 z-50 items-center justify-between bg-licorice/95 p-4 py-56">
            <View className="w-full flex-row items-center overflow-hidden rounded-full border border-glass bg-licorice shadow-neon-glow">
                <TextInput
                    className="flex-1 px-4 text-xl text-white placeholder:text-white"
                    value={customCategoryName}
                    onChangeText={setCustomCategoryName}
                    placeholder="Enter Category Name"
                />
                <CustomButton
                    title="Add"
                    icon={
                        <AntDesign name="pluscircle" size={24} color="white" />
                    }
                    handlePress={handleGroqApiCall}
                    isLoading={isLoading}
                    containerStyles="rounded-none border-0 border-l"
                />
            </View>

            <Pressable onPress={() => setVisible(false)}>
                <Entypo name="circle-with-cross" size={52} color="white" />
            </Pressable>
        </View>
    );
};

export default AddCategoryModal;
