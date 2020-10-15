import {StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    position: 'relative',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 14,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    flex: 1,
    marginRight: 25,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  error: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red'
  },
  currentPage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue'
  },
  paginationContainer: {
    position: 'absolute',
    width: '97%',
    height: 55,
    bottom: 0,
    left: 0,
    padding: 8,
    marginVertical: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paginationLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  }, 
  paginationCurrent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  paginationRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  }, 
});

export default styles;
