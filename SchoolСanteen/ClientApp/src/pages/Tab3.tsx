import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonModal,
  IonText,
} from '@ionic/react';
import { useEffect, useState, useContext } from 'react';
import { getLoggerUser, getMyOrders } from '../api';
import { User } from '../api/models';
import './Tab3.css';
import { calendarOutline, callOutline, mailOutline, personOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { Context } from '../defaults';

const Tab3: React.FC = () => {
  const { token, setToken } = useContext(Context);
  const [loggedUser, setLoggedUser] = useState<User>();
  const [myOrders, setMyOrders] = useState();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getLoggerUser().then(({ data }) => setLoggedUser(data));
    getMyOrders().then(({ data }) => setMyOrders(data));
  }, []);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t && !!history) {
      setToken(t);
    } else if (!!history) {
      debugger;
      history.push('/login');
    }
  }, [history, setToken, token]);

  const routeChange = () => {
    history.push('/history');
  };

  const orderHistory = [
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },

    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
  ];

  return (
    <IonPage>
      <IonHeader translucent={true} mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="light">
              <IonIcon slot="start" name="ios-arrow-back">
                Favorites
              </IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>&nbsp;</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="mail-outline"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen slot="fixed">
        <IonModal isOpen={showModal}>
          {showModal && (
            <IonPage>
              <IonHeader translucent={true} mode="ios">
                <IonTitle>История заказов</IonTitle>
              </IonHeader>

              <IonList style={{ marginTop: 15 }} lines="inset">
                {myOrders &&
                  // @ts-ignore
                  myOrders.map((item, index) => {
                    return (
                      <IonItem key={index}>
                        <IonLabel style={{ marginRight: '15px' }}>
                          <h3>Заказ №{item.id}</h3>
                          <p>Дата: {item.date}</p>
                        </IonLabel>
                        <IonText>{item.summ}</IonText>
                      </IonItem>
                    );
                  })}
              </IonList>
              <IonButton color="secondary" size="default" onClick={() => setShowModal(false)}>
                Закрыть
              </IonButton>
            </IonPage>
          )}
        </IonModal>
        <IonCard>
          <IonHeader>
            <IonAvatar className="avatar">
              <img src="https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51401141-stock-illustration-male-avatar-profile-picture-use.jpg" />
            </IonAvatar>
          </IonHeader>
          <IonCardContent>
            <IonList>
              <IonListHeader>Персональная информация</IonListHeader>
              <IonItem>
                <IonIcon icon={personOutline} />
                <span className="info">ФИО:</span>
                <IonLabel>
                  {loggedUser?.firstName} {loggedUser?.lastName} {loggedUser?.middleName}
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={mailOutline} />
                <span className="info">Почтовый адрес:</span>
                <IonLabel> {loggedUser?.email}</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={callOutline} />
                <span className="info">Номер телефона:</span>
                <IonLabel> {loggedUser?.phoneNumber}</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={calendarOutline} />
                <span className="info">Дата регистрации:</span>
                <IonLabel>
                  {loggedUser?.registraionDate.split('-')[2].split('T')[0]}/
                  {loggedUser?.registraionDate.split('-')[1]}/
                  {loggedUser?.registraionDate.split('-')[0]}
                </IonLabel>
              </IonItem>
            </IonList>
            <IonButton expand="full" color="secondary" onClick={routeChange}>
              История заказов
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
