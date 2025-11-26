import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

type Props = {
    children: ReactNode; 
    scroll?: boolean; 
    contentStyle?:any 
};

export default function ScreenContainer({ children, scroll = true, contentStyle }: Props) {
    if (scroll) {
        return (
            <ScrollView contentContainerStyle={[styles.container, contentStyle]}>
                {children}
            </ScrollView>
        );
    }
    return <View style={[styles.container, contentStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        padding: SPACING(2),
        backgroundColor: COLORS.white,
    },
});