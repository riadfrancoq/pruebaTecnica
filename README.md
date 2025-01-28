# demo-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint

http://172.16.105.11/
user: fullapp
password: fullapp
db: prueba_gbp
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
   name: 'Tablapersonas',
    props: {
        personas: Array,
    },
    data() {
        return {
            editando: false,
        }
    },
    setup() {

        const users = ref([]);
        const loading = ref(true);
        const fetchUsers = async () => {
            try {
            const fetch = axios.get('http://localhost:5000/api/people');
            const data = fetch.data;
            users.value = data;

            } catch (error) {
            console.log("Hubo un error en cargar los usuarios ");

            } finally {
                loading.value = false;
            };
      
        };

        onMounted(fetchUsers);
            
            return {
                users,
                loading

            }
    }