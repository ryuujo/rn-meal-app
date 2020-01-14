import React from 'react';
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration} MINUTES</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
      <View style={styles.tags}>
        {selectedMeal.isGlutenFree ? (
          <View style={styles.tagContainer}>
            <Text>Glutten-Free</Text>
          </View>
        ) : null}
        {selectedMeal.isLactoseFree ? (
          <View style={styles.tagContainer}>
            <Text>Lactose-Free</Text>
          </View>
        ) : null}
        {selectedMeal.isVegan ? (
          <View style={styles.tagContainer}>
            <Text>Vegan</Text>
          </View>
        ) : null}
        {selectedMeal.isVegetarian ? (
          <View style={styles.tagContainer}>
            <Text>Vegetarian</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log('Mark as Favorite');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  listItem: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  },
  tags: {
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 15,
    flexWrap: 'wrap'
  },
  tagContainer: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 50,
    margin: 5
  }
});

export default MealDetailScreen;
