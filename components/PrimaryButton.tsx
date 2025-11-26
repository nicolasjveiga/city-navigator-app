import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

export default function PrimaryButton({ children, onPress, disabled }: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.btn, disabled && { opacity: 0.6 }]}
            disabled={disabled}
        >
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING(1.5),
        paddingHorizontal: SPACING(2),
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        color: '#fff', 
        fontWeight: '700',
    },
});