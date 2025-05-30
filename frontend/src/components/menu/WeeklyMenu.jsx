import React, { useState } from 'react';

const WeeklyMenu = () => {
  const [activeDay, setActiveDay] = useState('monday');

  const menuData = {
    monday: {
      breakfast: ['Paratha', 'Omelette', 'Tea', 'Jam'],
      lunch: ['Chicken Biryani', 'Raita', 'Salad', 'Dessert'],
      dinner: ['Chicken Curry', 'Roti', 'Rice', 'Vegetable', 'Tea']
    },
    tuesday: {
      breakfast: ['Bread', 'Fried Egg', 'Tea', 'Butter'],
      lunch: ['Daal', 'Rice', 'Salad', 'Yogurt'],
      dinner: ['Chicken Karahi', 'Naan', 'Vegetable', 'Kheer']
    },
    wednesday: {
      breakfast: ['Halwa Puri', 'Channay', 'Tea'],
      lunch: ['Pulao', 'Raita', 'Salad'],
      dinner: ['Beef Curry', 'Roti', 'Rice', 'Seasonal Vegetable']
    },
    thursday: {
      breakfast: ['Aloo Paratha', 'Yogurt', 'Tea'],
      lunch: ['Mix Vegetable', 'Rice', 'Raita'],
      dinner: ['Chicken Qorma', 'Naan', 'Salad', 'Custard']
    },
    friday: {
      breakfast: ['Omelette', 'Bread', 'Jam', 'Tea'],
      lunch: ['Chicken Pulao', 'Raita', 'Salad'],
      dinner: ['Fish', 'Rice', 'Daal', 'Roti']
    },
    saturday: {
      breakfast: ['Nashta Paratha', 'Omelette', 'Tea'],
      lunch: ['Beef Biryani', 'Raita', 'Salad'],
      dinner: ['Chicken Handi', 'Naan', 'Rice Pudding']
    },
    sunday: {
      breakfast: ['Poori', 'Halwa', 'Omelette', 'Tea'],
      lunch: ['Special Biryani', 'Zarda', 'Raita', 'Salad'],
      dinner: ['BBQ', 'Naan', 'Chutney', 'Soft Drinks']
    }
  };

  const styles = {
    container: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '30px',
      fontSize: '28px',
      fontWeight: 'bold',
    },
    daySelector: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '30px',
    },
    dayButton: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      textTransform: 'capitalize',
      transition: 'all 0.3s ease'
    },
    activeButton: {
      backgroundColor: '#3498db',
      color: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    },
    inactiveButton: {
      backgroundColor: '#ecf0f1',
      color: '#34495e',
      '&:hover': {
        backgroundColor: '#d5dbdb'
      }
    },
    menuCard: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      padding: '20px',
      marginBottom: '20px',
    },
    mealType: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '10px 15px',
      borderRadius: '5px',
      display: 'inline-block',
      marginBottom: '15px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: '14px'
    },
    mealItems: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    mealItem: {
      padding: '8px 0',
      borderBottom: '1px solid #ecf0f1',
      display: 'flex',
      alignItems: 'center',
    },
    foodIcon: {
      marginRight: '10px',
      color: '#e67e22',
    },
    mealsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    }
  };

  const getDayButtonStyle = (day) => {
    return {
      ...styles.dayButton,
      ...(activeDay === day ? styles.activeButton : styles.inactiveButton)
    };
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Weekly Hostel Menu</h2>
      
      <div style={styles.daySelector}>
        {Object.keys(menuData).map(day => (
          <button 
            key={day} 
            onClick={() => setActiveDay(day)}
            style={getDayButtonStyle(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div style={styles.mealsContainer}>
        <div style={styles.menuCard}>
          <div style={styles.mealType}>Breakfast</div>
          <ul style={styles.mealItems}>
            {menuData[activeDay].breakfast.map((item, index) => (
              <li key={index} style={styles.mealItem}>
                <span style={styles.foodIcon}>🍽️</span> {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div style={styles.menuCard}>
          <div style={styles.mealType}>Lunch</div>
          <ul style={styles.mealItems}>
            {menuData[activeDay].lunch.map((item, index) => (
              <li key={index} style={styles.mealItem}>
                <span style={styles.foodIcon}>🍲</span> {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div style={styles.menuCard}>
          <div style={styles.mealType}>Dinner</div>
          <ul style={styles.mealItems}>
            {menuData[activeDay].dinner.map((item, index) => (
              <li key={index} style={styles.mealItem}>
                <span style={styles.foodIcon}>🍛</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeeklyMenu;