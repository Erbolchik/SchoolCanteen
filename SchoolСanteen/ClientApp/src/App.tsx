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
import { basketOutline, cardOutline, personCircleOutline, settingsOutline } from 'ionicons/icons';
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
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import { ItemList } from './api/models';
import OrderHistory from './pages/OrderHistory';
import { useHistory } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import AddingMenu from './components/AddingMenu';
import { getFoods, getMyRole } from './api/index';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  const [role, setRole] = useState();
  const [counter, setCounter] = useState<any>([]);
  const [food, setFood] = useState<any>([]);
  const [updateFood, setUpdateFood] = useState(false);
  const [token, setToken] = useState<any>(localStorage.getItem('token'));
  console.log(role);

  useEffect(() => {
    !!token && getMyRole().then((res) => setRole(res.data));
  }, [token]);

  useEffect(() => {
    if (updateFood) {
      setUpdateFood(false);
      getFoods().then((res) => setFood(res.data));
    }
  }, [updateFood]);

  useEffect(() => {
    getFoods().then((res) => setFood(res.data));
  }, []);

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

  return (
    <IonApp>
      <IonReactRouter>
        <Context.Provider
          value={{
            role: null,
            basket: null,
            token,
            counter: counter as any,
            menuItems: food as any,
            setToken,
            addItem,
            removeItem,
            setCounter,
            setUpdateFood,
          }}>
          <IonTabs>
            <IonRouterOutlet>
              <PrivateRoute exact path="/menu" component={Tab1}></PrivateRoute>
              <PrivateRoute exact path="/order" component={Tab2}></PrivateRoute>
              <PrivateRoute path="/profile" component={Tab3}></PrivateRoute>
              <PrivateRoute exact path="/">
                <Redirect to="/menu" />
              </PrivateRoute>
              <Route exact path="/login" component={Login}></Route>
              <PrivateRoute exact path="/history" component={OrderHistory}></PrivateRoute>
              <PrivateRoute exact path="/admin" component={AdminPanel}></PrivateRoute>
              <PrivateRoute exact path="/newmenu" component={AddingMenu}></PrivateRoute>
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
              {role === 'Administrator' && (
                <IonTabButton tab="admin" href="/admin">
                  <IonIcon icon={settingsOutline} />
                  <IonLabel>Панель</IonLabel>
                </IonTabButton>
              )}
              <IonTabButton tab="profile" href="/profile">
                <IonIcon icon={personCircleOutline} />
                <IonLabel>Профиль</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Context.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
