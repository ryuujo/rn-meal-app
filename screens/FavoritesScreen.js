import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import MealList from '../components/MealList';
import HeaderButton from '../components/HeaderButton';

const FavoritesScreen = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);
  if (favMeals.length > 0) {
    return <MealList listData={favMeals} navigation={props.navigation} />;
  } else {
    return (
      <View style={styles.empty}>
        <Text style={styles.textEmpty}>Nothing in favorites</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textEmpty: {
    fontFamily: 'open-sans',
    fontSize: 20
  }
});

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default FavoritesScreen;
