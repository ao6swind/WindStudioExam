# 專案結構

-   app-backend: 上架用的後台（angular, bootstrap 4）
-   app-frontend: 給學生練習用的網站（ionic）
-   lib-model: 共用的資料模型
-   ckeditor5: 後台會用到的文字編輯器

# 注意事項

-   第一次複製下來的專案要注意先建置 ckeditor 5
    1. 移動到 ckeditor5 資料夾底下
    2. 執行 npm install
    3. 執行 npm run build

# 編譯指令

-   前台：ionic build --prod
-   後台：ng build --prod
-   android:
    -   ionic build --prod
    -   npx cap copy
    -

# 偵錯指令

-   ckeditor
    -   cd ckeditor5
    -   npm run build (無法覆蓋, 重 build 之前要先刪除原本的專案輸出)
-   app-backend
    -   ng serve -o
    -   ng serve -o -c=dev
    -   ng build
    -   ng build -c=dev
    -   ng build prod
-   app-frontend
    -   ionic serve -o
    -   ionic serve -o -c=dev
    -   ionic build
    -   ionic build prod
-   android
    -   ionic build --prod
    -   npx cap open android

# 建置歷程

## 下指令

-   ng new WindStudioExam --create-application=false --style=scss
-   cd WindStudioExam
-   ng g library --name=lib-model
-   ng g application --name=app-backend --style=scss --routing
-   ng g application --name=app-frontend --style=scss --routing
-   ionic init --multi-app
-   ng add @ionic/angular --project=app-frontend
-   npm install jquery
-   npm install bootstrap
-   npm install bootstrap-icon
-   npm install @ionic-native/core
-   npm install @ionic-native/splash-screen
-   npm install @ionic-native/status-bar

## 修改腳本

-   tsconfig.base.json
    -   compilerOptions -> paths -> lib-model: 新增 lib-model
-   ionic.config.json
    -   參考專案內容
-   angular.json
    -   projects -> app-backend -> architect -> build -> options
        -   styles -> 修改成 app-backend/src/scss/styles.scss
        -   scripts -> 新增下列兩條
            -   node_modules/jquery/dist/jquery.min.js
            -   node_modules/bootstrap/dist/js/bootstrap.bundle.min.js
    -   新增 defaultProject: app-backend
    -   新增 cli -> defaultCollection: @ionic/angular-toolkit
    -   新增 schematics
        -   @ionic/angular-toolkit:component -> styleext: scss
        -   @ionic/angular-toolkit:page -> styleext: scss

## Clone ckeditor 5

刪掉一些用不到的檔案跟指令

## 其它套件

-   ng add @angular/fire

## ionic capacitor

-   npx cap init
-   npx cap add android
-   修改 capacitor.config.json 把 ionic 專案輸出指到正確的位置
