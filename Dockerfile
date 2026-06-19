# Imágen base
FROM node:22-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar el archivo de configuración personalizado
COPY package.json ./

# Instala las dependencias productivas
RUN npm install --omit=dev

# Copia el resto de los archivos
COPY . . 

# COmando de inicio que deb estar definido en el package.json
CMD ["npm", "start"]