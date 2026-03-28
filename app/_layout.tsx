import {
    Kanit_400Regular,
    Kanit_600SemiBold,
    Kanit_700Bold,
    useFonts
} from '@expo-google-fonts/kanit';
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from 'react';

// ป้องกัน SplashScreen ปิดตัวเองก่อนที่ Font จะโหลดเสร็จ
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({
        KanitRegular: Kanit_400Regular,
        KanitBold: Kanit_700Bold,
        KanitSemiBold: Kanit_600SemiBold,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const themeColor = "#2E7D32";

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{
                title: "เที่ยวตาก",
                headerTitleAlign: "center",
                headerTitleStyle: { fontFamily: "KanitBold", color: "#ffffff", fontSize: 22 },
                headerStyle: { backgroundColor: themeColor },
                headerTintColor: "#ffffff"
            }} />
            <Stack.Screen name="list" options={{
                title: "รายการ",
                headerTitleAlign: "center",
                headerBackButtonDisplayMode: "minimal",
                headerTitleStyle: { fontFamily: "KanitRegular", color: "#ffffff" },
                headerStyle: { backgroundColor: themeColor },
                headerTintColor: "#ffffff"
            }} />
            <Stack.Screen name="detail" options={{
                title: "รายละเอียด",
                headerTitleAlign: "center",
                headerBackButtonDisplayMode: "minimal",
                headerTitleStyle: { fontFamily: "KanitRegular", color: "#ffffff" },
                headerStyle: { backgroundColor: themeColor },
                headerTintColor: "#ffffff"
            }} />
        </Stack>
    );
}