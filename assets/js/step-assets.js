/* 锅里投放的素材对照表：按"菜 + 具体那一步"精确指向素材 id，不再靠 emoji 猜。
   _opt : 选项/答案 id → 素材 id（用于"下锅顺序""调味用量"这两类步骤）
   _dish: 每道菜里 emoji → 素材 id（用于火候、计时、出锅等步骤）
   值为 'x' 表示这一步不投放实物（锅铲、蒸汽、米饭之类）。
*/
window.STEP_ASSETS = {
  _opt: {
    rou: 'roumo', doufu: 'nendoufu', suanmiao: 'suanmiao', douban: 'pixiandouban',
    cu: 'xiangcu', xiao: 'dianfen', da: 'dianfen', wan: 'dianfen', shui: 'qingshui',
    you: 'hongyou', wanzhi: 'dianfen', lajiao: 'ganlajiao', ji: 'jirou',
    huasheng: 'huashengmi', cong: 'dacong', tianmianjiang: 'tianmianjiang',
    baitang: 'baitang', none: 'x', much: 'x', bowl: 'x', jiang: 'dianfen',
    shangjiang: 'dianfen', gaotang: 'gaotang', mian: 'lajiaomian', shucai: 'muer',
    paojiao: 'paojiao', yacai: 'yacai', lin: 'hongyou', hongyou: 'hongyou',
    hui: 'baitang', tian: 'x', wu: 'x', xiang: 'ganlajiao', shao: 'shengchou', duo: 'x'
  },
  mapo: {
    '🫗': 'shiyongyou', '⚪': 'roumo', '🥫': 'pixiandouban', '🌶️': 'lajiaomian',
    '💧': 'qingshui', '⬜': 'nendoufu', '🥛': 'dianfen', '🫘': 'huajiaofen',
    '🌿': 'suanmiao', '🥄': 'x'
  },
  gongbao: {
    '🫗': 'shiyongyou', '🌶️': 'ganlajiao', '🫘': 'huajiao', '🍗': 'jirou',
    '🌱': 'dacong', '🥣': 'dianfen', '🥜': 'huashengmi', '🥄': 'x', '💨': 'x'
  },
  huiguo: {
    '🫗': 'shiyongyou', '🥓': 'houtuirou', '🥫': 'pixiandouban', '🌿': 'suanmiao',
    '🍶': 'shengchou', '🥄': 'x', '💨': 'x', '🍚': 'x'
  },
  yuxiang: {
    '🫗': 'shiyongyou', '🥩': 'zhuliji', '🌶️': 'paojiao', '🍄': 'muer',
    '🎋': 'dongsun', '🌱': 'xiaocong', '🥄': 'x', '💨': 'x'
  },
  shuizhu: {
    '🫗': 'shiyongyou', '🥫': 'pixiandouban', '🍲': 'gaotang', '🥬': 'wosun',
    '🥩': 'niuliji', '🌶️': 'lajiaomian', '🧄': 'dasuan', '🌱': 'xiaocong',
    '🫘': 'huajiaofen'
  },
  dandan: {
    '🫗': 'shiyongyou', '⚪': 'roumo', '🥬': 'yacai', '🥣': 'zhimajiang',
    '💧': 'qingshui', '🍜': 'miantiao', '🥜': 'huashengmi', '🌱': 'xiaocong',
    '🥢': 'x', '💨': 'x'
  },
  feipian: {
    '🍲': 'gaotang', '🥩': 'niurou', '🫙': 'hongyou', '🍬': 'baitang',
    '🥬': 'qincai', '🫗': 'hongyou', '🥜': 'huashengmi', '⚪': 'zhima',
    '🥢': 'x', '🥄': 'x'
  },
  ganbian: {
    '🫗': 'shiyongyou', '🫛': 'sijidou', '🌶️': 'ganlajiao', '🫘': 'huajiao',
    '🧄': 'dasuan', '🥬': 'yacai', '🍶': 'shengchou', '🥄': 'x', '💨': 'x', '🍽️': 'x'
  }
};
