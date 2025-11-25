import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

export default function Input(props: any) {
    return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: COLORS.muted,
        padding: SPACING(1),
        borderRadius: RADIUS.sm,
        marginBottom: SPACING(1),
        textAlignVertical: 'top',
    },
});