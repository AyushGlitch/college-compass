import { SafeAreaView } from 'react-native';

export const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const isDark = false; // TODO: temporary solution

    return (
        <SafeAreaView
            className={`flex-1 ${isDark ? 'bg-stone-900' : 'bg-stone-200'} ${className}`}>
            {children}
        </SafeAreaView>
    );
};
