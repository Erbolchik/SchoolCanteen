import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useContext, useState } from 'react';
import { login } from '../api';
import './Login.css';
import { Context } from '../defaults';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const { setToken } = useContext(Context);
  const history = useHistory();
  const [loginData, setLoginData] = useState<any>();
  const onLogin = () => {
    return login(loginData).then((response) => {
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      history.push('/');
    });
  };
  console.log(loginData);
  return (
    <IonPage style={{ marginTop: 150 }}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        <IonTitle>Login</IonTitle>
      </IonToolbar>
      <IonContent>
        <form>
          <IonItem lines="full">
            <IonLabel position="fixed"> Username</IonLabel>
            <IonInput
              type="text"
              name="username"
              required
              onIonChange={(e) => {
                setLoginData({ ...loginData, username: e.detail.value });
              }}
              // value={!!loginData && loginData.username}
            />
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="fixed"> Password</IonLabel>
            <IonInput
              type="password"
              name="password"
              required
              onIonChange={(e) => {
                setLoginData({ ...loginData, hashPassword: e.detail.value });
              }}
            />
          </IonItem>

          <IonRow>
            <IonCol>
              <IonButton
                disabled={!loginData?.username || !loginData?.hashPassword}
                type="button"
                color="danger"
                expand="block"
                onClick={() => onLogin()}>
                Sign In
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
