import React, { useContext, useState } from 'react';
import withObservables from '@nozbe/with-observables';
import { CustomText, Layout, CustomTextInput } from '@CommonComponent';
import { ButtonComponent } from '@SubComponents';
import { AppContext } from '@AppContext';
import { database } from '@Services/Watermelon';
import { FlatList } from 'react-native-gesture-handler';
import { Pressable, StyleSheet, View } from 'react-native';

const db = database.collections.get('categories');
const observeCategories = () => db.query().observe();

const styles = StyleSheet.create({
  centeredView: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnStyle: {
    padding: 10,
  },
  separatorH: {
    height: 10,
  },
});

const Home = ({ posts }: any) => {
  const { appTheme } = useContext(AppContext);

  const [isName, setIsName] = useState('');
  const [isDescription, setIsDescription] = useState('');

  const { centeredView, btnStyle, separatorH } = styles;

  const onSubmit = async () => {
    try {
      if (!isName && !isDescription) {
        return;
      }
      await database
        .write(async () => {
          await database.collections
            .get('categories')
            .create((category: any) => {
              category.name = isName;
              category.description = isDescription;
            });
        })
        .then(e => {
          console.log('e', e);
          setIsName('');
          setIsDescription('');
        });
      //call addCategory function from category model
    } catch (e) {
      console.log('Error creating category:', e);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await database.write(async () => {
        await database.collections
          .get('categories')
          .find(id)
          .then((e: any) => {
            e?.destroyPermanently();
          });
      });
    } catch (e) {
      console.log('Error deleting category:', e);
    }
  };

  const renderItem = ({ item }: any) => {
    const data = item?._raw;
    return (
      <View style={[centeredView, { backgroundColor: appTheme.textBorder }]}>
        <View>
          <CustomText>{`Name: ${data?.name}`}</CustomText>
          <CustomText>{`Description: ${data?.description}`}</CustomText>
        </View>
        <Pressable
          style={[btnStyle, { backgroundColor: appTheme.gray }]}
          onPress={() => deleteCategory(data?.id)}>
          <CustomText>Delete</CustomText>
        </Pressable>
      </View>
    );
  };

  const itemSeparator = () => <View style={separatorH} />;

  return (
    <Layout title="Widgets" padding={20}>
      <CustomTextInput
        placeholder="Enter name"
        value={isName}
        onTextChange={text => setIsName(text)}
        label="Name"
      />
      <CustomTextInput
        placeholder="Enter description"
        value={isDescription}
        onTextChange={text => setIsDescription(text)}
        label="Description"
      />
      <ButtonComponent
        onPress={onSubmit}
        backColor={appTheme.themeColor}
        title="Add Category"
        borderRadius={10}
      />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={itemSeparator}
      />
    </Layout>
  );
};

const enhance = withObservables([], () => ({
  posts: observeCategories(),
}));

export default enhance(Home);
