![Social Commerce](frontend/src/Assets/SocialCommerce.png)

# A projektben résztvevők

- Hajdara Patrik – BackEnd
- Vinkovits János László – FrontEnd

# Konzulens

- Varga Zsófia - Webprogramozó

# Tartalomjegyzék

- [A webalkalmazás célja](#a-webalkalmás-célja)
- [Licencek](#licencek)
- [Felhasznált technológiák](#felhasznált-technológiák)
- [Követelmények](#követelmények)
  - [Funkcionális](#funkcionális)
  - [Nem funkcionális](#nem-funkcionális)
- [Tervek](#tervek)
- [Program leírása](#program-leírása)
- [Végpontok leírása](#végpontok-leírása)
  - [CouponCode](#couponcode)
  - [Order](#order)
  - [Product](#product)
  - [Shop](#shop)
  - [User](#user)
- [Controller-ek leírása](#controller-ek-leírása)
  - [CouponCode](#couponcode-1)
  - [Order](#order-1)
  - [Product](#product-1)
  - [Shop](#shop-1)
  - [User](#user-1)

# A webalkalmazás célja

A **Social Commerce** egy olyan közösségi platform, ahol bárki adhat el terméket, amit bárki megvásárolhat. Továbbá lehetőséget kínál az áruházak számára, melyek nem rendelkeznek webshoppal, hogy eladják termékeiket az online piacon gyorsan és egyszerűen.

# Licencek

A webalkalmazás zárt forráskódú, azonban felhasználható a megadott feltételek mellett.

# Felhasznált technológiák

## Keretrendszer:

- React JS (18.2.0)

## Programnyelv:

- JSX (JavaScript XML)

## Adatbázis kiszolgáló:

- MongoDB (6.0)

# Követelmények

## Funkcionális:

- Az oldal bejelentkezés nélkül nem használható.
- Egy termék létrehozásához eladói profil megléte szükséges.
- Terméket csak eladóként lehet létrehozni.
- Egy adott termék vásárlásához regisztrált fiók szükséges.

## Nem funkcionális:

- Webalkalmazásunk JSX (HTML) használatával készült.
- Adatbázisunk JavaScript nyelven íródott, kiszolgálónk pedig a MongoDB adatbáziskezelő.

# Tervek

## BackEnd terv

![BackEnd](frontend/src/Assets/Database_plan.png)

## FrontEnd terv

# Program leírása

## Végpontok leírása

### CouponCode:

- **create-coupon-code**
  - Metódus: POST
  - Cél: Új kuponkód létrehozása

- **get-coupon/:id**
  - Metódus: GET
  - Paraméterek: id (az eladó azonosítója)
  - Cél: Az eladóhoz tartozó összes kuponkód lekérdezése

- **delete-coupon/:id**
  - Metódus: DELETE
  - Paraméterek: id (kuponkód azonosítója)
  - Cél: Kuponkód törlése az azonosító alapján

- **get-coupon-value/:name**
  - Metódus: GET
  - Paraméterek: name (kuponkód neve)
  - Cél: Kuponkód értékének lekérdezése a név alapján

### Order:

- **create-order**
  - Metódus: POST
  - Cél: Új rendelés létrehozása a megadott kosár és szállítási adatok alapján

- **get-all-orders/:userId**
  - Metódus: GET
  - Paraméterek: userId (a felhasználó azonosítója)
  - Cél: Az adott felhasználóhoz tartozó összes rendelés lekérdezése

- **get-seller-all-orders/:shopId**
  - Metódus: GET
  - Paraméterek: shopId (az üzlet azonosítója)
  - Cél: Az adott üzlethez tartozó összes rendelés lekérdezése

- **update-order-status/:id**
  - Metódus: PUT
  - Paraméterek: id (a rendelés azonosítója)
  - Cél: A rendelés státuszának frissítése (pl. átadva futárszolgálatnak vagy kiszállítva)

- **admin-all-orders**
  - Metódus: GET
  - Cél: Az összes rendelés lekérdezése adminisztrációs célokra, azok szállításának és létrejöttének időrendi sorrendben történő megjelenítésével

### Product:

- **create-product**
  - Metódus: POST
  - Cél: Új termék létrehozása a megadott adatok alapján

- **get-all-products-shop/:id**
  - Metódus: GET
  - Paraméterek: id (az üzlet azonosítója)
  - Cél: Az adott üzlethez tartozó összes termék lekérdezése

- **delete-shop-product/:id**
  - Metódus: DELETE
  - Paraméterek: id (a termék azonosítója)
  - Cél: Az adott azonosítójú termék törlése az adatbázisból

- **get-all-products**
  - Metódus: GET
  - Cél: Az összes termék lekérdezése

- **create-new-review**
  - Metódus: PUT
  - Cél: Új értékelés létrehozása a megadott adatok alapján

- **admin-all-products**
  - Metódus: GET
  - Paraméterek: None
  - Cél: Az összes termék lekérdezése adminisztrációs célokra

### Shop:

- **create-shop**
  - Metódus: POST
  - Cél: Új eladó létrehozása a megadott adatok alapján

- **activation**
  - Metódus: POST
  - Paraméterek: activation_token (aktiválási token)
  - Cél: Az eladó aktiválása az aktiválási tokennel, majd az aktivált eladó adatainak mentése az adatbázisba

- **login-shop**
  - Metódus: POST
  - Paraméterek: email, password
  - Cél: Eladó bejelentkezése az e-mail cím és jelszó alapján, majd token küldése a sikeres bejelentkezéshez

- **getSeller**
  - Metódus: GET
  - Cél: Az aktuális bejelentkezett eladó adatainak lekérdezése

- **logout**
  - Metódus: GET
  - Cél: Az aktuális bejelentkezett eladó kijelentkeztetése

- **get-shop-info/:id**
  - Metódus: GET
  - Paraméterek: id (az eladó azonosítója)
  - Cél: Az adott azonosítójú eladó részletes adatainak lekérdezése

- **update-shop-avatar**
  - Metódus: PUT
  - Cél: Az aktuális bejelentkezett eladó avatarjának frissítése a megadott képpel

- **update-seller-info**
  - Metódus: PUT
  - Cél: Az aktuális bejelentkezett eladó adatainak frissítése az újonnan megadott adatok alapján

- **admin-all-sellers**
  - Metódus: GET
  - Cél: Az összes eladó adatainak lekérdezése adminisztrációs célokra

- **delete-seller/:id**
  - Metódus: DELETE
  - Paraméterek: id (az eladó azonosítója)
  - Cél: Az adott azonosítójú eladó törlése az adatbázisból

### User:

- **create-user**
  - Metódus: POST
  - Cél: Új felhasználó létrehozása a megadott adatok alapján, majd aktiváló e-mail küldése a regisztrált e-mail címre

- **activation**
  - Metódus: POST
  - Paraméterek: activation_token (aktiválási token)
  - Cél: A felhasználó aktiválása az aktiválási tokennel, majd az aktivált felhasználó adatainak mentése az adatbázisba

- **login-user**
  - Metódus: POST
  - Paraméterek: email, password
  - Cél: Felhasználó bejelentkezése az e-mail cím és jelszó alapján, majd token küldése a sikeres bejelentkezéshez

- **getuser**
  - Metódus: GET
  - Cél: Az aktuális bejelentkezett felhasználó adatainak lekérdezése

- **logout**
  - Metódus: GET
  - Cél: Az aktuális bejelentkezett felhasználó kijelentkeztetése

- **update-user-info**
  - Metódus: PUT
  - Cél: Az aktuális bejelentkezett felhasználó adatainak frissítése az újonnan megadott adatok alapján

- **update-avatar**
  - Metódus: PUT
  - Cél: Az aktuális bejelentkezett felhasználó avatarjának frissítése a megadott képpel

- **update-user-addresses**
  - Metódus: PUT
  - Cél: Az aktuális bejelentkezett felhasználó címeinek frissítése vagy hozzáadása az újonnan megadott adatok alapján

- **delete-user-address/:id**
  - Metódus: DELETE
  - Paraméterek: id (a cím azonosítója)
  - Cél: Az aktuális bejelentkezett felhasználó egy címének törlése az adatbázisból az azonosító alapján

- **update-user-password**
  - Metódus: PUT
  - Cél: Az aktuális bejelentkezett felhasználó jelszavának frissítése az új jelszó alapján

- **user-info/:id**
  - Metódus: GET
  - Paraméterek: id (a felhasználó azonosítója)
  - Cél: Az adott azonosítójú felhasználó részletes adatainak lekérdezése

- **admin-all-users**
  - Metódus: GET
  - Cél: Az összes felhasználó adatainak lekérdezése adminisztrációs célokra

- **delete-user/:id**
  - Metódus: DELETE
  - Paraméterek: id (a felhasználó azonosítója)
  - Cél: Az adott azonosítójú felhasználó törlése az adatbázisból

# Controller-ek leírása

## CouponCode:

- **create-coupon-code**
  - Metódus: POST
  - Működés: Ellenőrzi, hogy létezik-e már ilyen nevű kuponkód. Ha nem, létrehozza és visszaadja a létrehozott kuponkódot.
  - Visszatérési érték: Létrehozott kuponkód objektum

- **get-coupon**
  - Metódus: GET
  - Paraméterek: id (az eladó azonosítója)
  - Működés: Lekéri az adott eladóhoz tartozó összes kuponkódot.
  - Visszatérési érték: Eladóhoz tartozó kuponkódok listája

- **delete-coupon**
  - Metódus: DELETE
  - Paraméterek: id (kuponkód azonosítója)
  - Működés: Törli a megadott azonosítójú kuponkódot.
  - Visszatérési érték: Sikeres törlés üzenet

- **get-coupon-value**
  - Metódus: GET
  - Paraméterek: name (kuponkód neve)
  - Működés: Lekéri a megadott névvel rendelkező kuponkód értékét.
  - Visszatérési érték: Kuponkód objektum

## Order:

- **create-order**
  - Metódus: POST
  - Működés: A kosár tartalmát alapján létrehozza a rendeléseket, csoportosítva azokat eladók szerint.
  - Visszatérési érték: Létrehozott rendelések objektumok listája

- **get-all-orders/:userId**
  - Metódus: GET
  - Paraméterek: userId (a felhasználó azonosítója)
  - Működés: Lekéri az adott felhasználóhoz tartozó összes rendelést.
  - Visszatérési érték: Felhasználóhoz tartozó rendelések listája

- **get-seller-all-orders/:shopId**
  - Metódus: GET
  - Paraméterek: shopId (az eladó azonosítója)
  - Működés: Lekéri az adott eladóhoz tartozó összes rendelést.
  - Visszatérési érték: Eladóhoz tartozó rendelések listája

- **update-order-status/:id**
  - Metódus: PUT
  - Paraméterek: id (rendelés azonosítója)
  - Működés: Frissíti a megadott rendelés státuszát az eladó által megadott értékre.
  - Visszatérési érték: Frissített rendelés objektum

- **admin-all-orders**
  - Metódus: GET
  - Működés: Lekéri az összes rendelést az adatbázisból.
  - Visszatérési érték: Az összes rendelés listája

## Product:

- **create-product**
  - Metódus: POST
  - Működés: Létrehozza az új terméket az adott eladóhoz. Feltölti a termékhez kapcsolódó képeket.
  - Visszatérési érték: Létrehozott termék objektum

- **get-all-products-shop/:id**
  - Metódus: GET
  - Paraméterek: id (az eladó azonosítója)
  - Működés: Lekéri az adott eladóhoz tartozó üzletben található összes terméket.
  - Visszatérési érték: Eladóhoz tartozó termékek listája

- **delete-shop-product/:id**
  - Metódus: DELETE
  - Paraméterek: id (termék azonosítója)
  - Működés: Törli az adott azonosítójú terméket az adatbázisból.
  - Visszatérési érték: Sikeres törlés üzenet

- **get-all-products**
  - Metódus: GET
  - Működés: Lekéri az összes terméket az adatbázisból, rendezve a legfrissebbtől a legrégebbig.
  - Visszatérési érték: Az összes termék listája

- **create-new-review**
  - Metódus: PUT
  - Működés: Létrehoz vagy frissít egy értékelést egy adott termékhez, amihez egy felhasználó tartozik. Az értékelés átlagát is frissíti.
  - Visszatérési érték: Sikeres értékelés üzenet

- **admin-all-products**
  - Metódus: GET
  - Működés: Lekéri az összes terméket az adatbázisból, rendezve a legfrissebbtől a legrégebbig. Csak az admin jogosultsággal rendelkező felhasználók számára elérhető.
  - Visszatérési érték: Az összes termék listája

## Shop:

- **create-shop**
  - Metódus: POST
  - Működés: Létrehozza az új eladót a megadott adatok alapján. Küld egy aktivációs e-mailt a felhasználónak.
  - Visszatérési érték: Sikeres üzenet az aktivációs e-mail elküldéséről

- **activation**
  - Metódus: POST
  - Működés: Aktiválja az eladó fiókját az aktivációs link segítségével.
  - Visszatérési érték: Aktivált felhasználó objektum és token

- **login-shop**
  - Metódus: POST
  - Működés: Bejelentkezés az eladó fiókba az e-mail cím és jelszó alapján.
  - Visszatérési érték: Sikeres bejelentkezés üzenet és token

- **getSeller**
  - Metódus: GET
  - Működés: Lekéri az aktuális bejelentkezett eladó adatait.
  - Visszatérési érték: Az aktuális bejelentkezett eladó adatai

- **logout**
  - Metódus: GET
  - Működés: Kijelentkezteti az aktuális bejelentkezett eladót.
  - Visszatérési érték: Sikeres kijelentkezés üzenet

- **get-shop-info/:id**
  - Metódus: GET
  - Paraméterek: id (az eladó azonosítója)
  - Működés: Lekéri az adott azonosítójú eladó adatait.
  - Visszatérési érték: Az adott azonosítójú eladó adatai

- **update-shop-avatar**
  - Metódus: PUT
  - Működés: Frissíti az aktuális bejelentkezett eladó avatar képét.
  - Visszatérési érték: Frissített eladó objektum

- **update-seller-info**
  - Metódus: PUT
  - Működés: Frissíti az aktuális bejelentkezett eladó adatait.
  - Visszatérési érték: Frissített eladó objektum

- **admin-all-sellers**
  - Metódus: GET
  - Működés: Lekéri az összes eladót, csak az admin jogosultsággal rendelkező felhasználók számára elérhető.
  - Visszatérési érték: Az összes eladó listája

- **delete-seller/:id**
  - Metódus: DELETE
  - Paraméterek: id (az eladó azonosítója)
  - Működés: Törli az adott azonosítójú eladó profilját az adatbázisból.
  - Visszatérési érték: Sikeres törlés üzenet

## User:

- **create-user**
  - Metódus: POST
  - Működés: Létrehozza az új felhasználót a megadott adatok alapján. Aktivációs e-mailt küld a felhasználónak.
  - Visszatérési érték: Sikeres üzenet az aktivációs e-mail elküldéséről.

- **activation**
  - Metódus: POST
  - Működés: Aktiválja az felhasználó fiókját az aktivációs link segítségével.
  - Visszatérési érték: Aktivált felhasználó objektum és token.

- **login-user**
  - Metódus: POST
  - Működés: Bejelentkezés a felhasználó fiókjába az e-mail cím és jelszó alapján.
  - Visszatérési érték: Sikeres bejelentkezés üzenet és token.

- **getuser**
  - Metódus: GET
  - Működés: Lekéri az aktuális bejelentkezett felhasználó adatait.
  - Visszatérési érték: Az aktuális bejelentkezett felhasználó adatai.

- **logout**
  - Metódus: GET
  - Működés: Kijelentkezteti az aktuális bejelentkezett felhasználót.
  - Visszatérési érték: Sikeres kijelentkezés üzenet

- **update-user-info**
  - Metódus: PUT
  - Működés: Frissíti az aktuális bejelentkezett felhasználó adatait.
  - Visszatérési érték: Frissített felhasználó objektum.

- **update-avatar**
  - Metódus: PUT
  - Működés: Frissíti az aktuális bejelentkezett felhasználó avatar képét.
  - Visszatérési érték: Frissített felhasználó objektum.

- **update-user-addresses**
  - Metódus: PUT
  - Működés: Frissíti az aktuális bejelentkezett felhasználó címeit.
  - Visszatérési érték: Frissített felhasználó objektum.

- **delete-user-address/:id**
  - Metódus: DELETE
  - Paraméterek: id (a cím azonosítója)
  - Működés: Törli az adott azonosítójú felhasználó címét az adatbázisból.
  - Visszatérési érték: Sikeres törlés üzenet.

- **update-user-password**
  - Metódus: PUT
  - Működés: Frissíti az aktuális bejelentkezett felhasználó jelszavát.
  - Visszatérési érték: Sikeres üzenet a jelszó frissítéséről.

- **user-info/:id**
  - Metódus: GET
  - Paraméterek: id (a felhasználó azonosítója)
  - Működés: Lekéri az adott azonosítójú felhasználó adatait.
  - Visszatérési érték: Az adott azonosítójú felhasználó adatai.

- **admin-all-users**
  - Metódus: GET
  - Működés: Lekéri az összes felhasználót, csak az adminisztrátori jogosultsággal rendelkező felhasználók számára elérhető.
  - Visszatérési érték: Az összes felhasználó listája.

- **delete-user/:id**
  - Metódus: DELETE
  - Paraméterek: id (a felhasználó azonosítója)
  - Működés: Törli az adott azonosítójú felhasználó profilját az adatbázisból.
  - Visszatérési érték: Sikeres törlés üzenet.

