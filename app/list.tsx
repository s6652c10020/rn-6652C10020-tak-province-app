import { supabase } from "@/services/supabase";
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PlaceData {
    id: string;
    name: string;
    district: string;
    image_url: string;
    event_date?: string;
}

export default function List() {
    const params = useLocalSearchParams();
    const category = params.category as string;
    const title = params.title as string;

    const [data, setData] = useState<PlaceData[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const fetchData = async () => {
        if (!category) return;
        setLoading(true);
        try {
            const { data: result, error } = await supabase
                .from('tak_places')
                .select('*')
                .eq('category', category);

            if (error) throw error;
            setData(result || []);
        } catch (err: any) {
            Alert.alert("Error", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            title: title || 'รายการ',
            headerRight: () => (
                <TouchableOpacity onPress={fetchData} disabled={loading} style={{ marginRight: 15 }}>
                    <Ionicons name="reload-outline" size={24} color="#FFFFFF" style={{ opacity: loading ? 0.5 : 1 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, loading, title]);

    useEffect(() => {
        fetchData();
    }, [category]);

    const renderItem = ({ item }: { item: PlaceData }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/detail', params: { id: item.id } })}
        >
            {item.image_url ? (
                <Image source={{ uri: item.image_url }} style={styles.image} resizeMode="cover" />
            ) : (
                <View style={[styles.image, { backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }]}>
                    <Ionicons name="image-outline" size={40} color="#999" />
                </View>
            )}

            <View style={styles.textContainer}>
                <Text style={styles.nameText} numberOfLines={2}>{item.name}</Text>
                <View style={styles.locationRow}>
                    <Text style={styles.pinIcon}>{category === 'Festival' ? '📅' : '📍'}</Text>
                    <Text style={styles.districtText} numberOfLines={1}>
                        {category === 'Festival' ? item.event_date : item.district}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading && data.length === 0 ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#2E7D32" />
                    <Text style={styles.loadingText}>กำลังดึงข้อมูล...</Text>
                </View>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    onRefresh={fetchData}
                    refreshing={loading}
                    ListEmptyComponent={
                        <View style={styles.centerContainer}>
                            <Text style={styles.infoText}>ไม่พบข้อมูลในหมวดหมู่นี้</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
    listContent: { padding: 16 },
    card: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 16, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
    image: { width: 120, height: 120 },
    textContainer: { flex: 1, padding: 15, justifyContent: 'center' },
    nameText: { fontFamily: 'KanitBold', fontSize: 17, color: '#333', marginBottom: 8 },
    locationRow: { flexDirection: 'row', alignItems: 'center' },
    pinIcon: { fontSize: 14, marginRight: 6 },
    districtText: { fontFamily: 'KanitRegular', fontSize: 14, color: '#666', flex: 1 },
    loadingText: { marginTop: 10, fontFamily: 'KanitRegular', color: '#2E7D32' },
    infoText: { fontFamily: 'KanitRegular', color: '#999', fontSize: 16 }
});