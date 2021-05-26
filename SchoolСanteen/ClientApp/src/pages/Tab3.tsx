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
  const [loggedUser, setLoggedUser] = useState<User>();
  const [myOrders, setMyOrders] = useState();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const { token, setToken } = useContext(Context);

  useEffect(() => {
    getLoggerUser().then(({ data }) => setLoggedUser(data));
    getMyOrders().then(({ data }) => setMyOrders(data));
  }, []);

  const routeChange = () => {
    history.push('/history');
  };

  const logOut = () => {
    setToken(null);
    localStorage.removeItem('token');
    history.push('/login');
  };

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
            <IonButton expand="full" color="danger" onClick={logOut}>
              Выйти
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
