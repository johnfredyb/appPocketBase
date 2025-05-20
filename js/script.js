const pb = new PocketBase('http://127.0.0.1:8090');

// -----------------------------
// Login del superusuario
// -----------------------------
async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await pb.admins.authWithPassword(email, password);
        console.log('Autenticado:', pb.authStore.model.email);
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('user-list').style.display = 'block';
        loadUsers();
    } catch (error) {
        alert('Error al iniciar sesión');
        console.error(error);
    }
}

// -----------------------------
// Cargar lista de usuarios
// -----------------------------
async function loadUsers() {
    try {
        const users = await pb.collection('Usuarios').getFullList();
        const container = document.getElementById('users');
        container.innerHTML = '';

        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.Correo;
            container.appendChild(li);
        });
    } catch (error) {
        console.error('Error cargando usuarios:', error);
    }
}

// -----------------------------
// Crear usuario
// -----------------------------
function showCreateUserForm() {
    document.getElementById('create-user-form').style.display = 'block';
}

function cancelCreateUser() {
    document.getElementById('create-user-form').style.display = 'none';
    document.getElementById('create-user').reset();
}

async function handleCreateUser() {
    const email = document.getElementById('create-email').value;
    const password = document.getElementById('create-password').value;

    try {
        await pb.collection('Usuarios').create({
            Correo: email,
            Contrasena: password
        });

        cancelCreateUser();
        loadUsers();
    } catch (error) {
        alert('Error al crear usuario');
        console.error(error);
    }
}
