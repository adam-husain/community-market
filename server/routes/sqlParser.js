const router = require('express').Router();

router.route('/').get(SqlParser);

function SqlParser(req, res) {
	const users = "(\n" +
		"    9, 'adamh', '3c63da25bfb2cf0e9cc8d0d18aeaf32ec651da4bdf2f66c22977952c162aaa9d', \n" +
		"    'Adam', 2, '5adc6bbacd969c328ddeb650a92d3db9c6b8fa87.jpg', \n" +
		"    '+96872282361'\n" +
		"  ), \n" +
		"  (\n" +
		"    10, 'NDLee', '49b71c44bcf085a01e25bc0f57738b99406d00155cdf692b6c8870f34e5c7a02', \n" +
		"    'Andi ', 2, 'default.jpeg', '+60186618459'\n" +
		"  ), \n" +
		"  (\n" +
		"    11, 'NoobMaster69', '3c63da25bfb2cf0e9cc8d0d18aeaf32ec651da4bdf2f66c22977952c162aaa9d', \n" +
		"    'NoobMaster69', 4, '18496a5e5af369b8f9461e2bc6c1235b42da7d2b.jpg', \n" +
		"    '+96872282361'\n" +
		"  ), \n" +
		"  (\n" +
		"    12, 'mnh04', '6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090', \n" +
		"    'MNH', 1, 'default.jpeg', '+94701110123'\n" +
		"  ), \n" +
		"  (\n" +
		"    13, 'wangziyuan02', 'a79eb3e6afee1076c18ec00f2c729a133c4779f9dc8a3e7add791d0095fd7bf2', \n" +
		"    'WZY', 2, 'default.jpeg', '+60182703903'\n" +
		"  ), \n" +
		"  (\n" +
		"    14, 'yiyee', '1a0e3e07dc48737408ca65fc88a82cbbb0d5a1b33419d37fe6e64d26486a9fa9', \n" +
		"    'Ling Tian Yi', 2, 'default.jpeg', \n" +
		"    '+601157654869'\n" +
		"  ), \n" +
		"  (\n" +
		"    15, 'Justin', '1d163907b33a672f4cf0b48ef9874e66b6868b31bb875369b68e13720d7d9e5f', \n" +
		"    'JKY', 2, 'default.jpeg', '+60178760968'\n" +
		"  ), \n" +
		"  (\n" +
		"    16, 'Thesara', 'e972c6eba176ea3409b129afd74ac65cf0a89e3e5cc7138f9cdea6d644ebe72e', \n" +
		"    'Thesara', 3, 'default.jpeg', '+94701581921'\n" +
		"  ), \n" +
		"  (\n" +
		"    17, 'Mojioo', 'bbcc73f31ce7d2bfa9f57621f95ec3b05db365473a8997cb40a1125608ca1f37', \n" +
		"    'xuenoj', 1, 'default.jpeg', '+60124096164'\n" +
		"  ), \n" +
		"  (\n" +
		"    18, 'xuenoj', 'bbcc73f31ce7d2bfa9f57621f95ec3b05db365473a8997cb40a1125608ca1f37', \n" +
		"    'xuenoj', 2, 'default.jpeg', '+60124096164'\n" +
		"  ), \n" +
		"  (\n" +
		"    19, 'Memez', 'cb3293cff5abc2bbd6fa9472e7b4c01c20ec5700dd5881cbf4d80d6508e19f4b', \n" +
		"    'Meme', 3, 'default.jpeg', '+60176498963'\n" +
		"  ), \n" +
		"  (\n" +
		"    20, 'Kimiaghadiani', 'b6b0ab7974d0c83e2dbe65360fc9d30461e067134221b9cb6d2f4279c9bd770b', \n" +
		"    'kimia', 1, 'default.jpeg', '+989120998850'\n" +
		"  ), \n" +
		"  (\n" +
		"    21, 'lilacblue', 'c32aa5c9b0cb3213a49798b86b8530cae69467e7dda38e897f4fa9c8a1bc7a90', \n" +
		"    'Anis Natasha', 3, 'default.jpeg', \n" +
		"    '+601136918548'\n" +
		"  ), \n" +
		"  (\n" +
		"    22, 'Roshnah', 'a09aaf514da87843484b3137ef2d9ab4dfc67db962341de42a382a0d48a8b605', \n" +
		"    'Roshnah', 3, '8191b961cee5cf2443aabe8c03936704ebad18d9.jpg', \n" +
		"    '+60147179156'\n" +
		"  ), \n" +
		"  (\n" +
		"    23, 'VENCHR', '20baab7dda9bc8f1022326b4764b54ac5a4e7d1cd8d31ba8fcfd1c6fd2edb7b1', \n" +
		"    'Dr Umar Johnson', 4, '38b3ccbae42628c32012ded6537bb9ced1f7c960.jpg', \n" +
		"    '+60102492569'\n" +
		"  ), \n" +
		"  (\n" +
		"    24, 'kinpatsuonna', '493a15e7bda88b07272071cbcfd3cb05920b999872b6f3cfa6e4d16712dbf434', \n" +
		"    'Bec', 3, '0380111eb958a6349b68a8e8fe24a8a2a0a9c297.jpg', \n" +
		"    '+601136252858'\n" +
		"  ), \n" +
		"  (\n" +
		"    25, 'Hikari', '1585ed9b3375794005f459114b82f5e272f33d3aee50430da06b334abbee03a2', \n" +
		"    'Hikari Ohba', 3, 'default.jpeg', \n" +
		"    '+601112818572'\n" +
		"  ), \n" +
		"  (\n" +
		"    26, 'Farida.k', 'b45a420d26c7ecfd4a3aa640888f92c0d2b515be623e64d10ce8376b77bed710', \n" +
		"    'Farida', 3, 'default.jpeg', '+60172435219'\n" +
		"  ), \n" +
		"  (\n" +
		"    27, 'Sange_lawakharde', '2490284eea43fbb89b59acce1fce18c46398ff45ac3a2b062d6724cca3e7f16a', \n" +
		"    'Mohammed Abdur Rahman ', 2, 'default.jpeg', \n" +
		"    '+60148368796'\n" +
		"  ), \n" +
		"  (\n" +
		"    28, 'Marshan', '7686b6ac3d260b323090eae79a161166cc96bf9c983bc24bea21106531d51a40', \n" +
		"    'Marshan', 2, 'default.jpeg', '+60173259177'\n" +
		"  ), \n" +
		"  (\n" +
		"    29, 'ryan_pynam', 'aa3efee90c9c8f7458681c9bd8b19569321fdea4a0e51d7b16e4860f12e2e8ea', \n" +
		"    'Ryan Pynam', 1, '5f09418b89546dc392982aa2f356fceb1eb7d058.jpg', \n" +
		"    '+23057030442'\n" +
		"  ), \n" +
		"  (\n" +
		"    30, 'SilverMarcs', 'df00b2473e13be7b631a9af7be8ea6c6e81c91e31f0890ee0756b3f0ff85ba7d', \n" +
		"    'Zabir Raiahn', 2, 'default.jpeg', \n" +
		"    '+60145167645'\n" +
		"  ), \n" +
		"  (\n" +
		"    31, 'T.Hamdi', '9ddd9017d41bacbc3f80511122bb1ee34563a8a2220db7f1ec129f4ab3c7cc56', \n" +
		"    'Thamer', 2, 'default.jpeg', '+600173882978'\n" +
		"  ), \n" +
		"  (\n" +
		"    32, 'Lambert', 'd48c6b0170e480430a3191b7e537ac6ca86523be1c0d697144674df496812646', \n" +
		"    'Geert Petrus Bogers', 2, 'default.jpeg', \n" +
		"    '+31641365093'\n" +
		"  ), \n" +
		"  (\n" +
		"    33, 'PienKorstanje', '13b60a11fab1b1373f348c32cb9f7a3a9b2d44925df2e0ca1bbc36c15f53b2cc', \n" +
		"    'Pien Korstanje', 3, 'a904a7e18c46c506a7935252cfd8cda2c6de014a.jpg', \n" +
		"    '+310683547360'\n" +
		"  ), \n" +
		"  (\n" +
		"    34, 'Chloe', '24e3fe49333b72ccbaa79997400a721880bb87df39529753111bc1f1a208179b', \n" +
		"    'SM', 3, 'default.jpeg', '+601123734509'\n" +
		"  ), \n" +
		"  (\n" +
		"    35, 'Binh100', 'f3b9929a0ba178bb1e4c8769e2b4bd3af6c30e2f68f08fd640c3363d584914f7', \n" +
		"    'Binh', 1, 'default.jpeg', '+4915252967578'\n" +
		"  ), \n" +
		"  (\n" +
		"    36, 'uzivert', '84b5c44b01e6512678b8283626177b58b52f9af3370e37beae97bddfec8a1bb7', \n" +
		"    'Huz', 3, 'default.jpeg', '+60146858050'\n" +
		"  ), \n" +
		"  (\n" +
		"    37, 'Youssef', '8f8f831e17d619e6b23c27ede33169dc208a9c284e9fa67154ae625f4a6fd1c0', \n" +
		"    'Youssef', 2, 'default.jpeg', '+201281001049'\n" +
		"  ), \n" +
		"  (\n" +
		"    38, 'sbac17', '79024554811af39163f158b9fa708c5c4b9b8d5a405c0dd938453f10c556278e', \n" +
		"    'Shradha', 3, 'default.jpeg', '+601136768037'\n" +
		"  )"
	
	const products = "(\n" +
		"    15, 'Pan and Spatula', 'A pan and spatula. Both in good condition. Can be sold separate. ', \n" +
		"    0, 600, 9, '9d3de1bf56aeaf20993cde30127425d67bfc3f93.jpg', \n" +
		"    '2022-09-11 09:41:21', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    16, 'Pan and Spatula', 'In good condition. Cannot be sold separately.', \n" +
		"    0, 800, 9, '9d3de1bf56aeaf20993cde30127425d67bfc3f93.jpg', \n" +
		"    '2022-09-13 04:25:52', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    17, 'Test Product', 'Hello', 0, 0, 9, \n" +
		"    '9aa447d9d1e66536009d839937615c3932fce3b6.jpg', \n" +
		"    '2022-09-13 04:30:38', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    18, 'Kettle', 'A kettle in good condition. Used frequently.', \n" +
		"    0, 500, 9, 'bdef69914468af6be7ae5c0da1b693ffbea1e8ac.jpg', \n" +
		"    '2022-09-13 04:47:00', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    19, 'Test product', 'hello', 0, 100, \n" +
		"    9, '18496a5e5af369b8f9461e2bc6c1235b42da7d2b.jpg', \n" +
		"    '2022-09-13 04:49:08', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    20, 'test', 'Gello', 0, 300, 9, '14b68217cd8243e9a88138a0b57acd842b91aa91.jpg', \n" +
		"    '2022-09-13 04:50:08', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    21, 'test', 'Hello', 0, 100, 9, 'a6bb915f976374eb576eb818c9e718ceabe82f7c.jpg', \n" +
		"    '2022-09-14 01:23:04', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    22, 'hello', 'NY bad', 0, 96600, 9, 'cd630b0aee86147255f484655941ceb8fbdb8baf.jpg', \n" +
		"    '2022-09-14 01:23:30', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    23, 'Clothes iron ', 'State of the art clothes iron (in mint condition)!! ', \n" +
		"    0, 500, 10, 'ed27ff8e25fcb90d3a84311e3e19c00935647344.jpg', \n" +
		"    '2022-09-14 16:43:44', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    24, 'Iron', 'A medium size clothes iron. Brand: Tefal. Lightweight, moderately used.', \n" +
		"    0, 800, 11, 'cc60a77cd0abe020e3f563970d966948587ccd6c.jpg', \n" +
		"    '2022-09-14 18:38:05', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    25, 'Antigen Rapid Kit', 'Sealed. Brand New Antigen Rapid test kit. Just had it lying around so giving it for free.', \n" +
		"    0, 0, 11, '555e30fd04d595673d1ab65f8ea4087ea6471f81.jpg', \n" +
		"    '2022-09-14 18:39:13', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    26, 'Iron', 'A medium size clothes iron. Brand: Tefal. Lightweight, moderately used.', \n" +
		"    0, 999, 11, 'cc60a77cd0abe020e3f563970d966948587ccd6c.jpg', \n" +
		"    '2022-09-14 18:56:54', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    27, 'Micropack Keyboard', 'Mint Condition\\r\\nBarely used', \n" +
		"    0, 1200, 12, 'bcc124bcdf23d5373f9f4d0cf2f2497e22c1c374.jpg', \n" +
		"    '2022-09-15 05:03:33', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    28, 'Umbrella', 'Umbrella with cover. Good condition.', \n" +
		"    0, 700, 11, '49d70aa5f66fb5e5752ef12e1f1adf9b58e3ec09.jpg', \n" +
		"    '2022-09-15 05:09:02', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    29, 'AirPods Pro', '100% authentic', \n" +
		"    0, 52900, 13, 'default.jpeg', '2022-09-15 10:32:30', \n" +
		"    0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    30, 'AirPods Pro', '100% authentic ', \n" +
		"    0, 52900, 13, 'b1ff16490c91024a05a5eda47606e89f9e4e1415.jpg', \n" +
		"    '2022-09-15 10:35:51', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    31, 'N95 Medical Mask', 'Medical Protective Mask N95 (50pcs)', \n" +
		"    0, 1000, 14, '48d6e54c8648440a28f53e95743df82ba4e64140.jpg', \n" +
		"    '2022-09-15 21:17:06', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    32, 'Sali COVID Test-Kit ', 'Oral COVID Test-Kit (3pcs)', \n" +
		"    0, 500, 14, '41ff5b3a71b696b8fd959d581a0c10f1a50df4fc.jpg', \n" +
		"    '2022-09-15 21:24:10', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    33, 'COVID Test-Kit ', 'COVID Test-Kit (4pcs)', \n" +
		"    0, 500, 14, '4b67a34bb9ea3f629cee2aa5a9520da835368a45.jpg', \n" +
		"    '2022-09-15 21:27:54', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    34, 'Laundry Beads', '3 In 1 Laundry Beads (18pcs)\\r\\n1 bead can wash up to 10 clothes (about 4kg)\\r\\nBest Use Before : 09 Feb 2023', \n" +
		"    0, 3000, 14, '8b8296057a453d4ae79a82897d8f15b6ae74ec27.jpg', \n" +
		"    '2022-09-15 21:33:43', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    35, 'COVID Test-Kit', 'COVID Test-Kit (4pcs)', \n" +
		"    0, 500, 15, '6a78a1ebbd04d893def5ea37c518dc6c634a8dca.jpg', \n" +
		"    '2022-09-16 03:04:37', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    36, 'AirPods ', '100% authentic (2 cases included)', \n" +
		"    0, 42900, 15, 'd2f6d292ba93771f3694a71892e9c2679228c6d3.jpg', \n" +
		"    '2022-09-16 03:13:39', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    37, 'Ripped denim shorts', 'Size 22 or S', \n" +
		"    0, 4000, 16, '212c7cfc787239e7602453d49dfb49909679fce0.jpg', \n" +
		"    '2022-09-16 11:24:42', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    38, 'Evening velvet dress', 'Size : XS \\r\\n: good condition ', \n" +
		"    0, 3500, 19, 'a3e1a6c4354dc1373a1badd2bb885d6ac0115da4.jpg', \n" +
		"    '2022-09-16 13:14:01', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    39, 'Lawforbusiness book', 'Book author : sweet and maxwell\\r\\nCondition : mid condition\\r\\n*Hard copy ', \n" +
		"    0, 6000, 19, '065c4492df8ea2d14db27f38b9af13f73b6fff81.jpg', \n" +
		"    '2022-09-16 13:18:04', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    40, 'Blue denim blouse', 'Blue denim blouse for women\\r\\nSize : 12\\r\\nBrand : Primark\\r\\n*Never been worn ', \n" +
		"    0, 3000, 19, '48f064018adae479a080fb71d6158bbe3e9d7858.jpg', \n" +
		"    '2022-09-16 13:22:41', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    41, 'Denim shorts', 'Size 22 or S\\r\\nBrand new and in good condition ', \n" +
		"    0, 4500, 16, '212c7cfc787239e7602453d49dfb49909679fce0.jpg', \n" +
		"    '2022-09-16 14:17:12', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    42, 'Jack & Jones T-Shirt', 'Original Jack & Jones\\r\\nColour: Deep Water\\r\\nSize: Small\\r\\nBought from Dubai\\r\\nBrand New\\r\\nNever Used', \n" +
		"    0, 3000, 12, '8ff4a085d67a7b6837963223a284c9feba177e48.jpg', \n" +
		"    '2022-09-16 16:06:26', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    43, 'Nike Air Force 1', '?condition 8.5/10, worn x10?\\r\\n ?Price can Negotiate?\\r\\n ?Crep Spray on shoe per req? \\r\\n?Can meet up in Sunway Area? \\r\\n?Kindly PM with me ? ', \n" +
		"    0, 22000, 18, 'a2d7588b9b4b82fc202ff1a528ecdc2b8d75af88.jpg', \n" +
		"    '2022-09-17 02:03:07', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    44, 'kettle', 'A kettle in good condition. Used frequently.', \n" +
		"    0, 0, 9, 'bdef69914468af6be7ae5c0da1b693ffbea1e8ac.jpg', \n" +
		"    '2022-09-17 08:49:48', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    45, 'Keyboard', 'Brand: Micropack. A compact wired keyboard. Clean. Fully working. Slightly used.', \n" +
		"    0, 0, 9, 'ba20fadfb536669f572b855a3e1e8a71ff9ddc64.jpg', \n" +
		"    '2022-09-17 08:51:34', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    46, 'Shoes', 'Brand new shoes', 0, \n" +
		"    6500, 22, '8191b961cee5cf2443aabe8c03936704ebad18d9.jpg', \n" +
		"    '2022-09-17 21:34:13', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    47, '日本製品 Tracksuit', 'Polyester. Gently worn and loved.', \n" +
		"    0, 3000, 24, 'dad6a0a3b0808b7fc48ab9888fa314c57a9e4abd.jpg', \n" +
		"    '2022-09-18 12:58:15', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    48, '日本製品 Tracksuit', 'Polyester, bought in Japan. Japan size LL. Gently worn and loved :)', \n" +
		"    0, 3000, 24, 'dad6a0a3b0808b7fc48ab9888fa314c57a9e4abd.jpg', \n" +
		"    '2022-09-18 13:01:43', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    49, '日本製品 Fluffy Purse', \n" +
		"    'Fluffy and cute, bought in Japan. Gently used and loved :)', \n" +
		"    0, 2000, 24, '8ba691e5c9de356186ce7efece63300a5a595beb.jpg', \n" +
		"    '2022-09-18 13:04:00', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    50, 'Rainbow Belt', 'Cute and proud. Gently loved and looking for a suitable home :)', \n" +
		"    0, 1000, 24, 'd37da0f580408cc23010c70a2f31ab5fa0789c89.jpg', \n" +
		"    '2022-09-18 13:05:39', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    51, 'Eco Bag - Free', 'Well -worn and loved, but suitable for a new home. Great for moving :)', \n" +
		"    0, 0, 24, '1d16db911f9aefc0922875f671de871e4e65afd8.jpg', \n" +
		"    '2022-09-18 13:07:58', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    52, '日本製品 Gaucho Pants ', \n" +
		"    'Polyester and cotton, size 7, bought in Japan. Gently worn and loved :)', \n" +
		"    0, 1500, 24, '122e381ac4a77f93deb563e1aa4764402f945c07.jpg', \n" +
		"    '2022-09-18 13:09:47', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    53, 'High Neck Sweater', 'Size: L\\r\\nCondition: Brand new', \n" +
		"    0, 3500, 15, '828a314fba4fba367213bcbffb1d886d34d9d1e7.jpg', \n" +
		"    '2022-09-18 14:38:26', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    54, 'Denim shorts ', 'Size M \\r\\nWorn but in good condition', \n" +
		"    0, 2200, 15, 'a05a0981ec8cd2a9a77ef9532f58102a6eb33d75.jpg', \n" +
		"    '2022-09-18 14:49:21', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    55, 'High Neck Sweater', 'Size: L Condition: Brand new', \n" +
		"    0, 5200, 15, '828a314fba4fba367213bcbffb1d886d34d9d1e7.jpg', \n" +
		"    '2022-09-18 14:51:06', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    56, 'Uniqlo Jacket', 'Polyester, bought in Uniqlo. Size L. Tenderly worn and beloved :-)', \n" +
		"    0, 3000, 15, '8957505602588f626a6bf0dc50b05d6095898f46.jpg', \n" +
		"    '2022-09-18 14:58:42', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    57, 'Denim shorts', 'Size 22 or S\\r\\nBrand new and in good condition', \n" +
		"    0, 4000, 16, '212c7cfc787239e7602453d49dfb49909679fce0.jpg', \n" +
		"    '2022-09-18 15:15:20', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    58, 'Cargo Pants ', 'Size L, bought online. Tenderly worn and beloved :-)', \n" +
		"    0, 1500, 15, 'e97c9bbc5cb0de0f93cf8d3486dd38972476768a.jpg', \n" +
		"    '2022-09-18 15:15:37', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    59, 'Lab Coat', 'Lab coat for students Size : XL Bought from Sunway College *Worn a few times but brand new condition', \n" +
		"    0, 1500, 15, 'bd133aa9bfe1c2d96786856e0262e14c8a09c206.jpg', \n" +
		"    '2022-09-18 15:37:23', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    60, 'Full Sleeve Hoodie', 'Size:XS \\r\\nNew and only worn once for trial.\\r\\nCause of sale : Too small for me\\r\\nColours Available: \\r\\n☆Baby Blue\\r\\n☆Salmon Pink\\r\\n☆Mint Green\\r\\n☆Viridian Green\\r\\nEach Piece- RM 37\\r\\nAvailable with Zip lock.\\r\\n', \n" +
		"    0, 3700, 27, '027f9acd150c77fa3993e2ae8b5e20061ce92458.jpg', \n" +
		"    '2022-09-22 07:55:01', 1, 0, 2\n" +
		"  ), \n" +
		"  (\n" +
		"    61, 'Test', 'testing', 0, 0, 11, 'e1960da9ce1fdc3762eaa21797f9240abeb9a9af.png', \n" +
		"    '2022-09-23 03:16:34', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    62, 'SHEIN Men Short XXL', 'SHEIN Men Paisley and Patchwork Print Short\\r\\nBrand new, came on the 27th Sep but too large for me.', \n" +
		"    0, 2500, 29, '228844b80b281483181fad7d4af66a4dea131006.jpg', \n" +
		"    '2022-09-27 10:29:06', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    63, 'SHEIN Men Short XL', 'SHEIN Men Multicolor Stripped Print Short XL\\r\\nBrand new, came on the 27th of Sep but too large for me', \n" +
		"    0, 2500, 29, 'edb88354f866fe808d6804bd5073cc3406f1e6c2.jpg', \n" +
		"    '2022-09-27 10:31:06', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    64, 'Dressy code Denim sh', 'Size 22 or S\\r\\nBrand new', \n" +
		"    0, 3000, 16, 'f6fc2e5963c861cc17c4fa6fd3acbd39a9dab3ff.jpg', \n" +
		"    '2022-09-29 07:21:11', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    65, 'Cooking Pan', 'Barely used it and had it lying around. Still new.', \n" +
		"    0, 0, 23, 'default.jpeg', '2022-10-02 04:50:46', \n" +
		"    1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    66, 'test', 'Hello', 0, 0, 9, 'default.jpeg', \n" +
		"    '2022-10-03 23:39:59', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    67, 'test', 'Hello ', 0, 0, 9, 'b170ccf52f1510e0d28d626f8b829b1729b53bef.jpg', \n" +
		"    '2022-10-04 00:25:51', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    68, 'test', 'Hello', 0, 0, 9, '470f731543559a2eb7c34bfc0810bf2dc9e562d3.jpg', \n" +
		"    '2022-10-04 00:30:31', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    69, 'test', 'Hello', 0, 0, 9, 'ef2c6c89f5d6719de0a8ebe6ad6100895bce940b.jpg', \n" +
		"    '2022-10-04 00:32:00', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    70, 'test', 'hello', 0, 599, 11, 'default.jpeg', \n" +
		"    '2022-10-12 09:38:19', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    71, 'Nike Air Force 1 ', 'Brand new! NIKE AIR FORCE 1 \\'07 LV8 NEXT NATURE \\'SAIL\\' - SUN CLUB\\r\\nSize EU 46, UK 11,US 12', \n" +
		"    0, 45000, 28, '25e8e58348673c4b565727ce08cf8620a0036cff.jpg', \n" +
		"    '2022-10-12 09:49:55', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    72, 'Nike Air Force 1', 'Brand new, price is slightly negotiable Nike Air Force 1 sails\\r\\nSize UK 11,Us 12\\r\\n', \n" +
		"    0, 45000, 28, '599ba10515877f869be8da3a11b38583b42a3ae3.jpg', \n" +
		"    '2022-10-12 09:54:20', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    73, 'Printer ', 'A printer used for 6 months. ', \n" +
		"    0, 30000, 31, 'default.jpeg', '2022-10-13 14:05:54', \n" +
		"    0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    74, 'Printer ', 'A printer used for 6 months. ', \n" +
		"    0, 30000, 31, 'default.jpeg', '2022-10-13 14:06:01', \n" +
		"    0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    75, 'Printer ', 'A printer used for 6 months. ', \n" +
		"    0, 30000, 31, 'default.jpeg', '2022-10-13 14:06:03', \n" +
		"    0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    76, 'Printer ', 'A printer used for 6 months. ', \n" +
		"    0, 30000, 31, 'ad793045791228f71b50589ece3aba7b9e51208d.jpg', \n" +
		"    '2022-10-13 14:06:40', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    77, 'Philux Rice Cooker ', '1.8 L used only twice \\r\\nComes with box and cable\\r\\nSelling because barely finding use for it', \n" +
		"    0, 5000, 30, '338f9ec02427ba161505528f6166fc01a2b79509.jpg', \n" +
		"    '2022-10-17 10:35:25', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    78, 'Vacuum cleaner', 'Redbuzz 2in1. I have the red variant. Ill give box and all that came with it. ', \n" +
		"    0, 6000, 30, 'b05c798310d23fbcac5be6258ff5df2ec648db31.jpg', \n" +
		"    '2022-10-17 10:40:44', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    79, 'Adidas slippers', 'Good as new adidas slippers', \n" +
		"    0, 10000, 32, 'default.jpeg', '2022-10-20 06:12:09', \n" +
		"    0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    80, 'Adidas slippers', 'Good as new adidas slippers', \n" +
		"    0, 10000, 32, 'c5b9744e85d443d68c5b46c1d0d6ff4088e9a9f8.jpg', \n" +
		"    '2022-10-20 06:12:09', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    81, 'Bed sheeds', 'Includes pillow, pillow cover, sheeds and bes', \n" +
		"    0, 8000, 32, 'f4d0f2d1fdb612bbc1bc3b8c8ba35d63889ae155.jpg', \n" +
		"    '2022-10-20 06:16:07', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    82, 'Adidas Slippers', 'As good as new, size 46', \n" +
		"    0, 9000, 32, 'c5b9744e85d443d68c5b46c1d0d6ff4088e9a9f8.jpg', \n" +
		"    '2022-10-20 06:17:44', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    83, 'Lab Coat MUM', 'Monash University lab coat in size XL. Only wore a few times so still in perfectly new condition. Bought for 70 MYR. Price is negotiable :)', \n" +
		"    0, 4000, 33, 'a904a7e18c46c506a7935252cfd8cda2c6de014a.jpg', \n" +
		"    '2022-10-23 06:16:15', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    84, 'Blouse ', 'New blouse/top from Nichi, unworn, size xl ', \n" +
		"    0, 3700, 34, 'e5bb3281c26b168799b7bc440824119d59f0e9f3.jpg', \n" +
		"    '2022-10-25 14:13:48', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    85, 'Uniqlo beige skirt', 'Long circular skirt, size L, never been worn so brand new ', \n" +
		"    0, 10000, 36, 'c79041204fe336192779a8a60c137b83316f9b21.jpg', \n" +
		"    '2022-10-30 17:20:22', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    86, 'Philips iron', 'Philips 2000w steam iron', \n" +
		"    0, 6500, 37, 'default.jpeg', '2022-11-01 19:56:21', \n" +
		"    0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    87, 'Philips 2000w Iron', 'Philips 2000w steam iron', \n" +
		"    0, 6500, 37, '593e8bf843c7d6bb074fa9140aad330f74b6e1db.jpg', \n" +
		"    '2022-11-01 19:57:12', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    88, 'Elba 1.7L kettle', 'Elba 1.7L kettle', \n" +
		"    0, 5500, 37, '3ea680edada538203f60b214179cb8e486550aaf.jpg', \n" +
		"    '2022-11-01 19:59:09', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    89, 'Test', 'Test', 0, 6900, 9, '15b7bb2774785c3778b6dbfdda05b0f13e2b9136.jpg', \n" +
		"    '2022-11-03 09:55:48', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    90, 'Sport shoes Kalanji', 'Sport shoes from Kalanji, size EU40, only worn a few times so they are as good as new. ', \n" +
		"    0, 5000, 33, '55ee4d85a3ca3557bba6f5af581fe4e5e052f5e8.jpg', \n" +
		"    '2022-11-07 03:38:37', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    91, 'Novels', 'Paperback. Recently bought from Popular. In perfect condition. ', \n" +
		"    0, 6000, 38, 'd480854d6608c20f1ca5832cbe5cebc75d2c683c.jpg', \n" +
		"    '2022-11-07 22:34:09', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    92, 'Novels', 'Paperback. Recently bought from Popular. In perfect condition. ', \n" +
		"    0, 6000, 38, 'd480854d6608c20f1ca5832cbe5cebc75d2c683c.jpg', \n" +
		"    '2022-11-07 22:34:17', 1, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    93, 'Novel', 'Paperback. Bought from Popular. In perfect condition.', \n" +
		"    0, 3500, 38, 'bbef5df5de98d7eb92f3755831d6c7b76740ca27.jpg', \n" +
		"    '2022-11-07 22:37:17', 0, 0, 1\n" +
		"  ), \n" +
		"  (\n" +
		"    94, 'Novel', 'Paperback. Recently bought from Popular. In perfect condition.', \n" +
		"    0, 4000, 38, 'bbef5df5de98d7eb92f3755831d6c7b76740ca27.jpg', \n" +
		"    '2022-11-07 22:50:49', 1, 0, 1\n" +
		"  ),"
	
	const sessions = "(\n" +
		"    '06c10d3c45861b47738adc93c0d4bfcb777aa363c052177a83bb9c2f3dcdc5a1', \n" +
		"    9, '2022-10-22 02:48:24', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '07195bf5a75702386e17a7907949dcd44621ea4a347769acd9c03fef8e1e61bd', \n" +
		"    28, '2022-09-22 15:18:18', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '18c4c787f624cae34315b2b92e3b6e88a1bebe8aab68b52a3d041fc035e69b24', \n" +
		"    18, '2022-09-16 11:57:17', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '190242ec28fd58dfd6092a37934d9c8c4208b08c1d054f40ba3c66bff8c75130', \n" +
		"    9, '2022-09-13 04:53:46', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '1d6f1655210db14f8665eea6ee651c76d952e868ba30358d8866a7252e42d8f6', \n" +
		"    13, '2022-09-15 10:35:05', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '26d207242f2b1d908c523efc451da104726216a69f047bd55d91492029968752', \n" +
		"    15, '2022-09-16 03:00:43', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '2bb693e518506f6730133883f15330f8f2e4ba24be104cf8d0a5f70b6f20d900', \n" +
		"    12, '2022-09-16 15:58:38', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '2eb25c103899a328d843900b1f866937bb09627486a32101298ed8c93c52c60b', \n" +
		"    16, '2022-09-16 11:20:12', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '2f768b91b3632e0e95b1b22d8b3d5da7de6e3f22844cd4c58815ba885ac53c42', \n" +
		"    24, '2022-09-18 12:51:50', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '3105ba549b13949f1b995321886617baf5a5b5651f9b28d6c436f49bd3f7a5c8', \n" +
		"    29, '2022-09-27 10:24:15', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '349e597d9681988228a849b2fcfcaaecf9cb85f67da5e53545f11b0b57961a2c', \n" +
		"    17, '2022-09-16 11:56:14', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '3da144f1c494b857e221433ce077e4ca8c24dbd76c014ba5470dfdd9922d890c', \n" +
		"    14, '2022-09-15 21:10:35', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '3f1cbe24c66bc65dd1f361ea12d1db2716a928df7fdfd16dae13382f3b85b6f8', \n" +
		"    32, '2022-10-20 06:11:10', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '3f3edb08de7d7386028758b00bba4d60652ce29eb1ce91b9316f6cda13330250', \n" +
		"    34, '2022-10-25 14:09:45', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '41c614c33c69aa7065a5f47b7fe72321d6c9c0033c30d2f9a8a7c962e74dce99', \n" +
		"    38, '2022-11-07 19:57:43', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '50f33ee1d4d7cd9ad60b7b346fbde278795b48e720a3a6631ad56b4dbb4c4316', \n" +
		"    23, '2022-09-18 06:25:14', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '59bdef3c7bcf2b1e369d562355906963773613acd70e2b6c974725b74e549cc6', \n" +
		"    35, '2022-10-29 17:27:08', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '5a47275e02d636bc63884e83caa7863913c55b8f58ab9f0b784884f95bcd7eeb', \n" +
		"    9, '2022-09-11 09:50:40', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '5f81e2c43922c7dd08e9187ef36496b2737f57d9ed47152b1543deaddd90a304', \n" +
		"    21, '2022-09-17 14:52:28', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '618e53a61b56d32f778a55e42b0112a644d200c565c38c3e15938b521ba7139a', \n" +
		"    9, '2022-11-08 11:09:22', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '621248a5fe25d5d23ebd6eb069eaac7dfbc977bd19229c8460472ecbba78ca2b', \n" +
		"    33, '2022-10-23 06:14:32', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '62856a344b205caec33c17fa7e996abe510ea157698184acf700ae86d34cfeae', \n" +
		"    9, '2022-11-10 08:13:35', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '6ef0818412c462c9e897e152c94f0334e98c7c80bf27d5013c8fe081f7138b6f', \n" +
		"    26, '2022-09-19 08:57:42', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '6ef309c0c4a3381664847206f7d07d3f792176d5f17fe95278860a49a411fc74', \n" +
		"    9, '2022-09-30 08:47:50', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '761ed499aae8518b003cd23f5ed982102dd9af6de1bff2dae907eccc075dd441', \n" +
		"    38, '2022-11-07 20:22:10', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '7f04590faddb99caf752d7405740778aa1cc3de2b1c1ceab3b3dfaf8825badc0', \n" +
		"    20, '2022-09-16 21:36:23', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '92f6d51915a3b9eacb4d41af18f7f3151d975f3f18b4f14bf5ab9037fcf054fc', \n" +
		"    10, '2022-09-14 16:37:12', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    '9fe5686cf23b4e6e15560cb42e5c7aa5fa5305768e0a2f3f3eca0d6ef8d96bd7', \n" +
		"    22, '2022-09-17 21:31:40', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'a033e99781812726b0023a499d92e71e745ac8bec132c21132819e328cd01e8d', \n" +
		"    11, '2022-09-14 18:37:02', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'a1cd3b05e539d7c8b4e1d45464ca765611132e6369db9c2ff47c206aea981d44', \n" +
		"    14, '2022-09-28 11:46:45', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'b267873209d4a786712b5bda7e3918e8aa863c7305ec71c1d02889688d0233e1', \n" +
		"    22, '2022-09-17 21:31:08', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'baebe4257c50c292911c220122e11c37c9825c41586e5b0af5bb42ec559deed2', \n" +
		"    31, '2022-10-13 14:03:50', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'bbe508fe49c667162062fa46369bc299a019a1f1589953d383cb22f8b88d85e8', \n" +
		"    12, '2022-09-15 05:02:43', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'bfdd23d10c738e50e59820fe79a2d0ac6265cce2af049cdb8707b8701c15e009', \n" +
		"    9, '2022-11-03 09:55:27', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'c5f3461ba8d78bfcb7f6cb3cf50abbdde84cddb5cece5b0310baccac911c7e39', \n" +
		"    13, '2022-09-15 10:30:54', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'cf3f64bb35bee5f9177fe31e9301e6655115409a67fd0b1443686b43353072fa', \n" +
		"    30, '2022-10-11 04:07:54', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'd0b2516597625352be16079c10b8336997c9fa9087201e1f89fa4cb8131bb70f', \n" +
		"    30, '2022-10-17 10:32:41', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'd0b2e102c62bcd0fabab98a2fa9828b4b1e0d21b8254f3cb9da1b56e3eb2fcda', \n" +
		"    12, '2022-09-17 02:38:08', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'd0daa5ac36604921ececa878be5de4c04056f9a2c9d221e8e88c84a4936b83f9', \n" +
		"    9, '2022-09-30 10:55:21', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'd4701cb6a8e7fa6536fdcae2506cfbc9782cfd88ab9bfb236e6ece5ffcb61343', \n" +
		"    36, '2022-10-30 16:58:14', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'd6d36e445127d54a09dab01f56bcdf1df9474da5349572a9ddefc3b3baa84919', \n" +
		"    12, '2022-09-19 17:24:41', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'd8486baa09da15299d3736caa19374a1df4490d61de0789a95aab37ef22dafa0', \n" +
		"    20, '2022-09-16 18:32:28', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'd8b0f1cbc1b71dc0cee76006c16b956582af98512e65a1e22ddfee8aa7eab5ec', \n" +
		"    9, '2022-09-11 09:38:53', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'db16ae66ad1641da474ba55c63c949037c3bddf4c896faa514c429c8c00338c3', \n" +
		"    37, '2022-11-01 19:51:09', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'e0328f7ac68fe04d0fa1a60c8cbcac087bbef0191dadc2a07a90923051c2dac1', \n" +
		"    14, '2022-09-15 21:09:22', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'e3cfa843099f5b6179dc8e0730c5889b3a59da97fa1c7eaf6830b496bd6e2cf9', \n" +
		"    19, '2022-09-16 13:10:29', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'e8532020d1473ec3f40b44d789722236d585e053a570bc58ab4002f662ccf9ba', \n" +
		"    27, '2022-09-22 07:37:29', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'ec4abf74ea43cd933230f33fe2ea7973f653d56209dfad1a3fd38215dc76bb29', \n" +
		"    9, '2022-09-30 08:40:35', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'efab764c6b28f2e3e08757ff394d22a4f0e64c228953c15b845e2fd5c27d6dfa', \n" +
		"    25, '2022-09-18 14:20:04', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'f4bb9d3bd26f462b0416cd77b2e76d43f7595d8f8ae97b5c7a320a992cf5ea4c', \n" +
		"    23, '2022-10-02 04:48:34', NULL\n" +
		"  ), \n" +
		"  (\n" +
		"    'fe5770b3fa1b062643a9ac7ace59a1f96e5ae2016195bda202ac9bdd6aec438a', \n" +
		"    9, '2022-09-17 07:35:16', NULL\n" +
		"  )"
	
	const text1 = users.replace(/\s+/g, "");
	const text2 = sessions.replace(/\s+/g, "");
	const regex1 = /\((.*?)\)/gm
	const userFields = text1.match(regex1);
	const sessionFields = text2.match(regex1);
	
	let finalUser = [];
	const pronounsList = ['Rather not say', 'He/Him', 'She/Her', 'They/Them'];
	for (let field of userFields) {
		field = field.slice(1, -1);
		//field = field.replace(/'+/g, "");
		const values = field.split(',');
		finalUser.push(
			{
				tempId: parseInt(values[0]),
				username: values[1].slice(1, -1),
				password: values[2].slice(1, -1),
				name: values[3].slice(1, -1),
				pronouns: pronounsList[parseInt(values[4])],
				profilePicture: values[5].slice(1, -1),
				preferWhatsapp: true,
				whatsapp: values[6].slice(1, -1),
				sessions: []
			});
	}
	
	for (let field of sessionFields) {
		field = field.slice(1, -1);
		const values = field.split(',');
		for (let i = 0; i < finalUser.length; i++){
			if (finalUser[i].tempId == values[1]) {
				finalUser[i].sessions.push({
					session: values[0].slice(1, -1)
				})
			}
		}
	}
	
	
	const regex2 = /\((.*?)\),/gm
	const regex3 = /\'(.*?)\'/gm
	const text3 = products.replace(/\n+/g, "");
	const productFields = text3.match(regex2);
	
	let finalProduct = []
	for (let field of productFields) {
		field = field.slice(1, -1);
		field = field.replace(/(\\r\\n)+/g, "");
		field = field.replace(/(\\)+/g, "/");
		const strings = [...field.matchAll(regex3)];
		field = field.replace(/(')+/g, "");
		const values = field.split(',');
		const length = values.length;
		finalProduct.push(
			{
				seller: parseInt(values[length-6]),
				title: strings[0][1],
				description: strings[1][1],
				price: parseFloat(values[length-7] / 100).toFixed(2),
				picture: strings[2][1],
				hidden: values[length-3] == 0
			});
	}
	
	res.json(finalUser)
}

module.exports = router;