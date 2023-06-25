# Указываем на каком образе работает контейнер
FROM node:12.13-alpine

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем все зависимости из package.json
RUN npm install

# Копируем все файлы
COPY . .

# Dist тоже
COPY ./dist ./dist

# Это докерфайл для разработки (не для продакшна)
CMD ["npm", "run", "start:dev"]