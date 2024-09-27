import { Typography, List, ListItem, ListItemText, ListItemIcon, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './../styles/home.css';

export function Home() {
    return (
        <Paper style={{ padding: '20px', margin: '20px auto', maxWidth: '600px' }}>
            <Typography variant="h4" gutterBottom>
                Modo de uso de la aplicación
            </Typography>

            <List>
                <ListItem>
                    <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="El usuario debe estar registrado en la aplicación, es importante usar un correo real para recibir notificaciones."
                    />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Luego, debe iniciar sesión con el correo y la contraseña registrados."
                    />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Una vez autenticado, podrá navegar entre las diferentes pantallas."
                    />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Pantalla Fondos: Muestra la lista de fondos a los que el cliente puede suscribirse. Para suscribirse, debe ingresar el monto mínimo y hacer clic en 'Suscribir a Fondo'."
                    />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Pantalla Cancelaciones: Muestra los fondos activos del cliente y permite cancelar una suscripción. Para cancelar, haga clic en 'Cancelar Fondo'."
                    />
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Pantalla Historial: Muestra los fondos activos y cancelados que ha tenido el cliente."
                    />
                </ListItem>
            </List>
        </Paper>
    );
}
