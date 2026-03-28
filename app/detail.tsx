import { supabase } from "@/services/supabase";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

let MapView: any = null;
let Marker: any = null;

if (Platform.OS !== 'web') {
    try {
        const MapModule = require('react-native-maps');
        MapView = MapModule.default;
        Marker = MapModule.Marker;
    } catch (e) {
        console.warn("Map module not found");
    }
}

// ดึงทั้ง width และ height ของหน้าจอมาใช้
const { width, height } = Dimensions.get('window');

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
        if (item?.latitude && item?.longtitude) {
            const url = `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longtitude}`;
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
                <View style={[styles.image, { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
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
                    {Platform.OS !== 'web' && MapView && item.latitude && item.longtitude ? (
                        <View style={styles.mapWrapper}>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: parseFloat(item.latitude),
                                    longitude: parseFloat(item.longtitude),
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                                scrollEnabled={false}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: parseFloat(item.latitude),
                                        longitude: parseFloat(item.longtitude)
                                    }}
                                    title={item.name}
                                />
                            </MapView>
                        </View>
                    ) : (
                        <View style={styles.webPlaceholder}>
                            <Ionicons name="map-outline" size={40} color="#ccc" />
                            <Text style={styles.webText}>ดูแผนที่ผ่านปุ่มนำทางด้านล่าง</Text>
                        </View>
                    )}

                    <TouchableOpacity style={styles.mapButton} onPress={openInGoogleMaps}>
                        <Ionicons name="navigate" size={20} color="#fff" />
                        <Text style={styles.mapButtonText}>นำทางด้วย Google Maps</Text>
                    </TouchableOpacity>
                </View>

                {item.phone && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>ติดต่อ</Text>
                        <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                            <Text style={[styles.description, { color: '#2196F3' }]}>โทร: {item.phone}</Text>
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
    // แก้ไขความสงของภาพที่แสดง
    image: { width: width * 1.0, height: height * 1.0 },
    infoContainer: { padding: 20 },
    name: { fontFamily: 'KanitBold', fontSize: 24, color: '#333', marginBottom: 5 },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    district: { fontFamily: 'KanitRegular', fontSize: 16, color: '#666', marginLeft: 5 },
    section: { marginBottom: 20 },
    sectionTitle: { fontFamily: 'KanitBold', fontSize: 18, color: '#2E7D32', marginBottom: 10 },
    description: { fontFamily: 'KanitRegular', fontSize: 16, color: '#444', lineHeight: 24 },
    mapWrapper: { height: 200, borderRadius: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#ddd' },
    map: { flex: 1 },
    webPlaceholder: { height: 150, backgroundColor: '#f5f5f5', borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc' },
    webText: { fontFamily: 'KanitRegular', color: '#999', marginTop: 10 },
    mapButton: { flexDirection: 'row', backgroundColor: '#2E7D32', padding: 15, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    mapButtonText: { fontFamily: 'KanitBold', color: '#fff', fontSize: 16, marginLeft: 8 }
});