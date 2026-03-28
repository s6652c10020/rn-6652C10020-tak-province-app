import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');

const categories = [
    { id: 'Attraction', title: 'สถานที่ท่องเที่ยว', icon: '⛰️', color: '#4CAF50' },
    { id: 'Restaurant', title: 'ร้านอาหารแนะนำ', icon: '🍽️', color: '#FF9800' },
    { id: 'Cafe', title: 'คาเฟ่ & ของหวาน', icon: '☕', color: '#795548' },
    { id: 'Temple', title: 'วัดและศาสนสถาน', icon: '🛕', color: '#9C27B0' },
    { id: 'Festival', title: 'งานประเพณีประจำปี', icon: '🎆', color: '#E91E63' },
];

export default function Home() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Section พร้อมรูป Cover */}
            <View style={styles.headerSection}>
                <Image
                    source={require('../assets/images/Namtok_Tak.jpg')}
                    style={styles.heroImage}
                    // แก้ไขตรงนี้ให้รองรับ Web และ Mobile ได้ดีขึ้น
                    resizeMode="cover"
                />

                {/* กล่องข้อมูลจังหวัดที่ลอยทับรูปขึ้นมา */}
                <View style={styles.provinceInfo}>
                    <Text style={styles.provinceName}>จังหวัดตาก (Tak)</Text>
                    <Text style={styles.slogan}>"ธรรมชาติน่ายล ภูมิพลเขื่อนใหญ่ พระเจ้าตากเกรียงไกร เมืองไม้และป่างาม"</Text>
                    <View style={styles.divider} />
                    <Text style={styles.description}>
                        จังหวัดตาก เป็นจังหวัดในภาคเหนือตอนล่าง มีพื้นที่กว้างใหญ่เป็นอันดับ 4 ของประเทศ โดดเด่นด้วยธรรมชาติ ป่าไม้ น้ำตก และความหลากหลายทางวัฒนธรม{"\n"} ทั้งนี้ยังมีแหล่งท่องเที่ยวที่น่าสนใจมากมาย เช่น อุทยานแห่งชาติแม่เมย น้ำตกทีลอซู วัดพระบรมธาตุแม่ตากน้อย และตลาดริมเมย ที่จะทำให้คุณได้สัมผัสกับความงามและวัฒนธรรมของจังหวัดตากอย่างเต็มที่
                    </Text>
                </View>
            </View>

            {/* ส่วนเมนูเลือกหมวดหมู่ */}
            <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>เลือกหมวดหมู่การท่องเที่ยว</Text>
                <View style={styles.grid}>
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            activeOpacity={0.8}
                            style={[styles.menuCard, { borderLeftColor: cat.color, borderLeftWidth: 5 }]}
                            onPress={() => router.push({
                                pathname: '/list',
                                params: { category: cat.id, title: cat.title }
                            })}
                        >
                            <Text style={styles.menuIcon}>{cat.icon}</Text>
                            <Text style={styles.menuTitle}>{cat.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#defff4' },
    headerSection: { backgroundColor: '#d4fff1', paddingBottom: 10 },
    heroImage: { width: '100%', height: 280 },
    provinceInfo: {
        padding: 24,
        marginTop: -50,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 25,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 }
    },
    provinceName: { fontFamily: 'KanitBold', fontSize: 28, color: '#2E7D32', textAlign: 'center', marginBottom: 8 },
    slogan: { fontFamily: 'KanitSemiBold', fontSize: 15, color: '#D84315', textAlign: 'center', marginBottom: 12, fontStyle: 'italic', lineHeight: 22 },
    divider: { height: 2, width: 50, backgroundColor: '#E0E0E0', alignSelf: 'center', marginBottom: 12 },
    description: { fontFamily: 'KanitRegular', fontSize: 14, color: '#555', textAlign: 'center', lineHeight: 22 },
    menuSection: { padding: 20 },
    sectionTitle: { fontFamily: 'KanitBold', fontSize: 20, color: '#333', marginBottom: 18, marginLeft: 5 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    menuCard: {
        width: '48%',
        backgroundColor: '#fff',
        paddingVertical: 25,
        paddingHorizontal: 10,
        borderRadius: 18,
        marginBottom: 16,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 }
    },
    menuIcon: { fontSize: 38, marginBottom: 12 },
    menuTitle: { fontFamily: 'KanitSemiBold', fontSize: 15, color: '#444', textAlign: 'center' }
});