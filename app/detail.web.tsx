import { supabase } from "@/services/supabase";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const { width } = Dimensions.get('window');

export default function Detail() {
    const { id } = useLocalSearchParams();
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        if (id) fetchDetail();
    }, [id]);

    const fetchDetail = async () => {
        try {
            const { data, error } = await supabase
                .from('tak_places')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setItem(data);
            navigation.setOptions({ title: data.name });
        } catch (err: any) {
            console.error("Error fetching detail:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const openInGoogleMaps = () => {
        const lat = item?.latitude;
        const lng = item?.longtitude || item?.longitude;
        if (lat && lng) {
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            Linking.openURL(url);
        }
    };

    if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#2E7D32" /></View>;
    if (!item) return <View style={styles.center}><Text>ไม่พบข้อมูล</Text></View>;

    return (
        <ScrollView style={styles.container}>
            {item.image_url ? (
                <Image source={{ uri: item.image_url }} style={styles.image} />
            ) : (
                <View style={[styles.image, styles.placeholderImg]}>
                    <Ionicons name="image-outline" size={50} color="#999" />
                </View>
            )}

            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.locationRow}>
                    <Ionicons name="location" size={18} color="#2E7D32" />
                    <Text style={styles.district}>{item.district}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>รายละเอียด</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ตำแหน่งที่ตั้ง</Text>
                    <View style={styles.webPlaceholder}>
                        <Ionicons name="map-outline" size={40} color="#ccc" />
                        <Text style={styles.webText}>แผนที่แสดงเฉพาะบนมือถือ</Text>
                        <Text style={styles.webSubText}>คลิกปุ่มด้านล่างเพื่อดูเส้นทางบน Google Maps</Text>
                    </View>

                    <TouchableOpacity style={styles.mapButton} onPress={openInGoogleMaps}>
                        <Ionicons name="navigate" size={20} color="#fff" />
                        <Text style={styles.mapButtonText}>เปิดใน Google Maps</Text>
                    </TouchableOpacity>
                </View>

                {item.phone && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>ติดต่อ</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                            <Text style={styles.phoneText}>โทร: {item.phone}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: width > 800 ? 800 : width, height: 400, alignSelf: 'center' },
    placeholderImg: { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
    infoContainer: { padding: 20, maxWidth: 800, alignSelf: 'center', width: '100%' },
    name: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    district: { fontSize: 16, color: '#666', marginLeft: 5 },
    section: { marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2E7D32', marginBottom: 10 },
    description: { fontSize: 16, color: '#444', lineHeight: 24 },
    webPlaceholder: {
        height: 200,
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        borderStyle: 'dashed'
    },
    webText: { color: '#666', marginTop: 10, fontWeight: 'bold' },
    webSubText: { color: '#999', fontSize: 12 },
    mapButton: {
        flexDirection: 'row',
        backgroundColor: '#2E7D32',
        padding: 15,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    mapButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
    phoneText: { fontSize: 16, color: '#2196F3', textDecorationLine: 'underline' }
});