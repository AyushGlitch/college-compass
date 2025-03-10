import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import React from 'react';

const CustomButton = ({
    title,
    icon,
    isLoading,
    isSubmitting,
    handlePress,
    containerStyles,
    textStyles,
    ...props
}: {
    title: string;
    icon?: React.ReactNode;
    isLoading?: boolean;
    isSubmitting?: boolean;
    containerStyles?: string;
    textStyles?: string;
    handlePress?: () => void;
}) => {
    return (
        <TouchableOpacity
            className={`items-center justify-center rounded-full border border-glass bg-glass bg-primary p-4 shadow-neon-glow backdrop-blur-lg active:shadow-neon-glow ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            onPress={handlePress}
            disabled={isLoading}
            activeOpacity={0.7}
            {...props}>
            <View className="flex-row items-center justify-center gap-2">
                {isSubmitting ? <ActivityIndicator color="white" /> : icon}
                <Text
                    className={`text-aquamarine text-center font-psemibold text-lg ${textStyles}`}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton;
