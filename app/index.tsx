import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

const takImg = require("../assets/images/LogoTak.png");

export default function Index() {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/home");
        }, 3000);
        return () => clearTimeout(timer); // เคลียร์ Timer ป้องกัน Memory Leak
    }, []);

    return (
        <View style={styles.container}>
            <Image source={takImg} style={styles.showImg} resizeMode="contain" />
            <Text style={styles.ShowAppName}>มหัศจรรย์ตาก</Text>
            <Text style={styles.ShowAppDetail}>
                ธรรมชาติน่ายล ภูมิพลเขื่อนใหญ่{"\n"}พระเจ้าตากเกรียงไกร เมืองไม้และป่างาม
            </Text>
            <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 30 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F4FBF4",
        padding: 20,
    },
    showImg: {
        width: 250,
        height: 250,
        borderRadius: 125,
        marginBottom: 20,
    },
    ShowAppName: {
        fontFamily: "KanitBold",
        fontSize: 32,
        color: "#2E7D32",
        marginTop: 10,
    },
    ShowAppDetail: {
        fontFamily: "KanitRegular",
        fontSize: 16,
        color: "#555555",
        marginTop: 15,
        textAlign: "center",
        lineHeight: 26,
    }
});