/* O Barradas — dados reais (fonte: obarradas.com, ementa PDF e carta de vinhos, nov 2026).
   Etiquetas: g = contém glúten · l = contém lactose · sg = disponível sem glúten · sl = disponível sem lactose
   pair = vinho da casa sugerido (chave de WINES) */

window.CONFIG = {
  phone: '+351961657357',
  phoneLabel: '+351 961 657 357',
  whatsapp: '351961657357',
  email: 'quintadobarradas@gmail.com',
  instagram: 'https://www.instagram.com/quinta_do_barradas/',
  address: 'Sítio da Venda Nova, 8300-054 Silves, Faro, Portugal',
  lat: 37.1640208,
  lng: -8.4463096,
  googleMaps: 'https://maps.google.com/?cid=983618798138190307',
  tripadvisor: 'https://www.tripadvisor.co.uk/Restaurant_Review-g189122-d1474683-Reviews-O_Barradas-Silves_Faro_District_Algarve.html',
  fodors: 'https://www.fodors.com/world/europe/portugal/the-algarve/places/silves/restaurants',
  lonelyplanet: 'https://www.lonelyplanet.com/portugal/the-algarve/silves/restaurants/restaurante-o-barradas/a/poi-eat/1118083/360375',
  complaints: 'https://www.livroreclamacoes.pt/',
  /* TheFork: quando o restaurante ativar o TheFork Manager, colar aqui o URL da página
     (ex.: https://www.thefork.pt/restaurante/o-barradas-r000000) ou o ID do widget. */
  theforkUrl: '',
  theforkWidgetId: '',
  /* Horário: 18:00–00:00, cozinha até 22:00, fecha à quarta (3) */
  open: 18, close: 24, kitchenClose: 22, closedDay: 3,
  slots: ['18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'],
  googleRating: 4.7, googleReviews: 932
};

window.WINES = {
  selecao: {
    name: 'Seleção', vintage: '2020', img: 'img/vinho-selecao.jpg', color: '#b3263a',
    price: '22,50 €', glass: '6,50 €', alc: 14, temp: '17–18 °C',
    grapes: [['Touriga Nacional', 40], ['Syrah', 30], ['Aragonês', 30]],
    pt: { type: 'Tinto', notes: 'Cor cereja preta concentrada. Aroma rico em frutos pretos e chocolate negro, bem combinados com pimenta preta. Bom ataque, taninos maduros e fim de prova persistente e aromático.', pair: 'Carnes de caça e vermelhas', extra: 'Enologia: Joana Maçanita' },
    en: { type: 'Red', notes: 'Deep black-cherry colour. A nose rich in black fruit and dark chocolate, woven with black pepper. Lively attack, ripe tannins and a long, aromatic finish.', pair: 'Game and red meats', extra: 'Winemaker: Joana Maçanita' }
  },
  reserva: {
    name: 'Reserva', vintage: '2018', img: 'img/vinho-reserva.jpg', color: '#d99a2b',
    price: '37,00 €', alc: 14.5, temp: '16–17 °C',
    grapes: [['Syrah', 34], ['Aragonês', 33], ['Touriga Nacional', 33]],
    grapesApprox: true,
    pt: { type: 'Tinto Reserva', notes: '18 meses, 100% em barricas de carvalho francês. Cor cereja concentrada; frutas pretas e violetas bem integradas com as notas caramelizadas da barrica. Muito rico, taninos presentes e boa elegância.', pair: 'Pratos de carne condimentados', extra: 'Grande Medalha de Ouro — melhor vinho do Algarve (2017)' },
    en: { type: 'Red Reserve', notes: '18 months, 100% in French oak barrels. Concentrated cherry colour; black fruit and violets beautifully integrated with caramelised oak notes. Rich, firm tannins and real elegance.', pair: 'Spiced meat dishes', extra: 'Grand Gold Medal — best wine of the Algarve (2017)' }
  },
  syrah: {
    name: 'Reserva Syrah', vintage: '2018', img: 'img/vinho-reserva-syrah.jpg', color: '#7a1f4b',
    price: '50,00 €', alc: null, temp: '16–17 °C',
    grapes: [['Syrah', 100]],
    pt: { type: 'Tinto monocasta', notes: 'Fermentado a temperatura controlada durante 20 dias, 18 meses em barricas de carvalho francês. Violetas, gomas pretas e especiarias. Muito rico, taninos redondos e enorme elegância.', pair: 'Carnes assadas e estufadas, queijos de pasta cremosa', extra: 'Nascido em 2014' },
    en: { type: 'Single-varietal red', notes: 'Fermented at controlled temperature for 20 days, then 18 months in French oak. Violets, black fruit pastilles and spice. Very rich, round tannins and immense elegance.', pair: 'Roasts and stews, soft creamy cheeses', extra: 'First released in 2014' }
  },
  rose: {
    name: 'Rosé', vintage: '2020', img: 'img/vinho-rose.jpg', color: '#f08a9a',
    price: '22,50 €', glass: '6,50 €', alc: 12.5, temp: '8–10 °C',
    grapes: [['Touriga Nacional', 34], ['Syrah', 33], ['Aragonês', 33]],
    grapesApprox: true,
    pt: { type: 'Rosé', notes: 'Coloração vermelho rosado e aroma intenso a frutas vermelhas. Paladar agradável, fresco e de sabor persistente.', pair: 'Saladas, peixe e carnes brancas grelhadas', extra: 'Também em branco' },
    en: { type: 'Rosé', notes: 'Rosy-red hue with an intense red-fruit nose. Pleasant, fresh and persistent on the palate.', pair: 'Salads, fish and grilled white meats', extra: 'Also available as a white' }
  }
};

window.MENU = [
  { id: 'couvert', img: 'img/s/bruschetta.jpg', pt: 'Couvert', en: 'Couvert', items: [
    { pt: 'Pão, manteiga, salada de cenoura e azeitonas', en: 'Bread, butter, carrot salad and olives', p: '1,80 €', t: ['l','g','sg','sl'], npt: 'Sem glúten e/ou sem lactose: 2,00 €', nen: 'Gluten- and/or lactose-free: €2.00' },
    { pt: 'Paté de atum caseiro', en: 'Homemade tuna pâté', p: '2,00 €', npt: '2 pessoas', nen: 'for 2' }
  ]},
  { id: 'entradas', img: 'img/s/polvo.jpg', pt: 'Entradas', en: 'Starters', items: [
    { pt: 'Salada de polvo com bruschetta', en: 'Octopus salad with bruschetta', p: '14,00 €', t: ['g','sg'], pair: 'rose' },
    { pt: 'Queijo fresco de ovelha', dpt: 'azeite extra virgem e doce de abóbora caseiro', en: 'Fresh sheep\'s cheese', den: 'extra-virgin olive oil and homemade pumpkin jam', p: '9,50 €', t: ['l'], pair: 'rose' },
    { pt: 'Melão com presunto de porco preto', dpt: 'maturação de 30 meses', en: 'Melon with black-pork ham', den: 'aged 30 months', p: '14,00 €', pair: 'selecao' },
    { pt: 'Filetes de cavala em azeite', dpt: 'com salada algarvia', en: 'Mackerel fillets in olive oil', den: 'with Algarve-style salad', p: '10,50 €', pair: 'rose' },
    { pt: 'Camarões à moda da casa', dpt: 'camarões fritos com alho em molho picante', en: 'House-style prawns', den: 'fried with garlic in a spicy sauce', p: '13,00 €', pair: 'rose' },
    { pt: 'Espetada de camarão grelhada', dpt: 'com aioli', en: 'Grilled prawn skewer', den: 'with aioli', p: '15,00 €', t: ['l','sl'], pair: 'rose' },
    { pt: 'Pimentos marinados com anchovas', en: 'Marinated peppers with anchovies', p: '14,00 €', pair: 'rose' },
    { pt: 'Tarte de queijo de cabra com figos em Moscatel', dpt: 'saladinha de tomate cherry e uvas', en: 'Goat\'s cheese tart with Moscatel figs', den: 'cherry tomato and grape salad', p: '11,00 €', t: ['l','g'], pair: 'rose' },
    { pt: 'Muxama de atum', dpt: 'mistura de alfaces, vinagrete com alcaparras e lascas de queijo', en: 'Cured tuna loin (muxama)', den: 'mixed leaves, caper vinaigrette and cheese shavings', p: '13,50 €', t: ['l'], pair: 'rose' },
    { pt: 'Cocktail de camarão com ananás fresco', en: 'Prawn cocktail with fresh pineapple', p: '12,50 €', pair: 'rose' },
    { pt: 'Salada à moda da casa', dpt: 'queijo fresco, tomate em azeite de manjericão e creme balsâmico', en: 'House salad', den: 'fresh cheese, tomato in basil oil and balsamic cream', p: '10,50 €', t: ['l'], pair: 'rose' },
    { pt: 'Salada verde', dpt: 'abacate, romã, pera e vinaigrette de mel', en: 'Green salad', den: 'avocado, pomegranate, pear and honey vinaigrette', p: '9,00 €', pair: 'rose' },
    { pt: 'Salada de tomate', en: 'Tomato salad', p: '7,50 €' },
    { pt: 'Salada mista', en: 'Mixed salad', p: '8,50 €' },
    { pt: 'Sopa de legumes', en: 'Vegetable soup', p: '4,00 €' },
    { pt: 'Sopa de tomate', en: 'Tomato soup', p: '5,00 €' }
  ]},
  { id: 'carne', img: 'img/s/sala-lareira.jpg', pt: 'Carne', en: 'Meat', sub: true, items: [
    { h: { pt: 'Tudo na grelha', en: 'From the grill' } },
    { pt: 'Peito de frango marinado em mel e limão', dpt: 'tomate cherry grelhado, molho de laranja, manga e piri-piri', en: 'Chicken breast marinated in honey and lemon', den: 'grilled cherry tomatoes, orange, mango and piri-piri sauce', p: '17,50 €', pair: 'rose' },
    { pt: 'Lombinho de porco à casa', dpt: 'marinado em vinho tinto e romã, manteiga de nozes', en: 'House pork tenderloin', den: 'marinated in red wine and pomegranate, walnut butter', p: '19,00 €', t: ['l','sl'], pair: 'selecao' },
    { pt: 'Lombinho de porco Ibérico', dpt: 'manga e ananás grelhado, molho picante', en: 'Iberian pork tenderloin', den: 'grilled mango and pineapple, spicy sauce', p: '22,00 €', pair: 'reserva' },
    { pt: 'Espetada especial', dpt: 'lombinho de porco, vitela Mirandesa, bacon e chalotas, maionese da casa', en: 'Special skewer', den: 'pork tenderloin, Mirandesa veal, bacon and shallots, house mayonnaise', p: '23,50 €', pair: 'reserva' },
    { pt: 'Lombinhos de borrego', dpt: 'maçã salteada, molho de vinho do Porto e menta com morangos', en: 'Lamb tenderloins', den: 'sautéed apple, Port wine and mint sauce with strawberries', p: '29,50 €', pair: 'syrah' },
    { pt: 'Bife de borrego', dpt: 'manteiga com menta e alho', en: 'Lamb steak', den: 'mint and garlic butter', p: '24,00 €', t: ['l','sl'], pair: 'syrah' },
    { h: { pt: 'Vitela Mirandesa · DOP', en: 'Mirandesa veal · PDO' } },
    { pt: 'Posta', dpt: 'molho de vinho do Porto com tomilho', en: 'Thick-cut steak (posta)', den: 'Port wine and thyme sauce', p: '33,50 €', pair: 'syrah', star: true },
    { pt: 'Costeleta', dpt: 'manteiga de vinho tinto', en: 'Rib chop', den: 'red wine butter', p: '30,50 €', t: ['l'], pair: 'reserva' },
    { pt: 'Bife', dpt: 'molho de vinho branco e estragão', en: 'Steak', den: 'white wine and tarragon sauce', p: '30,50 €', t: ['l'], pair: 'reserva' },
    { h: { pt: 'Do tacho', en: 'From the pot' } },
    { pt: 'Guisado de borrego', dpt: 'deliciosa especialidade da casa', en: 'Lamb stew', den: 'the house speciality', p: '21,00 €', t: ['g','sg'], pair: 'syrah', star: true },
    { h: { pt: 'No forno', en: 'From the oven' } },
    { pt: 'Lombinhos de porco', dpt: 'bacon e figos em molho de vinho branco e pimenta, gratinados com queijo de ovelha', en: 'Pork tenderloins', den: 'bacon and figs in white wine and pepper sauce, gratinated with sheep\'s cheese', p: '20,00 €', t: ['l'], pair: 'selecao' }
  ], foot: { pt: 'Acompanhamento à escolha: batata à moda da casa (azeite, cebola e orégãos), arroz ou batata frita · legumes salteados', en: 'Choose your side: house potatoes (olive oil, onion, oregano), rice or fries · sautéed vegetables' } },
  { id: 'peixe', img: 'img/s/peixe-grelhado.jpg', pt: 'Peixe', en: 'Fish', intro: { pt: 'Peixe selvagem do Atlântico, sobretudo da zona de Sagres. Variedade e preço conforme a pesca do dia.', en: 'Wild Atlantic fish, mostly from around Sagres. Variety and price follow the day\'s catch.' }, items: [
    { pt: 'Peixe grelhado', dpt: 'com manteiga de alho', en: 'Grilled fish', den: 'with garlic butter', p: { pt: 'pesca do dia', en: 'catch of the day' }, t: ['l','sl'], npt: 'Também com manteiga sem lactose ou alho e azeite', nen: 'Also with lactose-free butter or garlic and olive oil', pair: 'rose' },
    { pt: 'Peixe frito', dpt: 'em manteiga, com alho e alcaparras', en: 'Pan-fried fish', den: 'in butter with garlic and capers', p: { pt: 'pesca do dia', en: 'catch of the day' }, t: ['l','g','sg','sl'], pair: 'rose' },
    { h: { pt: 'Pratos tradicionais portugueses', en: 'Traditional Portuguese dishes' } },
    { pt: 'Peixe no forno à moda algarvia', dpt: 'alho, tomate, cebolas, batatas… e vinho branco', en: 'Algarve-style baked fish', den: 'garlic, tomato, onion, potatoes… and white wine', p: { pt: 'pesca do dia', en: 'catch of the day' }, pair: 'rose' },
    { pt: 'Peixe no forno à moda da casa', dpt: 'coentros, salsa, cebolas, batatas… e vinho branco', en: 'House-style baked fish', den: 'coriander, parsley, onion, potatoes… and white wine', p: { pt: 'pesca do dia', en: 'catch of the day' }, pair: 'rose' },
    { pt: 'Peixe ao sal', dpt: 'assado em crosta de sal', en: 'Salt-crusted fish', den: 'baked in a salt crust', p: { pt: 'pesca do dia', en: 'catch of the day' }, order: true, pair: 'rose' },
    { pt: 'Caldeirada', en: 'Caldeirada (fish stew)', p: '58,00 €', npt: '2 pessoas', nen: 'for 2', order: true, pair: 'rose', star: true },
    { pt: 'Cataplana de peixe', en: 'Fish cataplana', p: '58,00 €', npt: '2 pessoas', nen: 'for 2', order: true, pair: 'rose', star: true },
    { pt: 'Cataplana algarvia', dpt: 'prato tradicional de carne de porco e amêijoas', en: 'Algarve cataplana', den: 'traditional pork and clams', p: '60,00 €', npt: '2 pessoas', nen: 'for 2', order: true, pair: 'selecao' }
  ]},
  { id: 'marisco', img: 'img/s/camaroes.jpg', pt: 'Marisco', en: 'Seafood', intro: { pt: 'Todo o marisco que servimos é selvagem.', en: 'All the seafood we serve is wild-caught.' }, items: [
    { pt: 'Espetada de camarão', dpt: 'grelhada, com molho de pimento à moda da casa', en: 'Prawn skewer', den: 'grilled, with house pepper sauce', p: '32,00 €', pair: 'rose' },
    { pt: 'Camarão tigre (4–6/kg)', dpt: 'grelhado, com aioli, molho de cocktail e manteiga com alho', en: 'Tiger prawns (4–6/kg)', den: 'grilled, with aioli, cocktail sauce and garlic butter', p: '125,00 €/kg', t: ['l','sl'], pair: 'rose' },
    { pt: 'Lagosta de Sagres', dpt: 'para duas ou mais pessoas', en: 'Sagres lobster', den: 'for two or more', p: { pt: 'preço do dia', en: 'market price' }, order: true, pair: 'rose', star: true }
  ]},
  { id: 'veg', img: 'img/s/prato-quiche.jpg', pt: 'Vegetariano & Vegan', en: 'Vegetarian & Vegan', items: [
    { pt: 'Gratinado de batatas e legumes', dpt: 'saladinha de tomate e laranja', en: 'Potato and vegetable gratin', den: 'tomato and orange salad', p: '17,00 €', t: ['l'], veg: 1, pair: 'rose' },
    { pt: 'Quiche de abóbora', dpt: 'saladinha verde com uvas e tomate cherry', en: 'Pumpkin quiche', den: 'green salad with grapes and cherry tomatoes', p: '17,00 €', t: ['l','g','sg'], veg: 1, pair: 'rose' },
    { pt: 'Caçarola de batatas e legumes', dpt: 'leite de coco e amêndoas, saladinha de tomate e laranja', en: 'Potato and vegetable casserole', den: 'coconut milk and almonds, tomato and orange salad', p: '17,00 €', veg: 2, pair: 'rose' },
    { pt: 'Caril de grão e espinafre', dpt: 'com arroz e ananás grelhado', en: 'Chickpea and spinach curry', den: 'with rice and grilled pineapple', p: '17,00 €', veg: 2, pair: 'rose' },
    { pt: 'Polenta de azeitonas e tomate', dpt: 'esparguete de courgette, cogumelos e tomate cereja salteados', en: 'Olive and tomato polenta', den: 'courgette spaghetti, sautéed mushrooms and cherry tomatoes', p: '17,00 €', veg: 2, pair: 'selecao' }
  ]},
  { id: 'infantil', img: 'img/s/esplanada-dia.jpg', pt: 'Menu infantil', en: 'Kids', items: [
    { pt: 'Douradinhos', dpt: 'com batatas fritas e/ou arroz', en: 'Fish fingers', den: 'with fries and/or rice', p: '8,50 €', t: ['g'] },
    { pt: 'Peito de frango', dpt: 'com batatas fritas e/ou arroz', en: 'Chicken breast', den: 'with fries and/or rice', p: '8,50 €' },
    { pt: 'Esparguete à bolonhesa', en: 'Spaghetti bolognese', p: '8,50 €', t: ['g','sg'] }
  ]},
  { id: 'sobremesas', img: 'img/s/sobremesa-chocolate.jpg', pt: 'Sobremesas', en: 'Desserts', intro: { pt: 'Uma escolha criativa e diversificada de sobremesas caseiras, que muda com a estação. Peça a carta de sobremesas — também existe sem glúten e sem lactose.', en: 'A creative, ever-changing choice of homemade desserts. Ask for the dessert menu — gluten-free and lactose-free versions available.' }, items: [] },
  { id: 'extras', img: 'img/s/garrafeira.jpg', pt: 'Vinho & extras', en: 'Wine & extras', items: [
    { pt: 'Quinta do Barradas 0,75 l', dpt: 'tinto · branco · rosé', en: 'Quinta do Barradas 0.75 l', den: 'red · white · rosé', p: '22,50 €' },
    { pt: 'Quinta do Barradas Reserva 0,75 l', en: 'Quinta do Barradas Reserva 0.75 l', p: '37,00 €' },
    { pt: 'Quinta do Barradas Reserva Syrah 0,75 l', en: 'Quinta do Barradas Reserva Syrah 0.75 l', p: '50,00 €' },
    { pt: 'Copo de vinho', dpt: 'tinto · branco · rosé', en: 'Glass of wine', den: 'red · white · rosé', p: '6,50 €' },
    { pt: 'Dose extra — batata à moda da casa', en: 'Extra side — house potatoes', p: '3,50 €' },
    { pt: 'Dose extra — batata frita', en: 'Extra side — fries', p: '4,00 €' },
    { pt: 'Dose extra — arroz', en: 'Extra side — rice', p: '2,50 €' },
    { pt: 'Dose extra — legumes salteados', en: 'Extra side — sautéed vegetables', p: '3,50 €' }
  ], foot: { pt: 'Também vendemos o nosso vinho para levar. IVA incluído à taxa em vigor.', en: 'Our wine is also sold to take home. VAT included.' } }
];

window.TIMELINE = [
  { y: '2006', pt: 'Plantamos a vinha: Touriga Nacional, Syrah e Aragonês, a 60 m de altitude, a sul de Silves.', en: 'We plant the vineyard — Touriga Nacional, Syrah and Aragonês — 60 m above sea level, south of Silves.' },
  { y: '2010', pt: 'Primeira vindima. Grande qualidade logo de início.', en: 'First harvest — great quality from day one.' },
  { y: '2014', pt: 'Nasce o Quinta do Barradas Reserva Syrah: 18 meses em carvalho francês.', en: 'Birth of the Reserva Syrah — 18 months in French oak.' },
  { y: '2017', pt: 'Concurso de Vinhos do Algarve: Ouro para o Seleção e Grande Ouro — melhor vinho do Algarve — para o Reserva.', en: 'Algarve Wine Awards: Gold for Seleção and Grand Gold — best wine in the Algarve — for the Reserva.' },
  { y: '2018', pt: 'Colheita premiada: Ouro para o Reserva 2018, Prata para o Seleção 2018 e o Reserva Syrah 2018.', en: 'An awarded vintage: Gold for Reserva 2018, Silver for Seleção 2018 and Reserva Syrah 2018.' }
];

window.GALLERY = [
  ['jardim-noite-cheio','espaco'], ['prato-quiche','pratos'], ['vista-aerea','quinta'], ['esplanada-dia','espaco'],
  ['sobremesa-gelado','pratos'], ['garrafeira-escada','espaco'], ['uvas-tintas','quinta'], ['mesa-azul','espaco'],
  ['camaroes','pratos'], ['sala-lareira','espaco'], ['folhas-vermelhas','quinta'], ['bruschetta','pratos'],
  ['esplanada-cheia','espaco'], ['vinha-trabalho','quinta'], ['peixe-grelhado','pratos'], ['bar-vinhos','espaco'],
  ['vinha-por-do-sol','quinta'], ['sobremesa-chocolate','pratos'], ['sala-exposicao','espaco'], ['cachos-verdes','quinta'],
  ['polvo','pratos'], ['fachada','espaco'], ['folhas-roxas','quinta'], ['sobremesa-semifrio','pratos'],
  ['copo-azul','espaco'], ['vinha-outono','quinta'], ['sobremesa-frutos','pratos'], ['sala-lareira-2','espaco'],
  ['garrafeira','espaco'], ['vinha-ocaso','quinta'], ['uvas-tintas-2','quinta'], ['esplanada-tarde','espaco']
];

/* Opiniões reais (verbatim). Fontes: Google via Wanderlog e Restaurant Guru, consultadas a 16/11/2026 */
window.RATINGS = [
  { src: 'Google', score: '4,7', max: '5', count: 932, url: 'https://maps.google.com/?cid=983618798138190307' },
  { src: 'Tripadvisor', score: '4,6', max: '5', count: 865, url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g189122-d1474683-Reviews-O_Barradas-Silves_Faro_District_Algarve.html' },
  { src: 'Facebook', score: '4,6', max: '5', count: 253, url: 'https://restaurantguru.com/O-Barradas-Silves' },
  { src: "Fodor's", score: 'Choice', award: true, url: 'https://www.fodors.com/world/europe/portugal/the-algarve/places/silves/restaurants' }
];
window.REVIEWS = [
  { name: 'Paul C.', src: 'Google', date: { pt: 'ago 2026', en: 'Aug 2026' },
    en: 'A truely magical place. The atmosphere and ambience is warm, inviting and relaxed.',
    pt: 'Um sítio verdadeiramente mágico. O ambiente é acolhedor, convidativo e descontraído.' },
  { name: 'Salvador F.', src: 'Google', date: { pt: 'jul 2026', en: 'Jul 2026' },
    en: 'Amazing restaurant in a vineyard! 10/10! If you love good food and great wine, you must come here!',
    pt: 'Restaurante incrível no meio de uma vinha! 10/10! Se gosta de boa comida e bom vinho, tem de vir cá!' },
  { name: 'Alana S.', src: 'Google', date: { pt: 'ago 2026', en: 'Aug 2026' },
    en: 'A really amazing experience. Food is delicious, staff are all so friendly and helpful when ordering in a gorgeous setting.',
    pt: 'Uma experiência mesmo incrível. A comida é deliciosa e todo o pessoal é simpático e prestável, num cenário lindíssimo.' },
  { name: 'Mark Morin', src: 'Google', date: { pt: '2026', en: '2026' },
    en: 'A beautiful setting, excellent local cuisine, and a memorable place to celebrate a special occasion near Silves.',
    pt: 'Um cenário lindo, excelente cozinha local e um sítio memorável para celebrar uma ocasião especial perto de Silves.' },
  { name: 'Jay W.', src: 'Google', date: { pt: 'out 2026', en: 'Oct 2026' },
    en: 'Amazing and would eat there every night if we could.',
    pt: 'Incrível. Jantávamos lá todas as noites, se pudéssemos.' },
  { name: 'Serge C.', src: 'Google', date: { pt: 'ago 2026', en: 'Aug 2026' },
    en: 'Wonderful restaurant with a great menu and tastefull suggestions.',
    pt: 'Restaurante maravilhoso, com uma ótima carta e sugestões cheias de bom gosto.' }
];
window.PRESS_QUOTE = {
  src: 'MyGuide Algarve', url: 'https://www.myguidealgarve.com/pt/restaurantes/o-barradas-restaurante',
  pt: 'Uma joia escondida no campo do Algarve, a caminho da cidade histórica de Silves.',
  en: 'A hidden gem in the Algarve countryside, on the way to the historic town of Silves.'
};
/* Destaques da casa para a homepage */
window.SIGNATURES = [
  { pt: 'Posta de vitela Mirandesa', en: 'Mirandesa veal steak', dpt: 'molho de vinho do Porto com tomilho', den: 'Port wine and thyme sauce', p: '33,50 €', tag: 'DOP' },
  { pt: 'Guisado de borrego', en: 'Lamb stew', dpt: 'a especialidade da casa', den: 'the house speciality', p: '21,00 €' },
  { pt: 'Lombinhos de borrego', en: 'Lamb tenderloins', dpt: 'maçã salteada, vinho do Porto e menta com morangos', den: 'sautéed apple, Port and mint with strawberries', p: '29,50 €' },
  { pt: 'Cataplana de peixe', en: 'Fish cataplana', dpt: 'peixe selvagem do Atlântico · para 2', den: 'wild Atlantic fish · for 2', p: '58,00 €' },
  { pt: 'Lagosta de Sagres', en: 'Sagres lobster', dpt: 'por encomenda · para 2 ou mais', den: 'pre-order · for 2 or more', p: { pt: 'preço do dia', en: 'market price' } },
  { pt: 'Tarte de queijo de cabra', en: 'Goat\'s cheese tart', dpt: 'figos em Moscatel, tomate cherry e uvas', den: 'Moscatel figs, cherry tomatoes and grapes', p: '11,00 €' }
];
