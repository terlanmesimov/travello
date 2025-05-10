# Travello - Səyahət Axtarış Tətbiqi PRD

## Məhsul Haqqında 

Travello, istifadəçilərə səyahət məkanlarını axtarmaq, xəritədə görmək və sevimli yerlərini yadda saxlamaq imkanı verən veb tətbiqdir.

## Məqsəd və Hədəf Auditoriya

Məqsəd: Səyahətsevərlərə istədikləri yerləri asanlıqla tapmağa, məlumat əldə etməyə və səyahət planlarını yaratmağa kömək etmək.

Hədəf auditoriya:
- Səyahətsevərlər
- Turistlər 
- Səyahət planlaşdıranlar
- Yeni yerləri kəşf etmək istəyənlər

## Əsas Funksionallıqlar

1. **İstifadəçi hesabı idarəetməsi**
   - Qeydiyyat və giriş
   - Şifrə sıfırlama
   - Profil idarəetməsi

2. **Axtarış və kəşfetmə**
   - Yer axtarışı
   - Xəritə görüntüsü
   - Yerlər şəbəkəsi

3. **Bloglar və Məlumat**
   - Səyahət məqalələri
   - Blog yazıları
   - Məkan haqqında ətraflı məlumat

4. **Sevimlilər**
   - İstifadəçilərin sevdiyi məkanları saxlama

5. **Yer təfərrüatları**
   - Hər məkan üçün ətraflı məlumat
   - Şəkillər
   - Təsvirlər
   - Məşhurluq reytinqi

## Texniki Spesifikasiya

### Frontend Texnologiyaları
- React 19
- React Router 7.3
- Leaflet/Google Maps xəritə inteqrasiyası
- SCSS/SASS üçün stillər
- Axios HTTP istəkləri üçün

### Ekranlar və İnterfeysler

1. **Ana Səhifə**
   - Başlıq (Header)
   - Axtarış komponenti
   - Xəritə görüntüsü
   - Məkanlar şəbəkəsi
   - Alt hissə (Footer)

2. **Giriş/Qeydiyyat**
   - Giriş forması
   - Qeydiyyat forması
   - Şifrə sıfırlama

3. **Məkan Təfərrüatları**
   - Təfsilatlı məkan təsviri
   - Xəritədə mövqe
   - Şəkillər
   - Reytinq

4. **Blog**
   - Blog yazıları siyahısı
   - Blog yazı təfərrüatları

5. **Profil**
   - İstifadəçi məlumatları
   - Sevimlilər siyahısı

## İş Akışı və İstifadəçi Təcrübəsi

1. İstifadəçilər qeydiyyatdan keçir və ya hesablarına daxil olur
2. Ana səhifədə axtarış funksiyası ilə məkanlar axtarılır
3. Xəritə və ya şəbəkə vasitəsilə yerləri kəşf edir
4. Məkan təfərrüatlarına baxır
5. Seçilmiş yerləri sevimlilərə əlavə edir
6. Blog bölməsindən səyahət məsləhətləri əldə edir

## Gələcək İnkişaf İmkanları

1. Mobil tətbiq versiyası
2. Offline istifadə imkanı
3. İstifadəçi rəylərini və qiymətləndirmələrini əlavə etmə
4. Səyahət marşrutları yaratmaq funksiyası
5. Sosial media inteqrasiyası
6. Məkanlar üçün real vaxtda məlumat yeniləmələri
7. AI tövsiyə sistemi 

## Layihə Strukturu

Travello, səyahət məkanlarını axtarmaq və planlaşdırmaq üçün React-da yazılmış veb tətbiqdir.

### Əsas Fayl Strukturu:
- **src/components**: Header, Footer, Search, PlaceGrid və Map
- **src/pages**: Home, Login, Register, About, Blog, BlogDetail, Favorites, CardDetail, Account, NotFound, ResetPassword
- **src/routes**: GlobalProvider və PrivateRoute
- **src/utils**: Yardımçı funksiyalar
- **src/assets**: Şəkillər və üslub faylları

### Əsas Marşrutlar:
- `/` - Ana səhifə
- `/login` - Giriş
- `/register` - Qeydiyyat
- `/reset-password` - Şifrə sıfırlama
- `/account` - İstifadəçi profili
- `/favorites` - İstifadəçinin sevimli yerləri
- `/blog` - Blog yazıları siyahısı 
- `/blog-detail/:id` - Blog yazısının təfərrüatları
- `/card-detail/:id` - Məkan təfərrüatları
- `/about` - Haqqımızda səhifəsi

## Növbəti Addımlar

1. Xəritə funksionallığının təkmilləşdirilməsi
2. API inteqrasiyası və veri strukturunun optimallaşdırılması
3. Responsiv dizaynın təkmilləşdirilməsi
4. Autentifikasiya sisteminin gücləndirilməsi 

## Layihə Analizi

### Tamamlanmış İşlər

1. **Əsas UI Komponentləri**
   - Header və Footer komponentləri hazırlanıb
   - PlaceGrid komponenti səyahət məkanlarını şəbəkə şəklində göstərir
   - Axtarış komponenti istifadəçi sorğularını qəbul edir
   - Leaflet əsaslı xəritə inteqrasiyası həyata keçirilib

2. **Əsas Səhifələr**
   - Ana səhifə (Home) - xəritə və məkan şəbəkəsi ilə
   - Giriş və qeydiyyat səhifələri (Login, Register)
   - Şifrə sıfırlama funksionalı (ResetPassword)
   - Məkan detalları səhifəsi (CardDetail)
   - Blog və blog yazıları (Blog, BlogDetail)
   - Profil və sevimlilər səhifələri (Account, Favorites)
   - Haqqımızda səhifəsi (About)

3. **Əsas Funksionallıqlar**
   - Məkanları xəritədə göstərmək və onlara klikləmək
   - Məkanları şəbəkə görünüşündə göstərmək
   - Giriş/çıxış və qeydiyyat mexanizmləri
   - Məkan təfərrüatları səhifəsi
   - REST API inteqrasiyası (Axios ilə)
   - Məlumatın nəticəsiz olduğu hallarda istifadəçi təcrübəsi

4. **Texniki İnfrastruktur**
   - React Router marşrutlaması
   - GlobalProvider və PrivateRoute komponentləri
   - Utilit funksiyaları (RenderStars və s.)
   - Response yüklənmə effektləri (skeleton loaders)

### Təkmilləşdirilməli Sahələr

1. **İstifadəçi Təcrübəsi**
   - Xəritə interaktivliyinin artırılması
   - İstifadəçi geribildirim mexanizmlərinin əlavə edilməsi
   - Axtarış filtrlərin təkmilləşdirilməsi
   - Profil sahifəsi imkanlarının genişləndirilməsi

2. **Texniki Borc**
   - Məlumat strukturunun optimallaşdırılması
   - Kod təkrarlarının azaldılması 
   - Xəta idarəetməsinin təkmilləşdirilməsi
   - Performans optimallaşdırması

3. **Funksional Boşluqlar**
   - İstifadəçi şərhləri sistemi
   - İstifadəçilər arası məlumat paylaşımı
   - Bildirim sistemi
   - PDF/CSV ixracı imkanları

### Planlaşdırılan Funksionallıqlar

1. **İstifadəçi Hesabı Təkmilləşdirmələri**
   - Sosial şəbəkə ilə giriş imkanları (Google, Facebook)
   - Profil şəkli yükləmə
   - İstifadəçi profilinin daha ətraflı idarə edilməsi
   - Hesab təhlükəsizliyi təkmilləşdirmələri

2. **Məkan Məlumatları Təkmilləşdirmələri**
   - Çoxdilli məlumat dəstəyi
   - Məkanlara şərh etmək və qiymətləndirmək
   - Məkanlar üçün geniş filter imkanları
   - Mövsümi məlumatlar və tövsiyələr

3. **Tətbiqin Genişləndirilməsi**
   - Mobil applikasiya (React Native və ya Flutter)
   - Offline iş rejimi
   - PWA (Progressive Web App) funksionallığı
   - Push bildirişləri

4. **İş Modeli Funksionallıqları**
   - Populyar yerlər üçün promosyonlar
   - Premium üzvlük imkanları
   - Turizm şirkətləri ilə əməkdaşlıq imkanları
   - Məkanlar üçün rezervasiya inteqrasiyası

## Texnoloji Yol Xəritəsi

1. **Qısamüddətli Məqsədlər (1-3 ay)**
   - Xəritə funksionallığının genişləndirilməsi
   - İstifadəçi şərhlərinin əlavə edilməsi
   - Axtarış imkanlarının təkmilləşdirilməsi
   - Responsiv dizayn problemlərinin həlli

2. **Ortamüddətli Məqsədlər (3-6 ay)**
   - PWA funksionallığının əlavə edilməsi
   - API performans optimallaşdırması
   - İstifadəçi profilinin genişləndirilməsi
   - Çoxdilli dəstəyin əlavə edilməsi

3. **Uzunmüddətli Məqsədlər (6-12 ay)**
   - Mobil tətbiqin hazırlanması
   - AI tövsiyə sisteminin əlavə edilməsi
   - Rezervasiya sisteminin inteqrasiyası
   - Geniş analitika və hesabat imkanları 