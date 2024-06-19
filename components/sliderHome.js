import { fontFamily } from "@/src/styles/fontFamily"
import React from "react"
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from "react-native"
import { useEffect, useRef, useState } from "react";

const SliderHome = () => {
    
    const flatlistRef = useRef();

	const screenWidth = Dimensions.get("window").width;

	const [activeIndex, setActiveIndex] = useState(0);

	// Auto Scroll
	useEffect(() => {
		let interval = setInterval(() => {
			if (activeIndex === DATA.length - 1) {
				flatlistRef.current.scrollToIndex({
					index: 0,
					animation: true,
				});
			} else {
				flatlistRef.current.scrollToIndex({
					index: activeIndex + 1,
					animation: true,
				});
			}
		}, 2000);

		return () => clearInterval(interval);
	});

	const getItemLayout = (data, index) => ({
		length: screenWidth,
		offset: screenWidth * index, 
		index: index,
	});
    
    const DATA = [
        {
            id: "01",
            image: require('../assets/images/slides/agua.jpg'),   
        },
        {
            id: "02",
            image: require('../assets/images/slides/arvore.jpg'),
        },
        {
            id: "03",
            image: require('../assets/images/slides/borboleta.jpg'),
        },
        {
            id: "04",
            image: require('../assets/images/slides/sol.jpg'),
        }
    ];

    const renderItem = ({item, index}) =>{
        return(
            <View>
                <Image source={item.image} style={{height: 200, width: screenWidth, borderColor: '#D3A9F4', borderWidth: 5}}/>
            </View>
        );
    };

    const handleScroll = (event) => {
		
		const scrollPosition = event.nativeEvent.contentOffset.x;

		const index = scrollPosition / screenWidth;

		setActiveIndex(index);
	};

	const renderDotIndicators = () => {
		return DATA.map((dot, index) => {
			if (activeIndex === index) {
				return (
					<View
						style={{
							backgroundColor: "#57cc99",
							height: 10,
							width: 10,
							borderRadius: 5,
							marginHorizontal: 6,
						}}
					></View>
				);
			} else {
				return (
					<View
						key={index}
						style={{
							backgroundColor: "#7D30E3",
							height: 10,
							width: 10,
							borderRadius: 5,
							marginHorizontal: 6,
						}}
					></View>
				);
			}
		});
	};

    return(
        <View>
            <Text style={styles.textStyle}> Destaques </Text>
			<FlatList
				data={DATA}
				ref={flatlistRef}
				getItemLayout={getItemLayout}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={true}
				pagingEnabled={true}
				onScroll={handleScroll}
			/>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					marginTop: 30,
				}}
			>
				{renderDotIndicators()}
			</View>
		</View>
	);
};

const styles = StyleSheet.create ({
    imageStyle:{
        height: '100%',
        alignSelf: 'center',
        borderRadius: 30,
    },
    textStyle:{
        fontFamily: fontFamily.pmedium,
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
		textAlign: 'center',
    },
})

export default SliderHome;