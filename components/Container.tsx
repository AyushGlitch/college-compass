import { SafeAreaView } from 'react-native';

export const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <SafeAreaView collapsable={false} className={`flex-1 ${className}`}>
            {children}
        </SafeAreaView>
    );
};
