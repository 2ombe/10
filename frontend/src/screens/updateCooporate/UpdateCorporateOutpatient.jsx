import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import CheckOutCooporateSteps from '../../component/CheckOutCooporateSteps';


const PremiumValuePerPerson = {
  3750000: {
    M: 423503.586,
    "M+1": 423503.586 * 2,
    "M+2": 423503.586 * 3,
    "M+3": 423503.586 * 4,
    "M+4": 423503.586 * 5,
    "M+5": 423503.586 * 6,
    "M+6": 423503.586 * 7,
    "M+7": 423503.586 * 8,
    "M+8": 423503.586 * 9,
    "M+9": 423503.586 * 10,
    "M+10": 423503.586 * 11,
  },
  3000000: {
    M: 340991.37952,
    "M+1": 340991.37952 * 2,
    "M+2": 340991.37952 * 3,
    "M+3": 340991.37952 * 4,
    "M+4": 340991.37952 * 5,
    "M+5": 340991.37952 * 6,
    "M+6": 340991.37952 * 7,
    "M+7": 340991.37952 * 8,
    "M+8": 340991.37952 * 9,
    "M+9": 340991.37952 * 10,
    "M+10": 340991.37952 * 11,
  },
  2625000: {
    M: 330789.97578,
    "M+1": 330789.97578 * 2,
    "M+2": 330789.97578 * 3,
    "M+3": 330789.97578 * 4,
    "M+4": 330789.97578 * 5,
    "M+5": 330789.97578 * 6,
    "M+6": 330789.97578 * 7,
    "M+7": 330789.97578 * 8,
    "M+8": 330789.97578 * 9,
    "M+9": 330789.97578 * 10,
    "M+10": 330789.97578 * 11,
  },
  2400000: {
    M: 324669.133536,
    "M+1": 324669.133536 * 2,
    "M+2": 324669.133536 * 3,
    "M+3": 324669.133536 * 4,
    "M+4": 324669.133536 * 5,
    "M+5": 324669.133536 * 6,
    "M+6": 324669.133536 * 7,
    "M+7": 324669.133536 * 8,
    "M+8": 324669.133536 * 9,
    "M+9": 324669.133536 * 10,
    "M+10": 324669.133536 * 11,
  },
  2250000: {
    M: 320588.57204,
    "M+1": 320588.57204 * 2,
    "M+2": 320588.57204 * 3,
    "M+3": 320588.57204 * 4,
    "M+4": 320588.57204 * 5,
    "M+5": 320588.57204 * 6,
    "M+6": 320588.57204 * 7,
    "M+7": 320588.57204 * 8,
    "M+8": 320588.57204 * 9,
    "M+9": 320588.57204 * 10,
    "M+10": 320588.57204 * 11,
  },
  2100000: {
    M: 311104.53,
    "M+1": 311104.53 * 2,
    "M+2": 311104.53 * 3,
    "M+3": 311104.53 * 4,
    "M+4": 311104.53 * 5,
    "M+5": 311104.53 * 6,
    "M+6": 311104.53 * 7,
    "M+7": 311104.53 * 8,
    "M+8": 311104.53 * 9,
    "M+9": 311104.53 * 10,
    "M+10": 311104.53 * 11,
  },
  1875000: {
    M: 291033.27,
    "M+1": 291033.27 * 2,
    "M+2": 291033.27 * 3,
    "M+3": 291033.27 * 4,
    "M+4": 291033.27 * 5,
    "M+5": 291033.27 * 6,
    "M+6": 291033.27 * 7,
    "M+7": 291033.27 * 8,
    "M+8": 291033.27 * 9,
    "M+9": 291033.27 * 10,
    "M+10": 291033.27 * 11,
  },
  1687500: {
    M: 274229.929837174,
    "M+1": 274229.929837174 * 2,
    "M+2": 274229.929837174 * 3,
    "M+3": 274229.929837174 * 4,
    "M+4": 274229.929837174 * 5,
    "M+5": 274229.929837174 * 6,
    "M+6": 274229.929837174 * 7,
    "M+7": 274229.929837174 * 8,
    "M+8": 274229.929837174 * 9,
    "M+9": 274229.929837174 * 10,
    "M+10": 274229.929837174 * 11,
  },
  1650000: {
    M: 273483.434634007,
    "M+1": 273483.434634007 * 2,
    "M+2": 273483.434634007 * 3,
    "M+3": 273483.434634007 * 4,
    "M+4": 273483.434634007 * 5,
    "M+5": 273483.434634007 * 6,
    "M+6": 273483.434634007 * 7,
    "M+7": 273483.434634007 * 8,
    "M+8": 273483.434634007 * 9,
    "M+9": 273483.434634007 * 10,
    "M+10": 273483.434634007 * 11,
  },
  1500000: {
    M: 270497.453821337,
    "M+1": 270497.453821337 * 2,
    "M+2": 270497.453821337 * 3,
    "M+3": 270497.453821337 * 4,
    "M+4": 270497.453821337 * 5,
    "M+5": 270497.453821337 * 6,
    "M+6": 270497.453821337 * 7,
    "M+7": 270497.453821337 * 8,
    "M+8": 270497.453821337 * 9,
    "M+9": 270497.453821337 * 10,
    "M+10": 270497.453821337 * 11,
  },
  1125000: {
    M: 266947.758,
    "M+1": 266947.758 * 2,
    "M+2": 266947.758 * 3,
    "M+3": 266947.758 * 4,
    "M+4": 266947.758 * 5,
    "M+5": 266947.758 * 6,
    "M+6": 266947.758 * 7,
    "M+7": 266947.758 * 8,
    "M+8": 266947.758 * 9,
    "M+9": 266947.758 * 10,
    "M+10": 266947.758 * 11,
  },
  825000: {
    M: 264940.632,
    "M+1": 264940.632 * 2,
    "M+2": 264940.632 * 3,
    "M+3": 264940.632 * 4,
    "M+4": 264940.632 * 5,
    "M+5": 264940.632 * 6,
    "M+6": 264940.632 * 7,
    "M+7": 264940.632 * 8,
    "M+8": 264940.632 * 9,
    "M+9": 264940.632 * 10,
    "M+10": 264940.632 * 11,
  },
  750000: {
    M: 878661.4130733667,
    "M+1": 878661.4130733667 * 2,
    "M+2": 878661.4130733667 * 3,
    "M+3": 878661.4130733667 * 4,
    "M+4": 878661.4130733667 * 5,
    "M+5": 878661.4130733667 * 6,
    "M+6": 878661.4130733667 * 7,
    "M+7": 878661.4130733667 * 8,
    "M+8": 878661.4130733667 * 9,
    "M+9": 878661.4130733667 * 10,
    "M+10": 878661.4130733667 * 11,
  },
  675000: {
    M: 256912.128,
    "M+1": 256912.128 * 2,
    "M+2": 256912.128 * 3,
    "M+3": 256912.128 * 4,
    "M+4": 256912.128 * 5,
    "M+5": 256912.128 * 6,
    "M+6": 256912.128 * 7,
    "M+7": 256912.128 * 8,
    "M+8": 256912.128 * 9,
    "M+9": 256912.128 * 10,
    "M+10": 256912.128 * 11,
  },
  600000: {
    M: 240855.12,
    "M+1": 240855.12 * 2,
    "M+2": 240855.12 * 3,
    "M+3": 240855.12 * 4,
    "M+4": 240855.12 * 5,
    "M+5": 240855.12 * 6,
    "M+6": 240855.12 * 7,
    "M+7": 240855.12 * 8,
    "M+8": 240855.12 * 9,
    "M+9": 240855.12 * 10,
    "M+10": 240855.12 * 11,
  },
  562500: {
    M: 234164.7,
    "M+1": 234164.7 * 2,
    "M+2": 234164.7 * 3,
    "M+3": 234164.7 * 4,
    "M+4": 234164.7 * 5,
    "M+5": 234164.7 * 6,
    "M+6": 234164.7 * 7,
    "M+7": 234164.7 * 8,
    "M+8": 234164.7 * 9,
    "M+9": 234164.7 * 10,
    "M+10": 234164.7 * 11,
  },
  487500: {
    M: 224798.112,
    "M+1": 224798.112 * 2,
    "M+2": 224798.112 * 3,
    "M+3": 224798.112 * 4,
    "M+4": 224798.112 * 5,
    "M+5": 224798.112 * 6,
    "M+6": 224798.112 * 7,
    "M+7": 224798.112 * 8,
    "M+8": 224798.112 * 9,
    "M+9": 224798.112 * 10,
    "M+10": 224798.112 * 11,
  },
  450000: {
    M: 216769.608,
    "M+1": 216769.608 * 2,
    "M+2": 216769.608 * 3,
    "M+3": 216769.608 * 4,
    "M+4": 216769.608 * 5,
    "M+5": 216769.608 * 6,
    "M+6": 216769.608 * 7,
    "M+7": 216769.608 * 8,
    "M+8": 216769.608 * 9,
    "M+9": 216769.608 * 10,
    "M+10": 216769.608 * 11,
  },
  375000: {
    M: 200712.6,
    "M+1": 200712.6 * 2,
    "M+2": 200712.6 * 3,
    "M+3": 200712.6 * 4,
    "M+4": 200712.6 * 5,
    "M+5": 200712.6 * 6,
    "M+6": 200712.6 * 7,
    "M+7": 200712.6 * 8,
    "M+8": 200712.6 * 9,
    "M+9": 200712.6 * 10,
    "M+10": 200712.6 * 11,
  },
};

const PremiumValuePerFamily = {
  3750000: {
    M: 423503.586,
    "M+1": 793792.3147,
    "M+2": 943438.4256,
    "M+3": 1135055.7713,
    "M+4": 1297001.1043,
    "M+5": 1458946.4373,
    "M+6": 1606024.1703,
    "M+7": 1769567.7703,
    "M+8": (1769567.7703 / 1606024.1703) * 1769567.7703,
    "M+9": (1949765.2349152276/1769567.7703)*1949765.2349152276,
    "M+10": (2148312.449564754/1949765.2349152276)*2148312.449564754,
  },
  3000000: {
    M: 340991.37952,
    "M+1": 635033.85176,
    "M+2": 754750.74048,
    "M+3": 908044.61704,
    "M+4": 1037600.88344,
    "M+5": 1167157.14984,
    "M+6": 1308348.8,
    "M+7": 1439183.68,
    "M+8": (1439183.68/1308348.8)*1439183.68,
    "M+9": (1583102.0479999997/1439183.68)*1583102.0479999997,
    "M+10": (1741412.2527999994/1583102.0479999997)*1741412.2527999994,
  },
  2625000: {
    M: 330789.97578,
    "M+1": 617467.596515,
    "M+2": 733451.41672,
    "M+3": 882312.704185,
    "M+4": 1007930.915035,
    "M+5": 1133549.125885,
    "M+6": 1196841.81196842,
    "M+7": 1311322.32,
    "M+8": (1311322.32/1196841.81196842)*1311322.32,
    "M+9": (1436753.1362411622/1311322.32)*1436753.1362411622,
    "M+10": (1574181.6813571933/1436753.1362411622)*1574181.6813571933,
  },
  2400000: {
    M: 324669.133536,
    "M+1": 606927.843368,
    "M+2": 720671.822464,
    "M+3": 866873.556472,
    "M+4": 990128.933992,
    "M+5": 1113384.311512,
    "M+6": 1194555.9065,
    "M+7": 1294075.904,
    "M+8": (1294075.904/1194555.9065)*1294075.904,
    "M+9": (1401887.0412017987/1294075.904)*1401887.0412017987,
    "M+10": (1518680.0636769554/1401887.0412017987)*1518680.0636769554,
  },
  2250000: {
    M: 320588.57204,
    "M+1": 599901.34127,
    "M+2": 712152.09296,
    "M+3": 856580.79133,
    "M+4": 978260.94663,
    "M+5": 1099941.10193,
    "M+6": 1187159.2755,
    "M+7": 1310826.85723,
    "M+8": (1310826.85723/1187159.2755)*1310826.85723,
    "M+9": (1447377.0159541483/1310826.85723)*1447377.0159541483,
    "M+10": (1598151.7427398574/1447377.0159541483)*1598151.7427398574,
  },
  2100000: {
    M: 311104.53,
    "M+1": 588756.96,
    "M+2": 684318.459,
    "M+3": 811178.097464711,
    "M+4": 926380.186873792,
    "M+5": 1041582.27628287,
    "M+6": 1165619.841165620,
    "M+7": 1257204.256,
    "M+8": (1257204.256/1165619.841165620)*1257204.256,
    "M+9": (1355984.5890440154/1257204.256)*1355984.5890440154,
    "M+10": (1462526.2338635188/1355984.5890440154)*1462526.2338635188,
  },
  1875000: {
    M: 291033.27,
    "M+1": 520522.0696572,
    "M+2": 630293.3175,
    "M+3": 743074.056666779,
    "M+4": 848559.047239479,
    "M+5": 954044.037812179,
    "M+6": 1052095.22838488,
    "M+7": 1141088.3,
    "M+8":(1141088.3/ 1052095.22838488)*1141088.3,
    "M+9": (1237608.985638854/1141088.3)*1237608.985638854,
    "M+10": (1342294.0199579939/1237608.985638854)*1342294.0199579939,
  },
  1687500: {
    M: 274229.929837174,
    "M+1": 517392.48,
    "M+2": 612284.937,
    "M+3": 733912.101341853,
    "M+4": 840573.2181,
    "M+5": 944802.80293137,
    "M+6": 1039321.23009016,
    "M+7": (1110609.72),
    "M+8": (1110609.72/1039321.23009016)*1110609.72,
    "M+9": (1186787.986666526/1110609.72)*1186787.986666526,
    "M+10": (1268191.4266840618/1186787.986666526)*1268191.4266840618,
  },
  1650000: {
    M: 273483.434634007,
    "M+1": 513112.47874026,
    "M+2": 608728.712737654,
    "M+3": 732079.710276868,
    "M+4": 835822.531661649,
    "M+5": 939565.35304643,
    "M+6": 1036766.43043121,
    "M+7": 1106863.0848,
    "M+8": (1106863.0848/1036766.43043121)*1106863.0848,
    "M+9": (1181699.0331982602/1106863.0848)*1181699.0331982602,
    "M+10": (1261594.7032997508/1181699.0331982602)*1261594.7032997508,
  },
  1500000: {
    M: 270497.453821337,
    "M+1": 508172.7514623,
    "M+2": 602674.922342207,
    "M+3": 724750.146016928,
    "M+4": 827331.52127643,
    "M+5": 929912.896535931,
    "M+6": 1026547.23179543,
    "M+7": 1103019.8102,
    "M+8": (1103019.8102/1026547.23179543)*1103019.8102,
    "M+9": (1185189.2090398215/1103019.8102)*1185189.2090398215,
    "M+10": (1273479.8126334122/1185189.2090398215)*1273479.8126334122,
  },
  1125000: {
    M: 266947.758,
    "M+1": 488253.880094838,
    "M+2": 578595.47178938,
    "M+3": 695677.58001766,
    "M+4": 793854.433911846,
    "M+5": 892031.287806032,
    "M+6": 985747.861700218,
    "M+7": 1074927.48,
    "M+8": (1074927.48/985747.861700218)*1074927.48,
    "M+9": (1172175.088735366/1074927.48)*1172175.088735366,
    "M+10": (1278220.5908921068/1172175.088735366)*1278220.5908921068,
  },
  825000: {
    M: 264940.632,
    "M+1": 482453.62,
    "M+2": 572402.6,
    "M+3": 695060.3,
    "M+4": 785009.28,
    "M+5": 805645.800949231,
    "M+6": 813629.41,
    "M+7": 845520.412,
    "M+8": (845520.412/813629.41)*845520.412,
    "M+9": (878661.4130733667/845520.412)*878661.4130733667,
    "M+10": (913101.4081586545/878661.4130733667)*913101.4081586545,
  },
  750000: {
    M: 878661.4130733667,
    "M+1": 478142.016,
    "M+2": 551056.4433,
    "M+3": 654174.4,
    "M+4": 706211,
    "M+5": 732405.27359021,
    "M+6": 739663.1,
    "M+7": 768654.92,
    "M+8": (768654.92/739663.1)*768654.92,
    "M+9": (798783.10279397/768654.92)*798783.10279397,
    "M+10": (830092.1892351408/798783.10279397)*830092.1892351408,
  },
  675000: {
    M: 256912.128,
    "M+1": 456732.672,
    "M+2": 504234.654,
    "M+3": 596771.077615873,
    "M+4": 654992.118,
    "M+5": 659164.746231189,
    "M+6": 665696.79,
    "M+7": 691789.428,
    "M+8": (691789.428/665696.79)*691789.428,
    "M+9": (718904.7925145727/691789.428)*718904.7925145727,
    "M+10": (747082.9703116263/718904.7925145727)*747082.9703116263,
  },
  600000: {
    M: 240855.12,
    "M+1": 449596.224,
    "M+2": 500632.9779,
    "M+3": 575673.472,
    "M+4": 582215.216,
    "M+5": 585924.218872168,
    "M+6": 591730.48,
    "M+7": 614923.936,
    "M+8": (614923.936/591730.48)*614923.936,
    "M+9": (639026.4822351758/614923.936)*639026.4822351758,
    "M+10": (664073.7513881123/639026.4822351758)*664073.7513881123,
  },
  562500: {
    M: 234164.7,
    "M+1": 446028,
    "M+2": 497031.3018,
    "M+3": 540251.415,
    "M+4": 545826.765,
    "M+5": 549303.955192657,
    "M+6": 554747.325,
    "M+7": 576491.19,
    "M+8": (576491.19/554747.325)*576491.19,
    "M+9": (599087.3270954773/576491.19)*599087.3270954773,
    "M+10": (622569.1419263552/599087.3270954773)*622569.1419263552,
  },
  487500: {
    M: 224798.112,
    "M+1": 425213.36,
    "M+2": 467734.696,
    "M+3": 468701.09,
    "M+4": 473049.863,
    "M+5": 476063.427833636,
    "M+6": 480781.015,
    "M+7": 499625.698,
    "M+8": (499625.698/480781.015)*499625.698,
    "M+9": (519209.0168160803/499625.698)*519209.0168160803,
    "M+10": (539559.9230028412/519209.0168160803)*539559.9230028412,
  },
  450000: {
    M: 216769.608,
    "M+1": 374663.52,
    "M+2": 432201.132,
    "M+3": 432647.16,
    "M+4": 436661.412,
    "M+5": 439443.164154126,
    "M+6": 443797.86,
    "M+7": 461192.952,
    "M+8": (461192.952/443797.86)*461192.952,
    "M+9": (479269.86167638184/461192.952)*479269.86167638184,
    "M+10": (498055.31354108424/479269.86167638184)*498055.31354108424,
  },
  375000: {
    M: 200712.6,
    "M+1": 356822.4,
    "M+2": 360167.61,
    "M+3": 360539.3,
    "M+4": 363884.51,
    "M+5": 366202.636795105,
    "M+6": 369831.55,
    "M+7":384327.46,
    "M+8": (384327.46/369831.55)*384327.46,
    "M+9": (399391.551396985/384327.46)*399391.551396985,
    "M+10": (415046.0946175704/399391.551396985)*415046.0946175704,
  },
};
const UpdateCooporateOutPatient = () => {
  const { state, dispatch } = useContext(AuthContext);
     const { userInfo } = state;
     const params = useParams();
         const { id: corpotateId } = params;
          const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [outCategories, setOutCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/cooporate/single/${corpotateId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setOutCategories(data.outCart.outCategories || []);
        
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [corpotateId, userInfo]);
  const getPremiumData = (selectedCategory) => {
    return selectedCategory === "Per family" ? PremiumValuePerFamily : PremiumValuePerPerson;
  };
  const handleAddCategory = () => {
    const newCategory = {
      outId: outCategories.length + 1, outLimit: '', outMembers: 0, outDependencies: {},
      outTotalDependencies: {}, outTotalPremiumValues: {}, outPremiumValues: {}, outTotalPremium: 0, outTotalPremiumM: 0
    };
    setOutCategories([...outCategories, newCategory]);
  };

  const handleLimitChange = (outId, e) => {
    const newCategories = outCategories.map(outCategory =>
      outCategory.outId === outId ? { ...outCategory, outLimit: e.target.value } : outCategory
    );
    setOutCategories(newCategories);
  };

   const handleselectedCategoryChange = (id, e) => {
    const newCategories = outCategories.map(outCategory =>
      outCategory.id === id ? { ...outCategory, selectedCategory: e.target.value } : outCategory
    );
    setOutCategories(newCategories);
  };

  const handleAddMember = (outId) => {
    const newCategories = outCategories.map(outCategory =>
      outCategory.outId === outId ? { ...outCategory, outMembers: outCategory.outMembers + 1 } : outCategory
    );
    setOutCategories(newCategories);
  };

  const handleRemoveMember = (outId) => {
    const newCategories = outCategories.map(outCategory =>
      outCategory.outId === outId && outCategory.outMembers > 0 ? {
        ...outCategory,
        outMembers: outCategory.outMembers - 1,
        outDependencies: { ...outCategory.outDependencies, [`M+${outCategory.outMembers}`]: undefined }
      } : outCategory
    );
    setOutCategories(newCategories);
  };

  const handleDependencyChange = (outId, label, e) => {
    const value = parseInt(e.target.value) || 0;
    const newCategories = outCategories.map(outCategory =>
      outCategory.outId === outId ? { ...outCategory, outDependencies: { ...outCategory.outDependencies, [label]: value } } : outCategory
    );
    setOutCategories(newCategories);
  };

  const calculateOverallDependenciesTotal = (outCategory) => {
    let outOverallTotal = 0;
    const labels = Object.keys(outCategory.outTotalDependencies);

    for (let i = 0; i < labels.length; i++) {
      outOverallTotal += outCategory.outTotalDependencies[labels[i]] || 0;
    }

    return outOverallTotal;
  };

  const calculateTotalPremiumValue = (outCategory) => {
    let outTotalPremiumValue = 0;
    const memberLabels = Array.from({ length: outCategory.outMembers + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`));
    const premiumData= getPremiumData(outCategory.selectedCategory)
    for (let i = 0; i < memberLabels.length; i++) {
      const label = memberLabels[i];
      const outPremiumValuePerMember = (premiumData[outCategory.outLimit]?.[label] || 0) * (outCategory.outDependencies[label] || 0);
      outTotalPremiumValue += outPremiumValuePerMember;
    }
    return outTotalPremiumValue;
  };

  const calculateOverallTotals = () => {
    let outOverallTotalPremium = 0;
    let outOverallDependenciesTotal = 0;
    let outTotalStaffFamily = 0;

    outCategories.forEach(category => {
      outOverallTotalPremium += calculateTotalPremiumValue(category);
      outOverallDependenciesTotal += calculateOverallDependenciesTotal(category);
      const totalMembers = Object.values(category.outDependencies).reduce((sum, value) => sum + value, 0);
      outTotalStaffFamily += totalMembers;
    });

    return { outOverallTotalPremium, outOverallDependenciesTotal, outTotalStaffFamily };
  };

  useEffect(() => {
      const updatedCategories = outCategories.map(outCategory => {
        let updatedTotalDependencies = { ...outCategory.outTotalDependencies };
        const labels = Object.keys(outCategory.outDependencies);
  
        for (let i = 0; i < labels.length; i++) {
          const label = labels[i];
          const value = outCategory.outDependencies[label] || 0;
          let calculatedTotal = value;
  
          if (label !== 'M') {
            const numDependents = parseInt(label.slice(2));
            calculatedTotal += numDependents * value;
          }
  
          updatedTotalDependencies[label] = calculatedTotal;
        }
  
        let outTotalPremiumValue = calculateTotalPremiumValue(outCategory);
        let outTotalPremiumMValue = outTotalPremiumValue;
        const premiumData = getPremiumData(outCategory.selectedCategory)
        const outPremiumValues = Object.keys(outCategory.outDependencies).reduce((acc, key) => {
          acc[key] = premiumData[outCategory.outLimit]?.[key] || 0;
          return acc;
        }, {});
  
        const outTotalPremiumValues = Object.keys(outCategory.outDependencies).reduce((acc, key) => {
          acc[key] = (premiumData[outCategory.outLimit]?.[key] || 0) * (outCategory.outDependencies[key] || 0);
          return acc;
        }, {});
  
        return {
          ...outCategory,
          outTotalDependencies: updatedTotalDependencies,
          outTotalPremium: outTotalPremiumValue,
          outTotalPremiumM: outTotalPremiumMValue,
          outPremiumValues,
          outTotalPremiumValues,
        };
      });
      setOutCategories(updatedCategories);
    }, [outCategories.map(outCategory => outCategory.outDependencies)]);
  

  
    const handleSave = () => {
      const outCart = {outCategories,outOverallTotals}
      
      dispatch({ type: 'SET_OUT_CART', payload: outCart });
      localStorage.setItem('outCart', JSON.stringify(outCart));
      console.log(outCart);
        navigate(`/updateDental/${corpotateId}`);
      };


      const renderCategoryTables = () => {
        return outCategories.map(outCategory => {
          const premiumData = getPremiumData(outCategory.selectedCategory)
          return(

          <div key={outCategory.outId}>
            <Row className="my-4">
              <Col>
                <h5>Category {outCategory.outId}</h5>
                <Form>
                  <Form.Group controlId={`limitSelect-${outCategory.outId}`}>
                    <Form.Label>Select Out Patient Limit</Form.Label>
                    <Form.Control as="select" value={outCategory.outLimit} onChange={(e) => handleLimitChange(outCategory.outId, e)}>
                      <option value="">Select...</option>
                      {Object.keys(premiumData).map((outLimitValue) => (
                        <option key={outLimitValue} value={outLimitValue}>
                          {outLimitValue}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                   <Form.Group controlId={`selectedCategorySelect-${outCategory.id}`} className="mt-3">
                                                    <Form.Label>Select Premium Category</Form.Label>
                                                    <Form.Control as="select" value={outCategory.selectedCategory} onChange={(e) => handleselectedCategoryChange(outCategory.id, e)}>
                                                    <option value="">Select...</option>
                                    <option value="Per family">Premium per family</option>
                                    <option value="Per person">Premium per person</option>
                                                    </Form.Control>
                                                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Button style={{ marginRight: "1.2rem", background: "green" }} onClick={() => handleAddMember(outCategory.outId)}>
                  Add Member
                </Button>
                <Button variant="danger" onClick={() => handleRemoveMember(outCategory.outId)}>
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
                    {Array.from({ length: outCategory.outMembers + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                      <tr key={label}>
                        <td>{label}</td>
                        <td>{premiumData[outCategory.outLimit]?.[label]}</td>
                        <td>
                          <Form.Control type="number" value={outCategory.outDependencies[label] || ''} onChange={(e) => handleDependencyChange(outCategory.outId, label, e)} />
                        </td>
                        <td>{outCategory.outTotalDependencies[label]}</td>
                        <td>{(premiumData[outCategory.outLimit]?.[label] || 0) * (outCategory.outDependencies[label] || 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <h4>Total Premium: {calculateTotalPremiumValue(outCategory)}</h4>
                <h4>Total Beneficiaries: {calculateOverallDependenciesTotal(outCategory)}</h4>
              </Col>
            </Row>
          </div>
          )
        });
      };
      
  const outOverallTotals = calculateOverallTotals();

  
  return (
    <div>
      <CheckOutCooporateSteps step1 step2 step3/>
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
            <h3>Overall Total Premium: {outOverallTotals.outOverallTotalPremium}</h3>
            <h3>Overall Dependencies Total: {outOverallTotals.outOverallDependenciesTotal}</h3>
            <h3>Total Number of Staff/Family: {outOverallTotals.outTotalStaffFamily}</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateCooporateOutPatient;
