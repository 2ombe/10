import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutCooporateSteps from '../component/CheckOutCooporateSteps';

const premiumData = {
  "75,000,000": {
    M: 183674.3304,
    "M+1": 275511.4956,
    "M+2": 353573.08602,
    "M+3": 427808.12789,
    "M+4": 489798.2144,
    "M+5": 551788.30091,
    "M+6": 613778.38742,
    "M+7": 1289547,
    "M+8": 1965315,
    "M+9": 2641084,
    "M+10": 3316852,
    Extra: 675768,
  },
  "67,500,000": {
    M: 176786.54301,
    "M+1": 269389.01792,
    "M+2": 346838.360572,
    "M+3": 420308.09273199993,
    "M+4": 482145.1173,
    "M+5": 543982.1418679999,
    "M+6": 605819.166436,
    "M+7": 605819.166436+61837.024568,
    "M+8": 605819.166436+61837.024568+61837.024568,
    "M+9": 605819.166436+61837.024568+61837.024568+61837.024568,
    "M+10":605819.166436+61837.024568+61837.024568+61837.024568+61837.024568,
    Extra: 61837.024568,
  },
  "63,750,000": {
    M: 176786.54301,
    "M+1": 266327.77908,
    "M+2": 343470.99784799997,
    "M+3": 416558.0751529999,
    "M+4": 478318.56875,
    "M+5": 540079.062347,
    "M+6": 601839.5559439999,
    "M+7": 601839.5559439999+61760.493597,
    "M+8": 601839.5559439999+61760.493597+61760.493597,
    "M+9": 601839.5559439999+61760.493597+61760.493597+61760.493597,
    "M+10": 601839.5559439999+61760.493597+61760.493597+61760.493597+61760.493597,
    Extra: 61760.493597,
  },
  "60,000,000": {
    M: 174490.61388,
    "M+1": 263266.54023999994,
    "M+2": 340103.63512399996,
    "M+3": 412808.057574,
    "M+4": 474492.02019999997,
    "M+5": 536175.982826,
    "M+6": 597859.9454519999,
    "M+7": 597859.9454519999+61683.962626,
    "M+8": 597859.9454519999+61683.962626+61683.962626,
    "M+9": 597859.9454519999+61683.962626+61683.962626+61683.962626,
    "M+10": 597859.9454519999+61683.962626+61683.962626+61683.962626+61683.962626,
    Extra: 61683.962626,
  },
  "56,250,000": {
    M: 172194.68475,
    "M+1": 260205.30139999997,
    "M+2": 336736.27239999996,
    "M+3": 409058.039995,
    "M+4": 470665.47164999996,
    "M+5": 532272.9033049999,
    "M+6": 593880.33496,
    "M+7": 593880.33496+61607.431655,
    "M+8": 593880.33496+61607.431655+61607.431655,
    "M+9": 593880.33496+61607.431655+61607.431655+61607.431655,
    "M+10": 593880.33496+61607.431655+61607.431655+61607.431655+61607.431655,
    Extra: 61607.431655,
  },
  "52,500,000": {
    M: 169898.75562,
    "M+1": 257144.06255999996,
    "M+2": 333368.90967599995,
    "M+3": 405308.02241599996,
    "M+4": 466838.92309999996,
    "M+5": 528369.823784,
    "M+6": 589900.724468,
    "M+7": 589900.724468+61530.900684,
    "M+8": 589900.724468+61530.900684+61530.900684,
    "M+9": 589900.724468+61530.900684+61530.900684+61530.900684,
    "M+10": 589900.724468+61530.900684+61530.900684+61530.900684+61530.900684,
    Extra: 61530.900684,
  },
  "48,750,000": {
    M: 167602.82649,
    "M+1": 254082.82372,
    "M+2": 330001.54695199995,
    "M+3": 401558.0048369999,
    "M+4": 463012.37454999995,
    "M+5": 524466.744263,
    "M+6": 585921.1139759999,
    "M+7": 585921.1139759999+61454.369713,
    "M+8": 585921.1139759999+61454.369713+61454.369713,
    "M+9": 585921.1139759999+61454.369713+61454.369713+61454.369713,
    "M+10": 585921.1139759999+61454.369713+61454.369713+61454.369713+61454.369713,
    Extra: 61454.369713,
  },
  "45,000,000": {
    M: 165306.89736,
    "M+1": 251021.58487999998,
    "M+2": 326634.184228,
    "M+3": 397807.98725799995,
    "M+4": 459185.82599999994,
    "M+5": 520563.664742,
    "M+6": 581941.503484,
    "M+7": 581941.503484+643319.342226,
    "M+8": 581941.503484+643319.342226+643319.342226,
    "M+9": 581941.503484+643319.342226+643319.342226+643319.342226,
    "M+10": 581941.503484+643319.342226+643319.342226+643319.342226+643319.342226,
    Extra: 643319.342226,
  },
  "41,250,000": {
    M: 163010.96823,
    "M+1": 247960.34603999997,
    "M+2": 323266.821504,
    "M+3": 394057.96967900003,
    "M+4": 455359.27744999994,
    "M+5": 516660.585221,
    "M+6": 577961.892992,
    "M+7": 577961.892992+61301.307771,
    "M+8": 577961.892992+61301.307771+61301.307771,
    "M+9": 577961.892992+61301.307771+61301.307771+61301.307771,
    "M+10": 577961.892992+61301.307771+61301.307771+61301.307771+61301.307771,
    Extra: 61301.307771,
  },
  "37,500,000": {
    M: 160715.0391,
    "M+1": 244899.1072,
    "M+2": 319899.4587799999,
    "M+3": 390307.9521,
    "M+4": 451532.72889999993,
    "M+5": 512757.5056999999,
    "M+6": 573982.2825,
    "M+7": 573982.2825+61224.7768,
    "M+8": 573982.2825+61224.7768+61224.7768,
    "M+9":573982.2825+61224.7768+61224.7768+61224.7768,
    "M+10": 573982.2825+61224.7768+61224.7768+61224.7768+61224.7768,
    Extra: 61224.7768,
  },
  "33,750,000": {
    M: 159436.9718843,
    "M+1": 240567.45424139994,
    "M+2": 316975.9756878,
    "M+3": 386619.15929779987,
    "M+4": 447706.1803499999,
    "M+5": 508800.8544992999,
    "M+6": 569895.5286486,
    "M+7": 569895.5286486+61094.6741493,
    "M+8": 569895.5286486+61094.6741493+61094.6741493,
    "M+9": 569895.5286486+61094.6741493+61094.6741493+61094.6741493,
    "M+10": 569895.5286486+61094.6741493+61094.6741493+61094.6741493+61094.6741493,
    Extra: 61094.6741493,
  },
  "30,000,000": {
    M: 158158.9046686,
    "M+1": 238401.6277621,
    "M+2": 314037.18640139996,
    "M+3": 382915.06030139996,
    "M+4": 443879.6318,
    "M+5": 504844.2032986,
    "M+6": 565808.7747972,
    "M+7": 565808.7747972+60964.5714986,
    "M+8": 565808.7747972+60964.5714986+60964.5714986,
    "M+9": 565808.7747972+60964.5714986+60964.5714986+60964.5714986,
    "M+10": 565808.7747972+60964.5714986+60964.5714986+60964.5714986+60964.5714986,
    Extra: 60964.5714986,
  },
  "26,250,000": {
    M: 156888.49055,
    "M+1": 236228.14818569997,
    "M+2": 311106.0502121,
    "M+3": 379218.6144021,
    "M+4": 440053.08324999997,
    "M+5": 500895.205195,
    "M+6": 561737.32714,
    "M+7": 561737.32714+60842.121945,
    "M+8": 561737.32714+60842.121945+60842.121945,
    "M+9": 561737.32714+60842.121945+60842.121945+60842.121945,
    "M+10": 561737.32714+60842.121945+60842.121945+60842.121945+60842.121945,
    Extra: 60842.121945,
  },
  "22,500,000": {
    M: 155610.4233343,
    "M+1": 234062.32170639996,
    "M+2": 308167.26092569996,
    "M+3": 375514.51540569996,
    "M+4": 436226.53469999996,
    "M+5": 496938.55399429996,
    "M+6": 557650.5732886,
    "M+7": 557650.5732886+60712.0192943,
    "M+8": 557650.5732886+60712.0192943+60712.0192943,
    "M+9":557650.5732886+60712.0192943+60712.0192943+60712.0192943,
    "M+10": 557650.5732886+60712.0192943+60712.0192943+60712.0192943+60712.0192943,
    Extra: 60712.0192943,
  },
  "18,750,000": {
    M: 154340.0092157,
    "M+1": 231888.84212999998,
    "M+2": 305236.1247364,
    "M+3": 371818.0695064,
    "M+4": 432399.98614999995,
    "M+5": 492989.55589069996,
    "M+6": 553579.1256314,
    "M+7": 553579.1256314+60589.5697407,
    "M+8": 553579.1256314+60589.5697407+60589.5697407,
    "M+9": 553579.1256314+60589.5697407+60589.5697407+60589.5697407,
    "M+10": 553579.1256314+60589.5697407+60589.5697407+60589.5697407+60589.5697407,
    Extra: 60589.5697407,
  },
  "15,000,000": {
    M: 153061.942,
    "M+1": 231888.84213,
    "M+2": 302297.33545,
    "M+3": 368113.97051,
    "M+4": 428573.4376,
    "M+5": 489032.90469,
    "M+6": 549492.37178,
    "M+7": 549492.37178+60459.46709,
    "M+8": 549492.37178+60459.46709+60459.46709,
    "M+9": 549492.37178+60459.46709+60459.46709+60459.46709,
    "M+10": 549492.37178+60459.46709+60459.46709+60459.46709+60459.46709,
    Extra: 60459.46709,
  },
  "12,750,000": {
    M: 146939.46432,
    "M+1": 218113.26735,
    "M+2": 283164.5927,
    "M+3": 343624.05979,
    "M+4": 391838.57152,
    "M+5": 440053.08325,
    "M+6": 488267.59498,
    "M+7": 488267.59498+48214.51173,
    "M+8": 488267.59498+48214.51173+48214.51173,
    "M+9": 488267.59498+48214.51173+48214.51173+48214.51173,
    "M+10": 488267.59498+48214.51173+48214.51173+48214.51173+48214.51173,
    Extra: 48214.51173,
  },
  "11,250,000": {
    M: 141582.29635,
    "M+1": 202807.07315,
    "M+2": 260970.61111,
    "M+3": 313776.9811,
    "M+4": 355869.01515,
    "M+5": 397961.0492,
    "M+6": 440053.08325,
    "M+7": 440053.08325+42092.03405,
    "M+8": 440053.08325+42092.03405+42092.03405,
    "M+9":  440053.08325+42092.03405+42092.03405+42092.03405,
    "M+10": 440053.08325+42092.03405+42092.03405+42092.03405+42092.03405,
    Extra: 42092.03405,
  },
  "9,000,000": {
    M: 136225.12838,
    "M+1": 195919.28576,
    "M+2": 247195.03633,
    "M+3": 294644.23835,
    "M+4": 335205.65298,
    "M+5": 375767.06761,
    "M+6": 416328.48224,
    "M+7": 416328.48224+40561.41463,
    "M+8": 416328.48224+40561.41463+40561.41463,
    "M+9": 416328.48224+40561.41463+40561.41463+40561.41463,
    "M+10": 416328.48224+40561.41463+40561.41463+40561.41463+40561.41463,
    Extra: 40561.41463,
  },
  "7,500,000": {
    M: 130102.6507,
    "M+1": 182143.71098,
    "M+2": 229592.913,
    "M+3": 273980.87618,
    "M+4": 313776.9811,
    "M+5": 353573.08602,
    "M+6": 393369.19094,
    "M+7": 393369.19094+39796.10492,
    "M+8": 393369.19094+39796.10492+39796.10492,
    "M+9": 393369.19094+39796.10492+39796.10492+39796.10492,
    "M+10": 393369.19094+39796.10492+39796.10492+39796.10492+39796.10492,
    Extra: 39796.10492,
  },
  "7,125,000": {
    M: 128839.8896785,
    "M+1": 180498.2951035,
    "M+2": 227564.8422685,
    "M+3": 271838.008992,
    "M+4": 311481.05197,
    "M+5": 351162.3604335,
    "M+6": 390843.668897,
    "M+7": 390843.668897+39681.3084635,
    "M+8": 390843.668897+39681.3084635+39681.3084635,
    "M+9": 390843.668897+39681.3084635+39681.3084635+39681.3084635,
    "M+10": 390843.668897+39681.3084635+39681.3084635+39681.3084635+39681.3084635,
    Extra: 39681.3084635,
  },
  "6,750,000": {
    M: 127561.8224628,
    "M+1": 178837.5730328,
    "M+2": 225521.4653428,
    "M+3": 269664.5294156,
    "M+4": 309185.12284,
    "M+5": 348736.3286528,
    "M+6": 388287.5344656,
    "M+7": 388287.5344656+39551.2058128,
    "M+8": 388287.5344656+39551.2058128+39551.2058128,
    "M+9": 388287.5344656+39551.2058128+39551.2058128+39551.2058128,
    "M+10": 388287.5344656+39551.2058128+39551.2058128+39551.2058128+39551.2058128,
    Extra: 39551.2058128,
  },
  "6,375,000": {
    M: 126283.7552471,
    "M+1": 177176.8509621,
    "M+2": 223478.0884171,
    "M+3": 267491.0498392,
    "M+4": 306889.19371,
    "M+5": 346310.2968721,
    "M+6": 385731.4000342,
    "M+7": 385731.4000342+39421.1031621,
    "M+8": 385731.4000342+39421.1031621+39421.1031621,
    "M+9": 385731.4000342+39421.1031621+39421.1031621+39421.1031621,
    "M+10": 385731.4000342+39421.1031621+39421.1031621+39421.1031621+39421.1031621,
    Extra: 39421.1031621
  },
  "6,000,000": {
    M: 125005.6880314,
    "M+1": 175516.1288914,
    "M+2": 221434.7114914,
    "M+3": 265317.5702628,
    "M+4": 304593.26458,
    "M+5": 343884.2650914,
    "M+6": 383175.2656028,
    "M+7": 383175.2656028+39291.0005114,
    "M+8": 383175.2656028+39291.0005114+39291.0005114,
    "M+9": 383175.2656028+39291.0005114+39291.0005114+39291.0005114,
    "M+10": 383175.2656028+39291.0005114+39291.0005114+39291.0005114+39291.0005114,
    Extra: 39291.0005114,
  },
  "5,625,000": {
    M: 123727.6208157,
    "M+1": 173855.4068207,
    "M+2": 219391.3345657,
    "M+3": 263144.0906864,
    "M+4": 302297.33545,
    "M+5": 341458.2333107,
    "M+6": 380619.1311714,
    "M+7": 380619.1311714+39160.8978607,
    "M+8": 380619.1311714+39160.8978607+39160.8978607,
    "M+9": 380619.1311714+39160.8978607+39160.8978607+39160.8978607,
    "M+10": 380619.1311714+39160.8978607+39160.8978607+39160.8978607+39160.8978607,
    Extra: 39160.8978607,
  },
  "5,250,000": {
    M: 122449.5536,
    "M+1": 172194.68475,
    "M+2": 217347.95764,
    "M+3": 260970.61111,
    "M+4": 300001.40632,
    "M+5": 339032.20153,
    "M+6": 378062.99674,
    "M+7": 378062.99674+39030.79521,
    "M+8": 378062.99674+39030.79521+39030.79521,
    "M+9": 378062.99674+39030.79521+39030.79521+39030.79521,
    "M+10": 378062.99674+39030.79521+39030.79521+39030.79521+39030.79521,
    Extra: 39030.79521,
  },
  "4,875,000": {
    M: 121110.2616075,
    "M+1": 169814.5715519,
    "M+2": 214776.5170144,
    "M+3": 257718.0448425,
    "M+4": 296366.1851975,
    "M+5": 335014.3255525,
    "M+6": 373662.4659075,
    "M+7": 373662.4659075+38648.140355,
    "M+8": 373662.4659075+38648.140355+38648.140355,
    "M+9": 373662.4659075+38648.140355+38648.140355+38648.140355,
    "M+10": 373662.4659075+38648.140355+38648.140355+38648.140355+38648.140355,
    Extra: 38648.140355,
  },
  "4,500,000": {
    M: 119770.969615,
    "M+1": 167419.1521596,
    "M+2": 212189.7701946,
    "M+3": 254465.478575,
    "M+4": 292730.964075,
    "M+5": 330996.449575,
    "M+6": 369261.935075,
    "M+7": 369261.935075+38265.4855,
    "M+8": 369261.935075+38265.4855+38265.4855,
    "M+9": 369261.935075+38265.4855+38265.4855+38265.4855,
    "M+10": 369261.935075+38265.4855+38265.4855+38265.4855+38265.4855,
    Extra: 38265.4855,
  },
  "4,125,000": {
    M: 118431.6776225,
    "M+1": 165023.7327673,
    "M+2": 209603.0233748,
    "M+3": 251212.9123075,
    "M+4": 289095.7429525,
    "M+5": 326978.5735975,
    "M+6": 364861.4042425,
    "M+7": 364861.4042425+37882.830645,
    "M+8": 364861.4042425+37882.830645+37882.830645,
    "M+9": 364861.4042425+37882.830645+37882.830645+37882.830645,
    "M+10": 364861.4042425+37882.830645+37882.830645+37882.830645+37882.830645,
    Extra: 37882.830645,
  },
  "3,750,000": {
    M: 117092.38563,
    "M+1": 162628.313375,
    "M+2": 207016.276555,
    "M+3": 247960.34604,
    "M+4": 285460.52183,
    "M+5": 322960.69762,
    "M+6": 360460.87341,
    "M+7": 360460.87341+37500.17579,
    "M+8": 360460.87341+37500.17579+37500.17579,
    "M+9": 360460.87341+37500.17579+37500.17579+37500.17579,
    "M+10": 360460.87341+37500.17579+37500.17579+37500.17579+37500.17579,
    Extra: 37500.17579,
  },
  "3,375,000": {
    M: 114796.4565,
    "M+1": 158610.4373975,
    "M+2": 200702.4714475,
    "M+3": 239924.594085,
    "M+4": 275511.4956,
    "M+5": 311098.397115,
    "M+6": 346685.29863,
    "M+7": 346685.29863+35586.901515,
    "M+8": 346685.29863+35586.901515+35586.901515,
    "M+9": 346685.29863+35586.901515+35586.901515+35586.901515,
    "M+10": 346685.29863+35586.901515+35586.901515+35586.901515+35586.901515,
    Extra: 35586.901515,
  },
  "3,000,000": {
    M: 112500.52737,
    "M+1": 154592.56142,
    "M+2": 194388.66634,
    "M+3": 231888.84213,
    "M+4": 265562.46937,
    "M+5": 299236.09661,
    "M+6": 332909.72385,
    "M+7": 332909.72385+33673.62724,
    "M+8": 332909.72385+33673.62724+33673.62724,
    "M+9": 332909.72385+33673.62724+33673.62724+33673.62724,
    "M+10": 332909.72385+33673.62724+33673.62724+33673.62724+33673.62724,
    Extra: 33673.62724,
  },
  "2,625,000": {
    M: 109821.943385,
    "M+1": 150766.01287,
    "M+2": 185970.25953,
    "M+3": 219643.88677,
    "M+4": 249873.620315,
    "M+5": 282016.628135,
    "M+6": 314159.635955,
    "M+7": 314159.635955+32143.00782,
    "M+8": 314159.635955+32143.00782+32143.00782,
    "M+9": 314159.635955+32143.00782+32143.00782+32143.00782,
    "M+10": 314159.635955+32143.00782+32143.00782+32143.00782+32143.00782,
    Extra: 32143.00782,
  },
  "2,250,000": {
    M: 107143.3594,
    "M+1": 146939.46432,
    "M+2": 177551.85272,
    "M+3": 207398.93141,
    "M+4": 234184.77126,
    "M+5": 264797.15966,
    "M+6": 295409.54806,
    "M+7": 295409.54806+30612.3884,
    "M+8": 295409.54806+30612.3884+30612.3884,
    "M+9": 295409.54806+30612.3884+30612.3884+30612.3884,
    "M+10": 2506219,
    Extra: 30612.3884,
  },
  "1,875,000": {
    M: 105230.085125,
    "M+1": 142347.60606,
    "M+2": 174107.959025,
    "M+3": 205103.00228,
    "M+4": 231506.187275,
    "M+5": 259822.646545,
    "M+6": 288139.105815,
    "M+7": 288139.105815+28316.45927,
    "M+8": 288139.105815+28316.45927+28316.45927,
    "M+9": 288139.105815+28316.45927+28316.45927+28316.45927,
    "M+10": 288139.105815+28316.45927+28316.45927+28316.45927+28316.45927,
    Extra: 28316.45927,
  },
  "1,500,000": {
    M: 103316.81085,
    "M+1": 137755.7478,
    "M+2": 170664.06533,
    "M+3": 202807.07315,
    "M+4": 228827.60329,
    "M+5": 254848.13343,
    "M+6": 280868.66357,
    "M+7": 280868.66357+26020.53014,
    "M+8": 280868.66357+26020.53014+26020.53014,
    "M+9": 280868.66357+26020.53014+26020.53014+26020.53014,
    "M+10": 280868.66357+26020.53014+26020.53014+26020.53014+26020.53014,
    Extra: 26020.53014,
  },
  "750,000": {
    M: 99490.2623,
    "M+1": 132398.57983,
    "M+2": 163776.27794,
    "M+3": 193623.35663,
    "M+4": 218878.57706,
    "M+5": 244133.79749,
    "M+6": 269389.01792,
    "M+7": 269389.01792+25255.22043,
    "M+8": 269389.01792+25255.22043+25255.22043,
    "M+9": 269389.01792+25255.22043+25255.22043+25255.22043,
    "M+10": 269389.01792+25255.22043+25255.22043+25255.22043+25255.22043,
    Extra: 25255.22043,
  },
};


const CooporateInpatient = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const savedData = JSON.parse(localStorage.getItem('cooporateCart'));
  const [categories, setCategories] = useState(savedData?.categories ||[
    { id: 1, limit: '', members: 0, dependencies: {}, totalDependencies: {}, totalPremium: 0, totalPremiumM: 0, operationalArea: "" }
  ]);
console.log(categories);



  const handleAddCategory = () => {
    const newCategory = {
      id: categories.length + 1, limit: '', members: 0, dependencies: {},
      totalDependencies: {}, totalPremiumValues: {}, premiumValues: {}, totalPremium: 0, totalPremiumM: 0, operationalArea: ""
    };
    setCategories([...categories, newCategory]);
  };

  const handleOperationalAreaChange = (id, e) => {
    const newCategories = categories.map(category =>
      category.id === id ? { ...category, operationalArea: e.target.value } : category
    );
    setCategories(newCategories);
  };

  const handleLimitChange = (id, e) => {
    const newCategories = categories.map(category =>
      category.id === id ? { ...category, limit: e.target.value } : category
    );
    setCategories(newCategories);
  };

  const handleAddMember = (id) => {
    const newCategories = categories.map(category =>
      category.id === id ? { ...category, members: category.members + 1 } : category
    );
    setCategories(newCategories);
  };

  const handleRemoveMember = (id) => {
    const newCategories = categories.map(category =>
      category.id === id && category.members > 0 ? {
        ...category,
        members: category.members - 1,
        dependencies: { ...category.dependencies, [`M+${category.members}`]: undefined }
      } : category
    );
    setCategories(newCategories);
  };

  const handleDependencyChange = (id, label, e) => {
    const value = parseInt(e.target.value) || 0;
    const newCategories = categories.map(category =>
      category.id === id ? { ...category, dependencies: { ...category.dependencies, [label]: value } } : category
    );
    setCategories(newCategories);
  };

  const calculateOverallDependenciesTotal = (category) => {
    let overallTotal = 0;
    const labels = Object.keys(category.totalDependencies);

    for (let i = 0; i < labels.length; i++) {
      overallTotal += category.totalDependencies[labels[i]] || 0;
    }

    return overallTotal;
  };

  const calculateTotalPremiumValue = (category) => {
    let totalPremiumValue = 0;
    const memberLabels = Array.from({ length: category.members + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`));
    for (let i = 0; i < memberLabels.length; i++) {
      const label = memberLabels[i];
      const premiumValuePerMember = (premiumData[category.limit]?.[label] || 0) * (category.dependencies[label] || 0);
      totalPremiumValue += premiumValuePerMember;
    }
    return totalPremiumValue;
  };

  const calculateOverallTotals = () => {
    let overallTotalPremium = 0;
    let overallDependenciesTotal = 0;
    let totalStaffFamily = 0;

    categories.forEach(category => {
      overallTotalPremium += calculateTotalPremiumValue(category);
      overallDependenciesTotal += calculateOverallDependenciesTotal(category);
      const totalMembers = Object.values(category.dependencies).reduce((sum, value) => sum + value, 0);
      totalStaffFamily += totalMembers;
    });

    return { overallTotalPremium, overallDependenciesTotal, totalStaffFamily };
  };

  useEffect(() => {
    const updatedCategories = categories.map(category => {
      let updatedTotalDependencies = { ...category.totalDependencies };
      const labels = Object.keys(category.dependencies);

      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        const value = category.dependencies[label] || 0;
        let calculatedTotal = value;

        if (label !== 'M') {
          const numDependents = parseInt(label.slice(2));
          calculatedTotal += numDependents * value;
        }

        updatedTotalDependencies[label] = calculatedTotal;
      }

      let totalPremiumValue = calculateTotalPremiumValue(category);
      let totalPremiumMValue = totalPremiumValue;

      const premiumValues = Object.keys(category.dependencies).reduce((acc, key) => {
        acc[key] = premiumData[category.limit]?.[key] || 0;
        return acc;
      }, {});

      const totalPremiumValues = Object.keys(category.dependencies).reduce((acc, key) => {
        acc[key] = (premiumData[category.limit]?.[key] || 0) * (category.dependencies[key] || 0);
        return acc;
      }, {});

      return {
        ...category,
        totalDependencies: updatedTotalDependencies,
        totalPremium: totalPremiumValue,
        totalPremiumM: totalPremiumMValue,
        premiumValues,
        totalPremiumValues,
      };
    });
    setCategories(updatedCategories);
  }, [JSON.stringify(categories.map(category => category.dependencies))]);

  const handleSave = () => {
    const overallTotals = calculateOverallTotals();
    const cooporateCart = { categories, overallTotals };
    dispatch({ type: 'SET_COOPORATE_CART', payload: cooporateCart });
    localStorage.setItem('cooporateCart', JSON.stringify(cooporateCart));
    console.log(cooporateCart);
    navigate('/outcooporate');
  };

  const renderCategoryTables = () => {
    return categories.map(category => (
      <div key={category.id}>
        <Row className="my-4">
          <Col>
            <h5>Category {category.id}</h5>
            <Form>
              <Form.Group controlId={`limitSelect-${category.id}`}>
                <Form.Label>Select Inpatient Limit</Form.Label>
                <Form.Control as="select" value={category.limit} onChange={(e) => handleLimitChange(category.id, e)}>
                  <option value="">Select...</option>
                  {Object.keys(premiumData).map((limitValue) => (
                    <option key={limitValue} value={limitValue}>
                      {limitValue}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId={`operationalAreaSelect-${category.id}`} className="mt-3">
                <Form.Label>Select Operational Area</Form.Label>
                <Form.Control as="select" value={category.operationalArea} onChange={(e) => handleOperationalAreaChange(category.id, e)}>
                  <option value="">Select...</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="East Africa">East Africa</option>
                  <option value="India">India</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Button style={{ marginRight: "1.2rem", background: "green" }} onClick={() => handleAddMember(category.id)}>
              Add Member
            </Button>
            <Button variant="danger" onClick={() => handleRemoveMember(category.id)}>
              Remove Member
            </Button>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Premium/family</th>
                  <th>Number of staff/family</th>
                  <th>Total lives</th>
                  <th>Total Premium</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: category.members + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{premiumData[category.limit]?.[label]}</td>
                    <td>
                      <Form.Control type="number" value={category.dependencies[label] || ''} onChange={(e) => handleDependencyChange(category.id, label, e)} />
                    </td>
                    <td>{category.totalDependencies[label]}</td>
                    <td>{(premiumData[category.limit]?.[label] || 0) * (category.dependencies[label] || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <h4>Total Premium: {calculateTotalPremiumValue(category)}</h4>
            <h4>Total Beneficiaries: {calculateOverallDependenciesTotal(category)}</h4>
          </Col>
        </Row>
      </div>
    ));
  };

  const overallTotals = calculateOverallTotals();

  return (
    <div>
      <CheckOutCooporateSteps step1 step2 />
      <Container>
        {renderCategoryTables()}
        <Row className="my-4">
          <Col>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Button onClick={handleSave}>Save And Continue</Button>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <h3>Overall Total Premium: {overallTotals.overallTotalPremium}</h3>
            <h3>Overall Dependencies Total: {overallTotals.overallDependenciesTotal}</h3>
            <h3>Total Number of Staff/Family: {overallTotals.totalStaffFamily}</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CooporateInpatient;