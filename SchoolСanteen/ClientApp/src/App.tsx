import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { basketOutline, cardOutline, personCircleOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Context } from './defaults';
import { useState } from 'react';
import Login from './pages/Login';
import { ItemList } from './api/models';
import OrderHistory from './pages/OrderHistory';

const App: React.FC = () => {
  const [role, setRole] = useState('student');
  const [counter, setCounter] = useState<any>([]);
  const [token, setToken] = useState<any>(localStorage.getItem('token'));

  let itemList: ItemList[] = [];

  const addItem = (id: any) => {
    itemList = counter;
    if (itemList.length < 1) {
      setCounter([{ ...counter, id, count: 1 }]);
    } else {
      if (itemList.some((el) => el.id === id)) {
        setCounter(
          itemList.map((el) => {
            if (el.id === id) {
              return { ...el, count: Number(el.count) + 1 };
            } else {
              return el;
            }
          }),
        );
      } else {
        setCounter([...counter, { id, count: 1 }]);
      }
    }
  };

  const removeItem = (id: any) => {
    itemList = counter;
    if (itemList.find((el) => el.id === id)?.count === 1) {
      if (itemList.length !== 1) {
        itemList = itemList.filter((el) => el.id !== id);

        setCounter(
          itemList.map((el) => {
            if (el.id === id) {
              if (el.count === 0) {
                return;
              } else {
                return { ...el, count: Number(el.count) - 1 };
              }
            } else {
              return el;
            }
          }),
        );
      } else {
        setCounter([]);
      }
    } else {
      setCounter(
        itemList.map((el) => {
          if (el.id === id) {
            if (el.count === 0) {
              return;
            } else {
              return { ...el, count: Number(el.count) - 1 };
            }
          } else {
            return el;
          }
        }),
      );
    }
  };

  const menuItems = [
    {
      id: 1,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 2,
      img: 'https://img.buzzfeed.com/video-api-prod/assets/7500687a06b34ee29c84a044861a01fc/BFV9770_DoubleCheeseburgerasmadebyErikAnderson-Thumb1080SQ.jpg?output-format=auto&output-quality=auto',
      name: 'Double Cheese Burger ',
      desc: 'Its a mutherfucing BURGEEEEEEEEEEEEEEEEEEEER',
      price: 250,
    },
    {
      id: 3,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 4,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 5,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 6,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 7,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 8,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 9,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 10,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 11,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 12,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },

    {
      id: 13,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 14,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 15,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
    {
      id: 16,
      img: 'https://assets3.thrillist.com/v1/image/2919049/1200x630/flatten;crop_down;jpeg_quality=70',
      name: 'Pizza',
      desc: 'Its cool meal',
      price: 250,
    },
  ];

  return (
    <IonApp>
      <IonReactRouter>
        <Context.Provider
          value={{
            role: null,
            basket: null,
            token,
            counter: counter as any,
            menuItems: menuItems as any,
            setToken,
            addItem,
            removeItem,
          }}>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/menu">
                <Tab1 />
              </Route>
              <Route exact path="/order">
                <Tab2 />
              </Route>
              <Route path="/profile">
                <Tab3 />
              </Route>
              <Route exact path="/">
                <Redirect to="/menu" />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/history">
                <OrderHistory />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="menu" href="/menu">
                <IonIcon icon={basketOutline} />
                <IonLabel>Меню</IonLabel>
              </IonTabButton>
              <IonTabButton tab="order" href="/order">
                <IonIcon icon={cardOutline} />
                <IonLabel>Корзина</IonLabel>
              </IonTabButton>
              {role === 'admin' && (
                <IonTabButton tab="order" href="/order">
                  <IonIcon icon={cardOutline} />
                  <IonLabel>Корзина</IonLabel>
                </IonTabButton>
              )}
              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={personCircleOutline} />
                <IonLabel>Профиль</IonLabel>
              </IonTabButton>

              <IonTabButton tab="login" href="/login">
                <IonIcon icon={personCircleOutline} />
                <IonLabel>Login</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Context.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
