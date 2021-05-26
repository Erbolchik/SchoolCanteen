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
import jwt from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import AddingMenu from './components/AddingMenu';
import { getFoods } from './api/index';

const App: React.FC = () => {
  const [role, setRole] = useState('admin');
  const [counter, setCounter] = useState<any>([]);
  const [food, setFood] = useState<any>([]);
  const [token, setToken] = useState<any>(localStorage.getItem('token'));
  const history = useHistory();

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t && !!history) {
      setToken(t);
      debugger;
      const persistedToken = jwt(t);
    } else if (!!history) {
      debugger;
      history.push('/login');
    }
  }, []);

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
              <Route exact path="/admin">
                <AdminPanel />
              </Route>
              <Route exact path="/newmenu">
                <AddingMenu />
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
