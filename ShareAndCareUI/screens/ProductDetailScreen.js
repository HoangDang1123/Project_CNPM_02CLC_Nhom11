import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  View,
  Button,
  Modal,
  RefreshControl,
  ImageBackground,
} from "react-native";
import ProductFooter from "../components/footer/ProductFooter";
import RateIcon from "../components/icons/RateIcon";
import RightArrowIcon from "../components/icons/RightArrowIcon";
import LeftArrowIcon from "../components/icons/LeftArrowIcon";
import ProductRating from "../components/Item/ProductRating";
import { useCallback, useEffect, useState } from "react";
import { getProductById } from "../API/Product";
import { useNavigation } from "@react-navigation/native";
import { formatCurrency } from "../util/common";

export default function ProductDetailScreen({ route }) {
  const { id } = route.params;

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [productDetail, setProductDetail] = useState();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const product = await getProductById(id);
      setProductDetail(product);
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  }, [id]);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const itemTextWithoutFontWeight = {
    ...styles.itemText,
    fontWeight: undefined,
  };

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const product = await getProductById(id);
        setProductDetail(product);
      } catch (error) {}
    }
    fetchProductDetail();
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, marginBottom: 50 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SafeAreaView style={{ width: "100%" }}>
          <ImageBackground
            source={{ uri: productDetail?.product_thumb }}
            resizeMode="cover"
            style={styles.image}
          >
            <Pressable
              style={{
                minHeight: 350,
                marginTop: 50,
                marginLeft: 20,
                backgroundColor: "transparent",
              }}
              onPress={() => navigation.goBack()}
            >
              <LeftArrowIcon />
            </Pressable>
          </ImageBackground>
        </SafeAreaView>

        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{productDetail?.product_name}</Text>
          <Text style={styles.itemText}>
            {productDetail?.product_price &&
              formatCurrency(productDetail?.product_price)}
          </Text>
          <View style={styles.statisticContainer}>
            <View style={[styles.rowContainer, { paddingRight: 20 }]}>
              <RateIcon color={"#FFC300"} />
              <Text style={styles.statisticText}>
                {productDetail?.product_ratingsAverage}
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          style={styles.detailContainer}
          onPress={handleOpenBottomSheet}
        >
          <Text style={styles.title}>Product Detail</Text>
          <RightArrowIcon />
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isBottomSheetOpen}
          onRequestClose={handleCloseBottomSheet}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Button title="Close" onPress={handleCloseBottomSheet} />

              <View style={styles.detailContent}>
                <Text style={styles.itemText}>Brand: </Text>
                <Text style={itemTextWithoutFontWeight}>
                  {productDetail?.product_attributes.brand}
                </Text>
              </View>

              <View style={styles.detailContent}>
                <Text style={styles.itemText}>Size: </Text>
                <Text style={itemTextWithoutFontWeight}>
                  {productDetail?.product_attributes.size}
                </Text>
              </View>

              <View style={styles.detailContent}>
                <Text style={styles.itemText}>Material: </Text>
                <Text style={itemTextWithoutFontWeight}>
                  {productDetail?.product_attributes.material}
                </Text>
              </View>
            </View>
          </View>
        </Modal>

        <View
          style={[
            styles.detailContainer,
            { flexDirection: "column", alignItems: "flex-start" },
          ]}
        >
          <Text style={[styles.title, { marginBottom: 10 }]}>
            Product Description
          </Text>
          <Text style={styles.contentText}>
            {productDetail?.product_description}
          </Text>
        </View>

        <ProductRating
          productId={id}
          rating={productDetail?.product_ratingAverage}
        />
      </ScrollView>
      <View style={{ position: "absolute", bottom: 0, maginTop: 20 }}>
        <ProductFooter />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    Height: 350,
    flex: 1,
  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    height: 80,
    marginVertical: 10,
  },
  otherImage: {
    width: 80,
    maxHeight: "100%",
    marginHorizontal: 5,
  },
  itemStyles: {
    display: "flex",
    overflow: "hidden",
  },
  itemContainer: {
    marginHorizontal: 5,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 5,
  },
  statisticContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statisticText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  detailContainer: {
    width: "100%",
    backgroundColor: "#E8E8E8",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: "start",
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 16,
  },
  moreText: {
    fontSize: 16,
    color: "#38A59F",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
  },
  detailContent: {
    flexDirection: "row",
    marginVertical: 10,
  },
});
