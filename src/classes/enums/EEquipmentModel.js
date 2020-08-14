import React from 'react';
import { faToolbox, faCarBattery, faMicrochip, faShareAlt, faTachometerFast, faLightbulbOn, 
        faSnowflake, faTire, faRampLoading, faSyncAlt, faBolt, faFill, faHammer, faPlug, faWrench, faFaucet, faSearch, faTachometerAltFast, faFan, faOilCan, faArrowAltToRight, faBurn, faCog, faSteeringWheel, faLightbulb, faJoystick } from '@fortawesome/pro-solid-svg-icons';
import { faSquareFull } from '@fortawesome/pro-regular-svg-icons';

import EBrand from './EBrand';

import Icon from './../../components/Utils/Icon/Icon';

import { EPalette } from './../../services/color.service';

import ASTRA_HD9_RIGID_IMG from './../../assets/equipmentModels/ASTRA_HD9_RIGID.png';
import ASTRA_HD9_TRACTOR_IMG from './../../assets/equipmentModels/ASTRA_HD9_TRACTOR.png';
import ASTRA_HHD9_RIGID_IMG from './../../assets/equipmentModels/ASTRA_HHD9_RIGID.png';
import ASTRA_HHD9_TRACTOR_IMG from './../../assets/equipmentModels/ASTRA_HHD9_TRACTOR.png';
import CHEETAH_CONTAINER_20_40_MAXIMIZER_12_PIN_IMG from './../../assets/equipmentModels/CHEETAH_CONTAINER_20_40_MAXIMIZER_12_PIN.png';
import CHEETAH_FLATBED_IMG from './../../assets/equipmentModels/CHEETAH_FLATBED.png';
import CHEETAH_CONTAINER_GOOSENECK_41_45_IMG from './../../assets/equipmentModels/CHEETAH_CONTAINER_GOOSENECK_41_45.png';
import CHEETAH_CONTAINER_20_40_SPREAD_CITY_IMG from './../../assets/equipmentModels/CHEETAH_CONTAINER_20_40_SPREAD_CITY.png';
import CITROEN_JUMPER_L2H2_IMG from './../../assets/equipmentModels/CITROEN_JUMPER_L2H2.png';
import CITROEN_JUMPER_L1H1_FRAME_IMG from './../../assets/equipmentModels/CITROEN_JUMPER_L1H1_FRAME.png';
import CONTRAL_CDU_53_CONTAINER_IMG from './../../assets/equipmentModels/CONTRAL_CDU_53_CONTAINER.png';
import DAF_CF_6x2_IMG from './../../assets/equipmentModels/DAF_CF_6x2.png';
import DAF_LF_TANDEM_4x2_IMG from './../../assets/equipmentModels/DAF_LF_TANDEM_4x2.png';
import DAF_XF_105_4x2_IMG from './../../assets/equipmentModels/DAF_XF_105_4x2.png';
import DAF_XF_105_6x2_IMG from './../../assets/equipmentModels/DAF_XF_105_6x2.png';
import DAF_XF_106_4x2_IMG from './../../assets/equipmentModels/DAF_XF_106_4x2.png';
import DAF_XF_106_6x2_IMG from './../../assets/equipmentModels/DAF_XF_106_6x2.png';
import DAF_XF_106_8x4_IMG from './../../assets/equipmentModels/DAF_XF_106_8x4.png';
import DOEPKER_55T_SINGLE_DROP_LOWBED_IMG from './../../assets/equipmentModels/DOEPKER_55T_SINGLE_DROP_LOWBED.png';
import DOONAN_DOUBLE_DROP_LOWBED_IMG from './../../assets/equipmentModels/DOONAN_DOUBLE_DROP_LOWBED.png';
import DOONAN_FLATBED_CHAP_1_1_IMG from './../../assets/equipmentModels/DOONAN_FLATBED_CHAP_1_1.png';
import DOONAN_FIXED_DOUBLE_DROP_LOWBED_IMG from './../../assets/equipmentModels/DOONAN_FIXED_DOUBLE_DROP_LOWBED.png';
import DORSEY_FLATBED_ALUMINIUM_GIANT_IMG from './../../assets/equipmentModels/DORSEY_FLATBED_ALUMINIUM_GIANT.png';
import DORSEY_FLATBED_STEEL_GIANT_IMG from './../../assets/equipmentModels/DORSEY_FLATBED_STEEL_GIANT.png';
import EAST_FLATBED_BEAST_IMG from './../../assets/equipmentModels/EAST_FLATBED_BEAST.png';
import EAST_FLATBED_BEAST_2_IMG from './../../assets/equipmentModels/EAST_FLATBED_BEAST_2.png';
import EAST_LOWBED_BEAST_DROP_DECK_IMG from './../../assets/equipmentModels/EAST_LOWBED_BEAST_DROP_DECK.png';
import EAST_STEEL_DUMP_IMG from './../../assets/equipmentModels/EAST_STEEL_DUMP.png';
import FELLING_FLATBED_IMG from './../../assets/equipmentModels/FELLING_FLATBED.png';
import FELLING_LOWBED_IMG from './../../assets/equipmentModels/FELLING_LOWBED.png';
import FERREE_LTV35_LOWBED_IMG from './../../assets/equipmentModels/FERREE_LTV35_LOWBED.png';
import FERREE_LTV51_LOWBED_IMG from './../../assets/equipmentModels/FERREE_LTV51_LOWBED.png';
import FERREE_LTTV51DS_LOWBED_IMG from './../../assets/equipmentModels/FERREE_LTTV51DS_LOWBED.png';
import FERREE_LTTV55_LOWBED_IMG from './../../assets/equipmentModels/FERREE_LTTV55_LOWBED.png';
import FIAT_DUCATO_L2H2_IMG from './../../assets/equipmentModels/FIAT_DUCATO_L2H2.png';
import FONTAINE_INFINITY_TOP_FLATBED_IMG from './../../assets/equipmentModels/FONTAINE_INFINITY_TOP_FLATBED.png';
import FONTAINE_VELOCITY_TOP_FLATBED_IMG from './../../assets/equipmentModels/FONTAINE_VELOCITY_TOP_FLATBED.png';
import FONTAINE_MAGNITUDE_51_IMG from './../../assets/equipmentModels/FONTAINE_MAGNITUDE_51.png';
import FONTAINE_MAGNITUDE_55H_FLD_IMG from './../../assets/equipmentModels/FONTAINE_MAGNITUDE_55H_FLD.png';
import FONTAINE_MAGNITUDE_55H_DSR_IMG from './../../assets/equipmentModels/FONTAINE_MAGNITUDE_55H_DSR.png';
import FONTAINE_MAGNITUDE_55L_IMG from './../../assets/equipmentModels/FONTAINE_MAGNITUDE_55L.png';
import FONTAINE_MAGNITUDE_55L_PLUS_IMG from './../../assets/equipmentModels/FONTAINE_MAGNITUDE_55L_PLUS.png';
import FONTAINE_MAGNITUDE_55H_MFLD_IMG from './../../assets/equipmentModels/FONTAINE_MAGNITUDE_55H_MFLD.png';
import FONTAINE_MAGNITUDE_55H_MDSR_IMG from './../../assets/equipmentModels/FONTAINE_MAGNITUDE_55H_MDSR.png';
import FONTAINE_MAGNITUDE_55H_MBMD_IMG from './../../assets/equipmentModels/FONTAINE_MAGNITUDE_55H_MBMD.png';
import FONTAINE_MAGNITUDE_55H_MX_IMG from './../../assets/equipmentModels/FONTAINE_MAGNITUDE_55H_MX.png';
import FONTAINE_RENEGADE_LXL_IMG from './../../assets/equipmentModels/FONTAINE_RENEGADE_LXL.png';
import FONTAINE_RENEGADE_LX40_IMG from './../../assets/equipmentModels/FONTAINE_RENEGADE_LX40.png';
import FONTAINE_RENEGADE_LXT40_IMG from './../../assets/equipmentModels/FONTAINE_RENEGADE_LXT40.png';
import FONTAINE_RENEGADE_LX40C_IMG from './../../assets/equipmentModels/FONTAINE_RENEGADE_LX40C.png';
import FONTAINE_RENEGADE_LXT40C_IMG from './../../assets/equipmentModels/FONTAINE_RENEGADE_LXT40C.png';
import FONTAINE_RENEGADE_LXLN12_IMG from './../../assets/equipmentModels/FONTAINE_RENEGADE_LXLN12.png';
import FONTAINE_RENEGADE_LXLN14_IMG from './../../assets/equipmentModels/FONTAINE_RENEGADE_LXLN14.png';
import FONTAINE_RENEGADE_LXN40_IMG from './../../assets/equipmentModels/FONTAINE_RENEGADE_LXN40.png';
import FONTAINE_RENEGADE_LXTN40_IMG from './../../assets/equipmentModels/FONTAINE_RENEGADE_LXTN40.png';
import FORD_1842T_IMG from './../../assets/equipmentModels/FORD_1842T.png';
import FORD_1833_IMG from './../../assets/equipmentModels/FORD_1833.png';
import FORD_4142D_IMG from './../../assets/equipmentModels/FORD_4142D.png';
import FORD_FMAX_IMG from './../../assets/equipmentModels/FORD_FMAX.png';
import FORD_TRANSIT_L2H2_IMG from './../../assets/equipmentModels/FORD_TRANSIT_L2H2.png';
import FORD_TRANSIT_L1H1_FRAME_IMG from './../../assets/equipmentModels/FORD_TRANSIT_L1H1_FRAME.png';
import FREIGHTLINER_CASCADIA_DAY_IMG from './../../assets/equipmentModels/FREIGHTLINER_CASCADIA_DAY.png';
import FREIGHTLINER_CASCADIA_SLEEPER_IMG from './../../assets/equipmentModels/FREIGHTLINER_CASCADIA_SLEEPER.png';
import FREIGHTLINER_M2_106_IMG from './../../assets/equipmentModels/FREIGHTLINER_M2_106.png';
import FREIGHTLINER_M2_112_IMG from './../../assets/equipmentModels/FREIGHTLINER_M2_112.png';
import FREIGHTLINER_114SD_IMG from './../../assets/equipmentModels/FREIGHTLINER_114SD.png';
import FREIGHTLINER_122SD_IMG from './../../assets/equipmentModels/FREIGHTLINER_122SD.png';
import FUSO_CANTER_L1_FRAME_IMG from './../../assets/equipmentModels/FUSO_CANTER_L1_FRAME.png';
import FUSO_CANTER_L1_TIPPER_IMG from './../../assets/equipmentModels/FUSO_CANTER_L1_TIPPER.png';
import FUSO_FIGHTER_6x4_IMG from './../../assets/equipmentModels/FUSO_FIGHTER_6x4.png';
import FUSO_SHOGUN_6x4_IMG from './../../assets/equipmentModels/FUSO_SHOGUN_6x4.png';
import FUSO_SHOGUN_8x4_IMG from './../../assets/equipmentModels/FUSO_SHOGUN_8x4.png';
import GOLDHOFER_TU_IMG from './../../assets/equipmentModels/GOLDHOFER_TU.png';
import GOLDHOFER_TN_L_IMG from './../../assets/equipmentModels/GOLDHOFER_TN_L.png';
import GREAT_DANE_EVEREST_SINGLE_TEMP_IMG from './../../assets/equipmentModels/GREAT_DANE_EVEREST_SINGLE_TEMP.png';
import GREAT_DANE_EVEREST_MULTI_TEMP_IMG from './../../assets/equipmentModels/GREAT_DANE_EVEREST_MULTI_TEMP.png';
import GREAT_DANE_ALPINE_IMG from './../../assets/equipmentModels/GREAT_DANE_ALPINE.png';
import GREAT_DANE_CHAMPION_SP2_IMG from './../../assets/equipmentModels/GREAT_DANE_CHAMPION_SP2.png';
import GREAT_DANE_CHAMPION_CP_IMG from './../../assets/equipmentModels/GREAT_DANE_CHAMPION_CP.png';
import GREAT_DANE_SAHARA_S_IMG from './../../assets/equipmentModels/GREAT_DANE_SAHARA_S.png';
import GREAT_DANE_SAHARA_C_IMG from './../../assets/equipmentModels/GREAT_DANE_SAHARA_C.png';
import GREAT_DANE_FREEDOM_LT_IMG from './../../assets/equipmentModels/GREAT_DANE_FREEDOM_LT.png';
import GREAT_DANE_FREEDOM_SE_IMG from './../../assets/equipmentModels/GREAT_DANE_FREEDOM_SE.png';
import GREAT_DANE_FREEDOM_XP_IMG from './../../assets/equipmentModels/GREAT_DANE_FREEDOM_XP.png';
import HEIL_STANDARD_DUTY_9500_LTD_D4_IMG from './../../assets/equipmentModels/HEIL_STANDARD_DUTY_9500_LTD_D4.png';
import HEIL_STANDARD_DUTY_9300_DT_S4_IMG from './../../assets/equipmentModels/HEIL_STANDARD_DUTY_9300_DT_S4.png';
import HEIL_8500_E_DOUBLE_CONICAL_S1_DOT_TC407_IMG from './../../assets/equipmentModels/HEIL_8500_E_DOUBLE_CONICAL_S1_DOT_TC407.png';
import HEIL_ST_7000_316L_SSSR_JS1_IMG from './../../assets/equipmentModels/HEIL_ST_7000_316L_SSSR_JS1.png';
import HERCURLES_CHASSIS_CONTAINER_IMG from './../../assets/equipmentModels/HERCURLES_CHASSIS_CONTAINER.png';
import HERCULES_CHASSIS_LOWBED_IMG from './../../assets/equipmentModels/HERCULES_CHASSIS_LOWBED.png';
import HINO_300_IMG from './../../assets/equipmentModels/HINO_300.png';
import HINO_500_4x2_IMG from './../../assets/equipmentModels/HINO_500_4x2.png';
import HINO_500_6x2_IMG from './../../assets/equipmentModels/HINO_500_6x2.png';
import HINO_600_IMG from './../../assets/equipmentModels/HINO_600.png';
import HINO_700_IMG from './../../assets/equipmentModels/HINO_700.png';
import HYUNDAI_H36L_IMG from './../../assets/equipmentModels/HYUNDAI_H36L.png';
import HYUNDAI_H120_IMG from './../../assets/equipmentModels/HYUNDAI_H120.png';
import HYUNDAI_HD35_IMG from './../../assets/equipmentModels/HYUNDAI_HD35.png';
import HYUNDAI_HD170_IMG from './../../assets/equipmentModels/HYUNDAI_HD170.png';
import HYUNDAI_PAVISE_IMG from './../../assets/equipmentModels/HYUNDAI_PAVISE.png';
import HYUNDAI_XCIENT_IMG from './../../assets/equipmentModels/HYUNDAI_XCIENT.png';
import ISUZU_EXR_IMG from './../../assets/equipmentModels/ISUZU_EXR.png';
import ISUZU_EXZ_IMG from './../../assets/equipmentModels/ISUZU_EXZ.png';
import ISUZU_FRR_IMG from './../../assets/equipmentModels/ISUZU_FRR.png';
import ISUZU_FSR_IMG from './../../assets/equipmentModels/ISUZU_FSR.png';
import ISUZU_FVZ_IMG from './../../assets/equipmentModels/ISUZU_FVZ.png';
import ISUZU_FYH_IMG from './../../assets/equipmentModels/ISUZU_FYH.png';
import ISUZU_GXZ_IMG from './../../assets/equipmentModels/ISUZU_GXZ.png';
import ISUZU_NLR_IMG from './../../assets/equipmentModels/ISUZU_NLR.png';
import ISUZU_NMR_IMG from './../../assets/equipmentModels/ISUZU_NMR.png';
import ISUZU_NPR_IMG from './../../assets/equipmentModels/ISUZU_NPR.png';
import ISUZU_NPS_IMG from './../../assets/equipmentModels/ISUZU_NPS.png';
import IVECO_DAILY_L3H2_IMG from './../../assets/equipmentModels/IVECO_DAILY_L3H2.png';
import IVECO_EUROCARGO_IMG from './../../assets/equipmentModels/IVECO_EUROCARGO.png';
import IVECO_S_WAY_IMG from './../../assets/equipmentModels/IVECO_S_WAY.png';
import IVECO_S_WAY_TANDEM_IMG from './../../assets/equipmentModels/IVECO_S_WAY_TANDEM.png';
import Iveco_Stralis_4x2_IMG from './../../assets/equipmentModels/Iveco_Stralis_4x2.png';
import Iveco_Stralis_6x2_IMG from './../../assets/equipmentModels/Iveco_Stralis_6x2.png';
import Iveco_Stralis_Hiway_4x2_IMG from './../../assets/equipmentModels/Iveco_Stralis_Hiway_4x2.png';
import Iveco_Stralis_Hiway_6x2_IMG from './../../assets/equipmentModels/Iveco_Stralis_Hiway_6x2.png';
import IVECO_TRAKKER_IMG from './../../assets/equipmentModels/IVECO_TRAKKER.png';
import J_J_BODIES_210_LARGE_DT_IMG from './../../assets/equipmentModels/J_J_BODIES_210_LARGE_DT.png';
import J_J_BODIES_211_LARGE_DT_FTA_IMG from './../../assets/equipmentModels/J_J_BODIES_211_LARGE_DT_FTA.png';
import J_J_BODIES_267_LARGE_DT_FL_IMG from './../../assets/equipmentModels/J_J_BODIES_267_LARGE_DT_FL.png';
import J_J_BODIES_266_LARGE_TT_LFEVO_IMG from './../../assets/equipmentModels/J_J_BODIES_266_LARGE_TT_LFEVO.png';
import J_J_BODIES_215_LARGE_TT_AT_IMG from './../../assets/equipmentModels/J_J_BODIES_215_LARGE_TT_AT.png';
import J_J_BODIES_697_MH_EVO_IMG from './../../assets/equipmentModels/J_J_BODIES_697_MH_EVO.png';
import KAMAZ_5490_IMG from './../../assets/equipmentModels/KAMAZ_5490.png';
import KASSBOHRER_BOX_DRY_K_SBT_20_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_BOX_DRY_K_SBT_20_12_27.png';
import KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AH_45_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AH_45_12_27.png';
import KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AMH_40_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AMH_40_12_27.png';
import KASSBOHRER_FLATBED_LIGHT_K_SFS_X_PLUS_90_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_FLATBED_LIGHT_K_SFS_X_PLUS_90_12_27.png';
import KASSBOHRER_FLATBED_LIGHT_K_SPS_3_0N_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_FLATBED_LIGHT_K_SPS_3_0N_12_27.png';
import KASSBOHRER_LIGHT_K_SCL_X_PLUS_150_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_LIGHT_K_SCL_X_PLUS_150_12_27.png';
import KASSBOHRER_LOWBED_K_SLS_3_0N_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_LOWBED_K_SLS_3_0N_12_27.png';
import KASSBOHRER_REEFER_STANDARD_K_SRI_C_10_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_REEFER_STANDARD_K_SRI_C_10_12_27.png';
import KASSBOHRER_SILO_TIPPING_K_SSK_40_3_10_24_IMG from './../../assets/equipmentModels/KASSBOHRER_SILO_TIPPING_K_SSK_40_3_10_24.png';
import KASSBOHRER_SILO_TIPPING_K_SSK_60_5_10_24_IMG from './../../assets/equipmentModels/KASSBOHRER_SILO_TIPPING_K_SSK_60_5_10_24.png';
import KASSBOHRER_STANDARD_K_SCD_M_90_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_STANDARD_K_SCD_M_90_12_27.png';
import KASSBOHRER_STANDARD_K_SCX_X_125_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_STANDARD_K_SCX_X_125_12_27.png';
import KASSBOHRER_TANK_DANGEROUS_K_STB_E_39_5_11_24_IMG from './../../assets/equipmentModels/KASSBOHRER_TANK_DANGEROUS_K_STB_E_39_5_11_24.png';
import KASSBOHRER_TANK_DANGEROUS_K_STS_32_1_10_24_IMG from './../../assets/equipmentModels/KASSBOHRER_TANK_DANGEROUS_K_STS_32_1_10_24.png';
import KASSBOHRER_TANK_FOOD_K_STL_30_3_10_24_IMG from './../../assets/equipmentModels/KASSBOHRER_TANK_FOOD_K_STL_30_3_10_24.png';
import KASSBOHRER_TIPPER_ALU_K_SKA_B_26_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_TIPPER_ALU_K_SKA_B_26_12_27.png';
import KASSBOHRER_TIPPER_STEEL_K_SKS_B_24_15_18_IMG from './../../assets/equipmentModels/KASSBOHRER_TIPPER_STEEL_K_SKS_B_24_15_18.png';
import KASSBOHRER_TIPPER_STEEL_K_SKS_BS_24_12_27_IMG from './../../assets/equipmentModels/KASSBOHRER_TIPPER_STEEL_K_SKS_BS_24_12_27.png';
import KENTUCKY_TRAILER_53_COMPOSITE_STRAIGHT_FLOOR_IMG from './../../assets/equipmentModels/KENTUCKY_TRAILER_53_COMPOSITE_STRAIGHT_FLOOR.png';
import KENTUCKY_TRAILER_BEVERAGE_IMG from './../../assets/equipmentModels/KENTUCKY_TRAILER_BEVERAGE.png';
import KENTUCKY_TRAILER_MOVING_IMG from './../../assets/equipmentModels/KENTUCKY_TRAILER_MOVING.png';
import KENWORTH_C500_IMG from './../../assets/equipmentModels/KENWORTH_C500.png';
import KENWORTH_K270_IMG from './../../assets/equipmentModels/KENWORTH_K270.png';
import KENWORTH_T660_IMG from './../../assets/equipmentModels/KENWORTH_T660.png';
import KENWORTH_T800_IMG from './../../assets/equipmentModels/KENWORTH_T800.png';
import KENWORTH_W900_IMG from './../../assets/equipmentModels/KENWORTH_W900.png';
import KENWORTH_W990_IMG from './../../assets/equipmentModels/KENWORTH_W990.png';
import KENWORTH_W990_3_IMG from './../../assets/equipmentModels/KENWORTH_W990_3.png';
import KOGEL_BOX_IMG from './../../assets/equipmentModels/KOGEL_BOX.png';
import KOGEL_TIPPER_IMG from './../../assets/equipmentModels/KOGEL_TIPPER.png';
import KOGEL_FLATBED_IMG from './../../assets/equipmentModels/KOGEL_FLATBED.png';
import KOGEL_TRAILER_IMG from './../../assets/equipmentModels/KOGEL_TRAILER.png';
import KRONE_BOX_LINER_IMG from './../../assets/equipmentModels/KRONE_BOX_LINER.png';
import KRONE_COOL_LINER_IMG from './../../assets/equipmentModels/KRONE_COOL_LINER.png';
import KRONE_MEGA_LINER_IMG from './../../assets/equipmentModels/KRONE_MEGA_LINER.png';
import LAMBERET_DAF_CF_PORTEUR_IMG from './../../assets/equipmentModels/LAMBERET_DAF_CF_PORTEUR.png';
import LAMBERET_FRIGOLINE_CITY_IMG from './../../assets/equipmentModels/LAMBERET_FRIGOLINE_CITY.png';
import LAMBERET_RENAULT_DCab_Frigoline_City_IMG from './../../assets/equipmentModels/LAMBERET_RENAULT_DCab_Frigoline_City.png';
import LAMBERET_SR2_green_liner_IMG from './../../assets/equipmentModels/LAMBERET_SR2_green_liner.png';
import LAMBERET_SR2_HD_IMG from './../../assets/equipmentModels/LAMBERET_SR2_HD.png';
import LAMBERET_SR2_super_duplex_IMG from './../../assets/equipmentModels/LAMBERET_SR2_super_duplex.png';
import LANDOLL_LOWBED_IMG from './../../assets/equipmentModels/LANDOLL_LOWBED.png';
import LAWRENCE_DAVID_BOX_TRAILER_IMG from './../../assets/equipmentModels/LAWRENCE_DAVID_BOX_TRAILER.png';
import LAWRENCE_DAVID_CURTAIN_TANDEM_IMG from './../../assets/equipmentModels/LAWRENCE_DAVID_CURTAIN_TANDEM.png';
import LAWRENCE_DAVID_CURTAIN_TANDEM_2_IMG from './../../assets/equipmentModels/LAWRENCE_DAVID_CURTAIN_TANDEM_2.png';
import LAWRENCE_DAVID_CURTAIN_TRAILER_IMG from './../../assets/equipmentModels/LAWRENCE_DAVID_CURTAIN_TRAILER.png';
import LAWRENCE_DAVID_FLATBED_TRAILER_IMG from './../../assets/equipmentModels/LAWRENCE_DAVID_FLATBED_TRAILER.png';
import LAWRENCE_DAVID_RIGID_BOX_VAN_IMG from './../../assets/equipmentModels/LAWRENCE_DAVID_RIGID_BOX_VAN.png';
import MAC_TRAILER_TANK_IMG from './../../assets/equipmentModels/MAC_TRAILER_TANK.png';
import MACK_ANTHEM_48_SLEEPER_IMG from './../../assets/equipmentModels/MACK_ANTHEM_48_SLEEPER.png';
import MACK_ANTHEM_70_SLEEPER_IMG from './../../assets/equipmentModels/MACK_ANTHEM_70_SLEEPER.png';
import MACK_ANTHEM_DAYCAB_IMG from './../../assets/equipmentModels/MACK_ANTHEM_DAYCAB.png';
import MACK_GRANITE_SEMI_6x4_IMG from './../../assets/equipmentModels/MACK_GRANITE_SEMI_6x4.png';
import MACK_GRANITE_TIPPER_6x4_IMG from './../../assets/equipmentModels/MACK_GRANITE_TIPPER_6x4.png';
import MAN_TGE_CAB_TIPPER_IMG from './../../assets/equipmentModels/MAN_TGE_CAB_TIPPER.png';
import MAN_TGE_L2H2_IMG from './../../assets/equipmentModels/MAN_TGE_L2H2.png';
import MAN_TGE_TIPPER_IMG from './../../assets/equipmentModels/MAN_TGE_TIPPER.png';
import MAN_TGL_TANDEM_4x2_IMG from './../../assets/equipmentModels/MAN_TGL_TANDEM_4x2.png';
import MAN_TGS_4x2_IMG from './../../assets/equipmentModels/MAN_TGS_4x2.png';
import MAN_TGS_4x2_TALL_IMG from './../../assets/equipmentModels/MAN_TGS_4x2_TALL.png';
import MAN_TGS_TANDEM_4x2_IMG from './../../assets/equipmentModels/MAN_TGS_TANDEM_4x2.png';
import MAN_TGS_TANDEM_4x2_TALL_IMG from './../../assets/equipmentModels/MAN_TGS_TANDEM_4x2_TALL.png';
import MAN_TGS_TANDEM_6x4_IMG from './../../assets/equipmentModels/MAN_TGS_TANDEM_6x4.png';
import MAN_TGS_TANDEM_6x4_TALL_IMG from './../../assets/equipmentModels/MAN_TGS_TANDEM_6x4_TALL.png';
import MAN_TGS_TANDEM_8x4_IMG from './../../assets/equipmentModels/MAN_TGS_TANDEM_8x4.png';
import MAN_TGX_1_4x2_IMG from './../../assets/equipmentModels/MAN_TGX_1_4x2.png';
import MAN_TGX_1_6x2_IMG from './../../assets/equipmentModels/MAN_TGX_1_6x2.png';
import MAN_TGX_2_4x2_IMG from './../../assets/equipmentModels/MAN_TGX_2_4x2.png';
import MAN_TGX_2_6x2_IMG from './../../assets/equipmentModels/MAN_TGX_2_6x2.png';
import MAN_TGX_3_4x2_IMG from './../../assets/equipmentModels/MAN_TGX_3_4x2.png';
import MAN_TGX_3_4x2_TALL_IMG from './../../assets/equipmentModels/MAN_TGX_3_4x2_TALL.png';
import MAN_TGX_TANDEM_4x2_IMG from './../../assets/equipmentModels/MAN_TGX_TANDEM_4x2.png';
import MAN_TGX_TANDEM_6x4_IMG from './../../assets/equipmentModels/MAN_TGX_TANDEM_6x4.png';
import MAN_TGX_TANDEM_6x4_TALL_IMG from './../../assets/equipmentModels/MAN_TGX_TANDEM_6x4_TALL.png';
import MAN_TGX_TANDEM_8x4_IMG from './../../assets/equipmentModels/MAN_TGX_TANDEM_8x4.png';
import MANAC_ALU_TIPPER_IMG from './../../assets/equipmentModels/MANAC_ALU_TIPPER.png';
import MANAC_BOX_IMG from './../../assets/equipmentModels/MANAC_BOX.png';
import MANAC_BOX_2_IMG from './../../assets/equipmentModels/MANAC_BOX_2.png';
import MANAC_FLATBED_IMG from './../../assets/equipmentModels/MANAC_FLATBED.png';
import MANAC_FLATBED_2_IMG from './../../assets/equipmentModels/MANAC_FLATBED_2.png';
import MANAC_FLATBED_3_IMG from './../../assets/equipmentModels/MANAC_FLATBED_3.png';
import MANAC_LOWBED_IMG from './../../assets/equipmentModels/MANAC_LOWBED.png';
import MANAC_LOWBED_2_IMG from './../../assets/equipmentModels/MANAC_LOWBED_2.png';
import MANAC_REEFER_IMG from './../../assets/equipmentModels/MANAC_REEFER.png';
import MANAC_STEEL_TIPPER_IMG from './../../assets/equipmentModels/MANAC_STEEL_TIPPER.png';
import MAXI_TRANS_Freighter_SafeTliner_IMG from './../../assets/equipmentModels/MAXI_TRANS_Freighter_SafeTliner.png';
import MAXI_TRANS_Freighter_skel_2_IMG from './../../assets/equipmentModels/MAXI_TRANS_Freighter_skel_2.png';
import MAXI_TRANS_Freighter_Ultra_Lo_Skel_IMG from './../../assets/equipmentModels/MAXI_TRANS_Freighter_Ultra_Lo_Skel.png';
import MAXI_TRANS_HxW_semi_tipper_IMG from './../../assets/equipmentModels/MAXI_TRANS_HxW_semi_tipper.png';
import MAXI_TRANS_Maxi_CUBE_Classic_2_IMG from './../../assets/equipmentModels/MAXI_TRANS_Maxi_CUBE_Classic_2.png';
import MAXI_TRANS_Maxi_CUBE_DryFreight_3_IMG from './../../assets/equipmentModels/MAXI_TRANS_Maxi_CUBE_DryFreight_3.png';
import MAZ_5440C_IMG from './../../assets/equipmentModels/MAZ_5440C.png';
import MAZ_5440E_IMG from './../../assets/equipmentModels/MAZ_5440E.png';
import MAZ_6430C_IMG from './../../assets/equipmentModels/MAZ_6430C.png';
import MERCEDES_ACTROS_MP3_4x2_IMG from './../../assets/equipmentModels/MERCEDES_ACTROS_MP3_4x2.png';
import MERCEDES_ACTROS_MP3_6x2_IMG from './../../assets/equipmentModels/MERCEDES_ACTROS_MP3_6x2.png';
import MERCEDES_ACTROS_MP4_4x2_IMG from './../../assets/equipmentModels/MERCEDES_ACTROS_MP4_4x2.png';
import MERCEDES_ACTROS_MP4_6x2_IMG from './../../assets/equipmentModels/MERCEDES_ACTROS_MP4_6x2.png';
import MERCEDES_ACTROS_MP5_4x2_IMG from './../../assets/equipmentModels/MERCEDES_ACTROS_MP5_4x2.png';
import MERCEDES_ACTROS_MP5_SLT_IMG from './../../assets/equipmentModels/MERCEDES_ACTROS_MP5_SLT.png';
import MERCEDES_ACTROS_TANDEM_6x2_IMG from './../../assets/equipmentModels/MERCEDES_ACTROS_TANDEM_6x2.png';
import MERCEDES_AROCS_4x2_IMG from './../../assets/equipmentModels/MERCEDES_AROCS_4x2.png';
import MERCEDES_AROCS_8x4_IMG from './../../assets/equipmentModels/MERCEDES_AROCS_8x4.png';
import MERCEDES_ATEGO_TANDEM_4x2_IMG from './../../assets/equipmentModels/MERCEDES_ATEGO_TANDEM_4x2.png';
import MERCEDES_SPRINTER_FRAME_IMG from './../../assets/equipmentModels/MERCEDES_SPRINTER_FRAME.png';
import MERCEDES_SPRINTER_L3H2_IMG from './../../assets/equipmentModels/MERCEDES_SPRINTER_L3H2.png';
import MERCEDES_SPRINTER_TIPPER_IMG from './../../assets/equipmentModels/MERCEDES_SPRINTER_TIPPER.png';
import MERCEDES_VITO_L1H1_IMG from './../../assets/equipmentModels/MERCEDES_VITO_L1H1.png';
import NAVISTAR_INTERNATIONAL_DURASTAR_BOX_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_DURASTAR_BOX.png';
import NAVISTAR_INTERNATIONAL_DURASTAR_SEMI_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_DURASTAR_SEMI.png';
import NAVISTAR_INTERNATIONAL_HV_SEMI_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_HV_SEMI.png';
import NAVISTAR_INTERNATIONAL_HV_TIPPER_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_HV_TIPPER.png';
import NAVISTAR_INTERNATIONAL_HX_SEMI_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_HX_SEMI.png';
import NAVISTAR_INTERNATIONAL_HX_TIPPER_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_HX_TIPPER.png';
import NAVISTAR_INTERNATIONAL_LONESTAR_DAYCAB_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_LONESTAR_DAYCAB.png';
import NAVISTAR_INTERNATIONAL_LONESTAR_HIGH_SLEEPER_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_LONESTAR_HIGH_SLEEPER.png';
import NAVISTAR_INTERNATIONAL_LONESTAR_LOW_SLEEPER_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_LONESTAR_LOW_SLEEPER.png';
import NAVISTAR_INTERNATIONAL_LT_DAYCAB_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_LT_DAYCAB.png';
import NAVISTAR_INTERNATIONAL_LT_HIGH_SLEEPER_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_LT_HIGH_SLEEPER.png';
import NAVISTAR_INTERNATIONAL_LT_LOW_SLEEPER_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_LT_LOW_SLEEPER.png';
import NAVISTAR_INTERNATIONAL_MV_BOX_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_MV_BOX.png';
import NAVISTAR_INTERNATIONAL_MV_SEMI_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_MV_SEMI.png';
import NAVISTAR_INTERNATIONAL_MV_TIPPER_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_MV_TIPPER.png';
import NAVISTAR_INTERNATIONAL_PROSTAR_DAYCAB_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_PROSTAR_DAYCAB.png';
import NAVISTAR_INTERNATIONAL_PROSTAR_HIGH_SLEEPER_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_PROSTAR_HIGH_SLEEPER.png';
import NAVISTAR_INTERNATIONAL_PROSTAR_LOW_SLEEPER_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_PROSTAR_LOW_SLEEPER.png';
import NAVISTAR_INTERNATIONAL_RH_DAYCAB_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_RH_DAYCAB.png';
import NAVISTAR_INTERNATIONAL_RH_HIGH_SLEEPER_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_RH_HIGH_SLEEPER.png';
import NAVISTAR_INTERNATIONAL_RH_LOW_SLEEPER_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_RH_LOW_SLEEPER.png';
import NAVISTAR_INTERNATIONAL_WORKSTAR_4x2_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_WORKSTAR_4x2.png';
import NAVISTAR_INTERNATIONAL_WORKSTAR_6x4_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_WORKSTAR_6x4.png';
import NAVISTAR_INTERNATIONAL_WORKSTAR_8x6_IMG from './../../assets/equipmentModels/NAVISTAR_INTERNATIONAL_WORKSTAR_8x6.png';
import NIKOLA_ONE_IMG from './../../assets/equipmentModels/NIKOLA_ONE.png';
import NIKOLA_TRE_IMG from './../../assets/equipmentModels/NIKOLA_TRE.png';
import NIKOLA_TWO_IMG from './../../assets/equipmentModels/NIKOLA_TWO.png';
import NISSAN_CABSTAR_BOX_IMG from './../../assets/equipmentModels/NISSAN_CABSTAR_BOX.png';
import NISSAN_CABSTAR_TIPPER_IMG from './../../assets/equipmentModels/NISSAN_CABSTAR_TIPPER.png';
import NISSAN_NV300_L1H1_IMG from './../../assets/equipmentModels/NISSAN_NV300_L1H1.png';
import NISSAN_NV400_L3H3_IMG from './../../assets/equipmentModels/NISSAN_NV400_L3H3.png';
import OPEL_MOVANO_L1_CAB_TIPPER_IMG from './../../assets/equipmentModels/OPEL_MOVANO_L1_CAB_TIPPER.png';
import OPEL_MOVANO_L1_FRAME_IMG from './../../assets/equipmentModels/OPEL_MOVANO_L1_FRAME.png';
import OPEL_MOVANO_L2H2_IMG from './../../assets/equipmentModels/OPEL_MOVANO_L2H2.png';
import OPEL_MOVANO_L4H2_IMG from './../../assets/equipmentModels/OPEL_MOVANO_L4H2.png';
import OPEL_VIVARO_IMG from './../../assets/equipmentModels/OPEL_VIVARO.png';
import PETERBILT_220_IMG from './../../assets/equipmentModels/PETERBILT_220.png';
import PETERBILT_325_IMG from './../../assets/equipmentModels/PETERBILT_325.png';
import PETERBILT_330_IMG from './../../assets/equipmentModels/PETERBILT_330.png';
import PETERBILT_337_IMG from './../../assets/equipmentModels/PETERBILT_337.png';
import PETERBILT_348_IMG from './../../assets/equipmentModels/PETERBILT_348.png';
import PETERBILT_365_IMG from './../../assets/equipmentModels/PETERBILT_365.png';
import PETERBILT_367_IMG from './../../assets/equipmentModels/PETERBILT_367.png';
import PETERBILT_389_IMG from './../../assets/equipmentModels/PETERBILT_389.png';
import PETERBILT_567_IMG from './../../assets/equipmentModels/PETERBILT_567.png';
import PETERBILT_579_IMG from './../../assets/equipmentModels/PETERBILT_579.png';
import PEUGEOT_BOXER_L1H1_IMG from './../../assets/equipmentModels/PEUGEOT_BOXER_L1H1.png';
import PEUGEOT_BOXER_L2H2_IMG from './../../assets/equipmentModels/PEUGEOT_BOXER_L2H2.png';
import PEUGEOT_EXPERT_IMG from './../../assets/equipmentModels/PEUGEOT_EXPERT.png';
import PITTS_FLATBED_LB35_IMG from './../../assets/equipmentModels/PITTS_FLATBED_LB35.png';
import PITTS_LOWBED_LB35_DC_IMG from './../../assets/equipmentModels/PITTS_LOWBED_LB35_DC.png';
import PITTS_LOWBED_LB51_DC_IMG from './../../assets/equipmentModels/PITTS_LOWBED_LB51_DC.png';
import PITTS_LOWBED_LB55_DC_IMG from './../../assets/equipmentModels/PITTS_LOWBED_LB55_DC.png';
import POLAR_TANK_CHEMICAL_IMG from './../../assets/equipmentModels/POLAR_TANK_CHEMICAL.png';
import POLAR_TANK_DEEP_DROP_IMG from './../../assets/equipmentModels/POLAR_TANK_DEEP_DROP.png';
import POLAR_TANK_ENERGY_IMG from './../../assets/equipmentModels/POLAR_TANK_ENERGY.png';
import POLAR_TANK_FOOD_IMG from './../../assets/equipmentModels/POLAR_TANK_FOOD.png';
import POLAR_TANK_HOT_IMG from './../../assets/equipmentModels/POLAR_TANK_HOT.png';
import POLAR_TANK_PETROLEUM_IMG from './../../assets/equipmentModels/POLAR_TANK_PETROLEUM.png';
import PRATT_CONTAINER_CC242_IMG from './../../assets/equipmentModels/PRATT_CONTAINER_CC242.png';
import PRATT_CONTAINER_CC243_IMG from './../../assets/equipmentModels/PRATT_CONTAINER_CC243.png';
import PRATT_CONTAINER_D3141_IMG from './../../assets/equipmentModels/PRATT_CONTAINER_D3141.png';
import PRATT_CONTAINER_GN2040EZ_IMG from './../../assets/equipmentModels/PRATT_CONTAINER_GN2040EZ.png';
import PRATT_FLATBED_FB472SA_IMG from './../../assets/equipmentModels/PRATT_FLATBED_FB472SA.png';
import PRATT_FLATBED_FB533_IMG from './../../assets/equipmentModels/PRATT_FLATBED_FB533.png';
import PRATT_FLATBED_FB4228P_IMG from './../../assets/equipmentModels/PRATT_FLATBED_FB4228P.png';
import PRATT_LOWBED_LB5374_40_IMG from './../../assets/equipmentModels/PRATT_LOWBED_LB5374_40.png';
import PRATT_LOWBED_MD482A_IMG from './../../assets/equipmentModels/PRATT_LOWBED_MD482A.png';
import PRATT_LOWBED_MDE48702A_IMG from './../../assets/equipmentModels/PRATT_LOWBED_MDE48702A.png';
import REINKE_FLATBED_IMG from './../../assets/equipmentModels/REINKE_FLATBED.png';
import RENAULT_MAGNUM_4x2_IMG from './../../assets/equipmentModels/RENAULT_MAGNUM_4x2.png';
import RENAULT_MAGNUM_6x2_IMG from './../../assets/equipmentModels/RENAULT_MAGNUM_6x2.png';
import RENAULT_MASTER_BOX_L2_IMG from './../../assets/equipmentModels/RENAULT_MASTER_BOX_L2.png';
import RENAULT_MASTER_FRAME_L2_IMG from './../../assets/equipmentModels/RENAULT_MASTER_FRAME_L2.png';
import RENAULT_MASTER_L2H2_IMG from './../../assets/equipmentModels/RENAULT_MASTER_L2H2.png';
import RENAULT_MASTER_TIPPER_L2_IMG from './../../assets/equipmentModels/RENAULT_MASTER_TIPPER_L2.png';
import RENAULT_PREMIUM_4x2_IMG from './../../assets/equipmentModels/RENAULT_PREMIUM_4x2.png';
import RENAULT_PREMIUM_6x2_IMG from './../../assets/equipmentModels/RENAULT_PREMIUM_6x2.png';
import RENAULT_RANGE_T_4x2_IMG from './../../assets/equipmentModels/RENAULT_RANGE_T_4x2.png';
import RENAULT_RANGE_T_6x2_IMG from './../../assets/equipmentModels/RENAULT_RANGE_T_6x2.png';
import RENAULT_TRAFIC_IMG from './../../assets/equipmentModels/RENAULT_TRAFIC.png';
import SCANIA_G_DAYCAB_SEMI_4x2_IMG from './../../assets/equipmentModels/SCANIA_G_DAYCAB_SEMI_4x2.png';
import SCANIA_G_DAYCAB_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_G_DAYCAB_SEMI_6x2.png';
import SCANIA_G_DAYCAB_TANDEM_4x2_IMG from './../../assets/equipmentModels/SCANIA_G_DAYCAB_TANDEM_4x2.png';
import SCANIA_G_DAYCAB_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_G_DAYCAB_TANDEM_6x2.png';
import SCANIA_G_DAYCAB_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_G_DAYCAB_TANDEM_8x4.png';
import SCANIA_G_SLEEPER_SEMI_4x2_IMG from './../../assets/equipmentModels/SCANIA_G_SLEEPER_SEMI_4x2.png';
import SCANIA_G_SLEEPER_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_G_SLEEPER_SEMI_6x2.png';
import SCANIA_G_SLEEPER_TANDEM_4x2_IMG from './../../assets/equipmentModels/SCANIA_G_SLEEPER_TANDEM_4x2.png';
import SCANIA_G_SLEEPER_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_G_SLEEPER_TANDEM_6x2.png';
import SCANIA_G_SLEEPER_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_G_SLEEPER_TANDEM_8x4.png';
import SCANIA_L_SEMI_4x2_IMG from './../../assets/equipmentModels/SCANIA_L_SEMI_4x2.png';
import SCANIA_L_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_L_SEMI_6x2.png';
import SCANIA_L_TANDEM_4x2_IMG from './../../assets/equipmentModels/SCANIA_L_TANDEM_4x2.png';
import SCANIA_L_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_L_TANDEM_6x2.png';
import SCANIA_OR_G_DAYCAB_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_G_DAYCAB_SEMI_6x2.png';
import SCANIA_OR_G_DAYCAB_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_G_DAYCAB_TANDEM_6x2.png';
import SCANIA_OR_G_DAYCAB_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_OR_G_DAYCAB_TANDEM_8x4.png';
import SCANIA_OR_G_SLEEPER_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_G_SLEEPER_SEMI_6x2.png';
import SCANIA_OR_G_SLEEPER_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_G_SLEEPER_TANDEM_6x2.png';
import SCANIA_OR_G_SLEEPER_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_OR_G_SLEEPER_TANDEM_8x4.png';
import SCANIA_OR_P_DAYCAB_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_P_DAYCAB_SEMI_6x2.png';
import SCANIA_OR_P_DAYCAB_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_P_DAYCAB_TANDEM_6x2.png';
import SCANIA_OR_P_DAYCAB_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_OR_P_DAYCAB_TANDEM_8x4.png';
import SCANIA_OR_P_SLEEPER_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_P_SLEEPER_SEMI_6x2.png';
import SCANIA_OR_P_SLEEPER_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_P_SLEEPER_TANDEM_6x2.png';
import SCANIA_OR_P_SLEEPER_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_OR_P_SLEEPER_TANDEM_8x4.png';
import SCANIA_OR_R_DAYCAB_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_R_DAYCAB_SEMI_6x2.png';
import SCANIA_OR_R_DAYCAB_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_R_DAYCAB_TANDEM_6x2.png';
import SCANIA_OR_R_DAYCAB_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_OR_R_DAYCAB_TANDEM_8x4.png';
import SCANIA_OR_R_SLEEPER_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_R_SLEEPER_SEMI_6x2.png';
import SCANIA_OR_R_SLEEPER_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_R_SLEEPER_TANDEM_6x2.png';
import SCANIA_OR_R_SLEEPER_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_OR_R_SLEEPER_TANDEM_8x4.png';
import SCANIA_OR_S_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_S_SEMI_6x2.png';
import SCANIA_OR_S_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_OR_S_TANDEM_6x2.png';
import SCANIA_OR_S_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_OR_S_TANDEM_8x4.png';
import SCANIA_P_DAYCAB_SEMI_4x2_IMG from './../../assets/equipmentModels/SCANIA_P_DAYCAB_SEMI_4x2.png';
import SCANIA_P_DAYCAB_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_P_DAYCAB_SEMI_6x2.png';
import SCANIA_P_DAYCAB_TANDEM_4x2_IMG from './../../assets/equipmentModels/SCANIA_P_DAYCAB_TANDEM_4x2.png';
import SCANIA_P_DAYCAB_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_P_DAYCAB_TANDEM_6x2.png';
import SCANIA_P_DAYCAB_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_P_DAYCAB_TANDEM_8x4.png';
import SCANIA_P_SLEEPER_SEMI_4x2_IMG from './../../assets/equipmentModels/SCANIA_P_SLEEPER_SEMI_4x2.png';
import SCANIA_P_SLEEPER_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_P_SLEEPER_SEMI_6x2.png';
import SCANIA_P_SLEEPER_TANDEM_4x2_IMG from './../../assets/equipmentModels/SCANIA_P_SLEEPER_TANDEM_4x2.png';
import SCANIA_P_SLEEPER_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_P_SLEEPER_TANDEM_6x2.png';
import SCANIA_P_SLEEPER_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_P_SLEEPER_TANDEM_8x4.png';
import SCANIA_R_DAYCAB_SEMI_4x2_IMG from './../../assets/equipmentModels/SCANIA_R_DAYCAB_SEMI_4x2.png';
import SCANIA_R_DAYCAB_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_R_DAYCAB_SEMI_6x2.png';
import SCANIA_R_DAYCAB_TANDEM_4x2_IMG from './../../assets/equipmentModels/SCANIA_R_DAYCAB_TANDEM_4x2.png';
import SCANIA_R_DAYCAB_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_R_DAYCAB_TANDEM_6x2.png';
import SCANIA_R_DAYCAB_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_R_DAYCAB_TANDEM_8x4.png';
import SCANIA_R_PRT1_4x2_IMG from './../../assets/equipmentModels/SCANIA_R_PRT1_4x2.png';
import SCANIA_R_PRT1_6x2_IMG from './../../assets/equipmentModels/SCANIA_R_PRT1_6x2.png';
import SCANIA_R_SLEEPER_SEMI_4x2_IMG from './../../assets/equipmentModels/SCANIA_R_SLEEPER_SEMI_4x2.png';
import SCANIA_R_SLEEPER_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_R_SLEEPER_SEMI_6x2.png';
import SCANIA_R_SLEEPER_TANDEM_4x2_IMG from './../../assets/equipmentModels/SCANIA_R_SLEEPER_TANDEM_4x2.png';
import SCANIA_R_SLEEPER_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_R_SLEEPER_TANDEM_6x2.png';
import SCANIA_R_SLEEPER_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_R_SLEEPER_TANDEM_8x4.png';
import SCANIA_S_SEMI_4x2_IMG from './../../assets/equipmentModels/SCANIA_S_SEMI_4x2.png';
import SCANIA_S_SEMI_6x2_IMG from './../../assets/equipmentModels/SCANIA_S_SEMI_6x2.png';
import SCANIA_S_TANDEM_4x2_IMG from './../../assets/equipmentModels/SCANIA_S_TANDEM_4x2.png';
import SCANIA_S_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCANIA_S_TANDEM_6x2.png';
import SCANIA_S_TANDEM_8x4_IMG from './../../assets/equipmentModels/SCANIA_S_TANDEM_8x4.png';
import SCHMITZ_CARGOBULL_SEMI_REEFER_IMG from './../../assets/equipmentModels/SCHMITZ_CARGOBULL_SEMI_REEFER.png';
import SCHMITZ_CARGOBULL_TANDEM_CURTAIN_IMG from './../../assets/equipmentModels/SCHMITZ_CARGOBULL_TANDEM_CURTAIN.png';
import SCHWARZMUELLER_FLATBED_3_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_FLATBED_3.png';
import SCHWARZMUELLER_FLATBED_3_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_FLATBED_3_1.png';
import SCHWARZMUELLER_FLATBED_3_2_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_FLATBED_3_2.png';
import SCHWARZMUELLER_FLATBED_TANDEM_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_FLATBED_TANDEM.png';
import SCHWARZMUELLER_FLATBED_TANDEM_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_FLATBED_TANDEM_1.png';
import SCHWARZMUELLER_FLATBED_TANDEM_2_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_FLATBED_TANDEM_2.png';
import SCHWARZMUELLER_FLATBED_TANDEM_3_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_FLATBED_TANDEM_3.png';
import SCHWARZMUELLER_FLATBED_TANDEM_4_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_FLATBED_TANDEM_4.png';
import SCHWARZMUELLER_FLATBED_TANDEM_5_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_FLATBED_TANDEM_5.png';
import SCHWARZMUELLER_FLATBED_TANDEM_6_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_FLATBED_TANDEM_6.png';
import SCHWARZMUELLER_SEMI_REEFER_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_REEFER.png';
import SCHWARZMUELLER_SEMI_TIPPER_2_ALU_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TIPPER_2_ALU.png';
import SCHWARZMUELLER_SEMI_TIPPER_2_ALU_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TIPPER_2_ALU_1.png';
import SCHWARZMUELLER_SEMI_TIPPER_2_STEEL_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TIPPER_2_STEEL.png';
import SCHWARZMUELLER_SEMI_TIPPER_2_STEEL_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TIPPER_2_STEEL_1.png';
import SCHWARZMUELLER_SEMI_TIPPER_3_ALU_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TIPPER_3_ALU.png';
import SCHWARZMUELLER_SEMI_TIPPER_3_STEEL_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TIPPER_3_STEEL.png';
import SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU.png';
import SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU_1.png';
import SCHWARZMUELLER_SEMI_TRAILER_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER.png';
import SCHWARZMUELLER_SEMI_TRAILER_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_1.png';
import SCHWARZMUELLER_SEMI_TRAILER_JUMBO_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_JUMBO.png';
import SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL.png';
import SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL_1.png';
import SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK.png';
import SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_1.png';
import SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_2_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_2.png';
import SCHWARZMUELLER_SEMI_TRAILER_STANDARD_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_STANDARD.png';
import SCHWARZMUELLER_SEMI_TRAILER_STANDARD_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_STANDARD_1.png';
import SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT.png';
import SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_1.png';
import SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_2_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_2.png';
import SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_3_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_3.png';
import SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA.png';
import SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA_1.png';
import SCHWARZMUELLER_TANDEM_4x2_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_4x2.png';
import SCHWARZMUELLER_TANDEM_6x2_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_6x2.png';
import SCHWARZMUELLER_TANDEM_TIPPER_2A_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_TIPPER_2A.png';
import SCHWARZMUELLER_TANDEM_TIPPER_2A_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_TIPPER_2A_1.png';
import SCHWARZMUELLER_TANDEM_TIPPER_3A_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_TIPPER_3A.png';
import SCHWARZMUELLER_TANDEM_TIPPER_3A_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_TIPPER_3A_1.png';
import SCHWARZMUELLER_TANDEM_TIPPER_3A_ALU_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_TIPPER_3A_ALU.png';
import SCHWARZMUELLER_TANDEM_TIPPER_4A_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_TIPPER_4A.png';
import SCHWARZMUELLER_TANDEM_TIPPER_4A_STEEL_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_TIPPER_4A_STEEL.png';
import SCHWARZMUELLER_TANDEM_TRUCK_2A_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_TRUCK_2A.png';
import SCHWARZMUELLER_TANDEM_TRUCK_2A_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_TRUCK_2A_1.png';
import SCHWARZMUELLER_TANDEM_TRUCK_3A_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_TRUCK_3A.png';
import SCHWARZMUELLER_TANDEM_TRUCK_MEDIUM_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANDEM_TRUCK_MEDIUM.png';
import SCHWARZMUELLER_TANK_SEMI_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANK_SEMI.png';
import SCHWARZMUELLER_TANK_SEMI_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANK_SEMI_1.png';
import SCHWARZMUELLER_TANK_SEMI_2_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANK_SEMI_2.png';
import SCHWARZMUELLER_TANK_TANDEM_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANK_TANDEM.png';
import SCHWARZMUELLER_TANK_TANDEM_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANK_TANDEM_1.png';
import SCHWARZMUELLER_TANK_TANDEM_2_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANK_TANDEM_2.png';
import SCHWARZMUELLER_TANK_TANDEM_3_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANK_TANDEM_3.png';
import SCHWARZMUELLER_TANK_TANDEM_TRUCK_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANK_TANDEM_TRUCK.png';
import SCHWARZMUELLER_TANK_TANDEM_TRUCK_1_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANK_TANDEM_TRUCK_1.png';
import SCHWARZMUELLER_TANK_TANDEM_TRUCK_2_IMG from './../../assets/equipmentModels/SCHWARZMUELLER_TANK_TANDEM_TRUCK_2.png';
import SDC_BOXVAN_ALU_IMG from './../../assets/equipmentModels/SDC_BOXVAN_ALU.png';
import SDC_BOXVAN_DOUBLE_DECK_IMG from './../../assets/equipmentModels/SDC_BOXVAN_DOUBLE_DECK.png';
import SDC_BOXVAN_GRP_IMG from './../../assets/equipmentModels/SDC_BOXVAN_GRP.png';
import SDC_BOXVAN_URBAN_IMG from './../../assets/equipmentModels/SDC_BOXVAN_URBAN.png';
import SDC_CURTAIN_IMG from './../../assets/equipmentModels/SDC_CURTAIN.png';
import SDC_CURTAIN_CHIPLINER_IMG from './../../assets/equipmentModels/SDC_CURTAIN_CHIPLINER.png';
import SDC_CURTAIN_COILWELL_IMG from './../../assets/equipmentModels/SDC_CURTAIN_COILWELL.png';
import SDC_CURTAIN_DOUBLE_DECK_IMG from './../../assets/equipmentModels/SDC_CURTAIN_DOUBLE_DECK.png';
import SDC_CURTAIN_EUROLINER_IMG from './../../assets/equipmentModels/SDC_CURTAIN_EUROLINER.png';
import SDC_CURTAIN_INSULINER_IMG from './../../assets/equipmentModels/SDC_CURTAIN_INSULINER.png';
import SDC_CURTAIN_MEGA_IMG from './../../assets/equipmentModels/SDC_CURTAIN_MEGA.png';
import SDC_CURTAIN_URBAN_IMG from './../../assets/equipmentModels/SDC_CURTAIN_URBAN.png';
import SDC_PLATFORM_IMG from './../../assets/equipmentModels/SDC_PLATFORM.png';
import SDC_PLATFORM_EXTENDABLE_IMG from './../../assets/equipmentModels/SDC_PLATFORM_EXTENDABLE.png';
import SDC_PLATFORM_OIL_SPEC_IMG from './../../assets/equipmentModels/SDC_PLATFORM_OIL_SPEC.png';
import SDC_PLATFORM_PSK_IMG from './../../assets/equipmentModels/SDC_PLATFORM_PSK.png';
import SDC_PLATFORM_STEP_FRAME_IMG from './../../assets/equipmentModels/SDC_PLATFORM_STEP_FRAME.png';
import SDC_SKELETAL_EXTANDABLE_IMG from './../../assets/equipmentModels/SDC_SKELETAL_EXTANDABLE.png';
import SDC_SKELETAL_FIXED_IMG from './../../assets/equipmentModels/SDC_SKELETAL_FIXED.png';
import SDC_SKELETAL_FIXED_GOOSENECK_IMG from './../../assets/equipmentModels/SDC_SKELETAL_FIXED_GOOSENECK.png';
import SDC_SKELETAL_GOOSENECK_EXTENDING_IMG from './../../assets/equipmentModels/SDC_SKELETAL_GOOSENECK_EXTENDING.png';
import SDC_SKELETAL_ISO_TANK_IMG from './../../assets/equipmentModels/SDC_SKELETAL_ISO_TANK.png';
import SDC_SKELETAL_TIPPING_IMG from './../../assets/equipmentModels/SDC_SKELETAL_TIPPING.png';
import STAS_TIPPER_AGGREGATE_STAR_IMG from './../../assets/equipmentModels/STAS_TIPPER_AGGREGATE_STAR.png';
import STAS_TIPPER_BUILD_STARX_IMG from './../../assets/equipmentModels/STAS_TIPPER_BUILD_STARX.png';
import STAS_TIPPER_ROCK_STAR_IMG from './../../assets/equipmentModels/STAS_TIPPER_ROCK_STAR.png';
import STAS_TIPPER_U_ROCKSTAR_IMG from './../../assets/equipmentModels/STAS_TIPPER_U_ROCKSTAR.png';
import STOUGHTON_TRAILERS_CHASSIS_IMG from './../../assets/equipmentModels/STOUGHTON_TRAILERS_CHASSIS.png';
import STOUGHTON_TRAILERS_REEFER_PUREBLUE_IMG from './../../assets/equipmentModels/STOUGHTON_TRAILERS_REEFER_PUREBLUE.png';
import STOUGHTON_TRAILERS_SEMI_TRAILER_EXTRA_WIDE_IMG from './../../assets/equipmentModels/STOUGHTON_TRAILERS_SEMI_TRAILER_EXTRA_WIDE.png';
import STOUGHTON_TRAILERS_SEMI_TRAILER_TOUGH_PLATE_IMG from './../../assets/equipmentModels/STOUGHTON_TRAILERS_SEMI_TRAILER_TOUGH_PLATE.png';
import STOUGHTON_TRAILERS_SEMI_TRAILER_Z_PLATE_IMG from './../../assets/equipmentModels/STOUGHTON_TRAILERS_SEMI_TRAILER_Z_PLATE.png';
import STRICK_TRAILERS_SEMI_TRAILER_COMPOSITE_IMG from './../../assets/equipmentModels/STRICK_TRAILERS_SEMI_TRAILER_COMPOSITE.png';
import STRICK_TRAILERS_SEMI_TRAILER_SHEET_POST_IMG from './../../assets/equipmentModels/STRICK_TRAILERS_SEMI_TRAILER_SHEET_POST.png';
import STRICK_TRAILERS_TANDEM_4x2_IMG from './../../assets/equipmentModels/STRICK_TRAILERS_TANDEM_4x2.png';
import TATA_1821_TANDEM_6x2_IMG from './../../assets/equipmentModels/TATA_1821_TANDEM_6x2.png';
import TATA_1918T_TANDEM_4x2_IMG from './../../assets/equipmentModels/TATA_1918T_TANDEM_4x2.png';
import TATA_1923_TANDEM_TIPPER_4x2_IMG from './../../assets/equipmentModels/TATA_1923_TANDEM_TIPPER_4x2.png';
import TATA_2818_TANDEM_6x2_IMG from './../../assets/equipmentModels/TATA_2818_TANDEM_6x2.png';
import TATA_2823_TANDEM_TIPPER_6x2_IMG from './../../assets/equipmentModels/TATA_2823_TANDEM_TIPPER_6x2.png';
import TATA_2825_TANDEM_TIPPER_6x2_IMG from './../../assets/equipmentModels/TATA_2825_TANDEM_TIPPER_6x2.png';
import TATA_3518_TANDEM_8x4_IMG from './../../assets/equipmentModels/TATA_3518_TANDEM_8x4.png';
import TATA_3521_TANDEM_8x4_IMG from './../../assets/equipmentModels/TATA_3521_TANDEM_8x4.png';
import TATA_4018_SEMI_4x2_IMG from './../../assets/equipmentModels/TATA_4018_SEMI_4x2.png';
import TATA_4625_SEMI_4x2_IMG from './../../assets/equipmentModels/TATA_4625_SEMI_4x2.png';
import TATA_5530_SEMI_6x2_IMG from './../../assets/equipmentModels/TATA_5530_SEMI_6x2.png';
import TRAIL_KING_TIPPER_IMG from './../../assets/equipmentModels/TRAIL_KING_TIPPER.png';
import TRAIL_KING_TIPPER_1_IMG from './../../assets/equipmentModels/TRAIL_KING_TIPPER_1.png';
import TRANSCRAFT_FLATBED_COMBO_IMG from './../../assets/equipmentModels/TRANSCRAFT_FLATBED_COMBO.png';
import TRANSCRAFT_FLATBED_DROP_DECK_COMBO_IMG from './../../assets/equipmentModels/TRANSCRAFT_FLATBED_DROP_DECK_COMBO.png';
import TRANSCRAFT_FLATBED_DROP_DECK_STEEL_IMG from './../../assets/equipmentModels/TRANSCRAFT_FLATBED_DROP_DECK_STEEL.png';
import TRANSCRAFT_FLATBED_STEEL_IMG from './../../assets/equipmentModels/TRANSCRAFT_FLATBED_STEEL.png';
import UTM_FLATBED_4000AE_IMG from './../../assets/equipmentModels/UTM_FLATBED_4000AE.png';
import UTM_FLATBED_4000AE_DROP_DECK_IMG from './../../assets/equipmentModels/UTM_FLATBED_4000AE_DROP_DECK.png';
import UTM_FLATBED_DROP_DECK_IMG from './../../assets/equipmentModels/UTM_FLATBED_DROP_DECK.png';
import UTM_TRAILER_3000R_IMG from './../../assets/equipmentModels/UTM_TRAILER_3000R.png';
import UTM_TRAILER_3000R_MULTI_TEMP_IMG from './../../assets/equipmentModels/UTM_TRAILER_3000R_MULTI_TEMP.png';
import UTM_TRAILER_4000D_IMG from './../../assets/equipmentModels/UTM_TRAILER_4000D.png';
import UTM_TRAILER_4000D_X_COMPOSITE_IMG from './../../assets/equipmentModels/UTM_TRAILER_4000D_X_COMPOSITE.png';
import UTM_TRAILER_4000D_X_COMPOSITE_100_IMG from './../../assets/equipmentModels/UTM_TRAILER_4000D_X_COMPOSITE_100.png';
import UTM_TRAILER_4000D_X_COMPOSITE_TBR_IMG from './../../assets/equipmentModels/UTM_TRAILER_4000D_X_COMPOSITE_TBR.png';
import UTM_TRAILER_TAUTLINER_IMG from './../../assets/equipmentModels/UTM_TRAILER_TAUTLINER.png';
import VANGUARD_CIE_20_40_CITYCOMBO_WS_TANDEM_IMG from './../../assets/equipmentModels/VANGUARD_CIE_20_40_CITYCOMBO_WS_TANDEM.png';
import VANGUARD_CIE_20_40_SL_COMBO_TANDEM_WS_IMG from './../../assets/equipmentModels/VANGUARD_CIE_20_40_SL_COMBO_TANDEM_WS.png';
import VANGUARD_CIE_20_40_SL_COMBO_TRIDEM_IMG from './../../assets/equipmentModels/VANGUARD_CIE_20_40_SL_COMBO_TRIDEM.png';
import VANGUARD_CIE_23_5_TANDEM_IMG from './../../assets/equipmentModels/VANGUARD_CIE_23_5_TANDEM.png';
import VANGUARD_CIE_33_LIGHTWEIGHT_TRIDEM_IMG from './../../assets/equipmentModels/VANGUARD_CIE_33_LIGHTWEIGHT_TRIDEM.png';
import VANGUARD_CIE_33_SLIDER_TRIDEM_IMG from './../../assets/equipmentModels/VANGUARD_CIE_33_SLIDER_TRIDEM.png';
import VANGUARD_CIE_40_45_EXTANDABLE_IMG from './../../assets/equipmentModels/VANGUARD_CIE_40_45_EXTANDABLE.png';
import VANGUARD_CIE_40_53_EXTENDABLE_TRIDEM_IMG from './../../assets/equipmentModels/VANGUARD_CIE_40_53_EXTENDABLE_TRIDEM.png';
import VANGUARD_CIE_40_GOOSENECK_LIGHTWEIGHT_IMG from './../../assets/equipmentModels/VANGUARD_CIE_40_GOOSENECK_LIGHTWEIGHT.png';
import VANGUARD_CIE_40_GOOSENECK_TANDEM_IMG from './../../assets/equipmentModels/VANGUARD_CIE_40_GOOSENECK_TANDEM.png';
import VANGUARD_CIE_40_GOOSENECK_TRIDEM_IMG from './../../assets/equipmentModels/VANGUARD_CIE_40_GOOSENECK_TRIDEM.png';
import VANGUARD_CIE_43_DROP_FRAME_IMG from './../../assets/equipmentModels/VANGUARD_CIE_43_DROP_FRAME.png';
import VANGUARD_CIE_53_GOOSENECK_IMG from './../../assets/equipmentModels/VANGUARD_CIE_53_GOOSENECK.png';
import VANGUARD_MAXCUBE_IMG from './../../assets/equipmentModels/VANGUARD_MAXCUBE.png';
import VANGUARD_REEFER_IMG from './../../assets/equipmentModels/VANGUARD_REEFER.png';
import VANGUARD_VAF_IMG from './../../assets/equipmentModels/VANGUARD_VAF.png';
import VANGUARD_VIP_4000_IMG from './../../assets/equipmentModels/VANGUARD_VIP_4000.png';
import VANGUARD_VSF_IMG from './../../assets/equipmentModels/VANGUARD_VSF.png';
import VANGUARD_VXP_IMG from './../../assets/equipmentModels/VANGUARD_VXP.png';
import VOLKSWAGEN_CONSTELLATION_15190_ROBUST_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_15190_ROBUST.png';
import VOLKSWAGEN_CONSTELLATION_17190_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_17190.png';
import VOLKSWAGEN_CONSTELLATION_17230_ROBUST_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_17230_ROBUST.png';
import VOLKSWAGEN_CONSTELLATION_17280_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_17280.png';
import VOLKSWAGEN_CONSTELLATION_17280_TRACTOR_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_17280_TRACTOR.png';
import VOLKSWAGEN_CONSTELLATION_19330_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_19330.png';
import VOLKSWAGEN_CONSTELLATION_19360_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_19360.png';
import VOLKSWAGEN_CONSTELLATION_19420_VTRONIC_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_19420_VTRONIC.png';
import VOLKSWAGEN_CONSTELLATION_25360_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_25360.png';
import VOLKSWAGEN_CONSTELLATION_25420_VTRONIC_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_25420_VTRONIC.png';
import VOLKSWAGEN_CONSTELLATION_26280_6x4_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_26280_6x4.png';
import VOLKSWAGEN_CONSTELLATION_26420_VTRONIC_6x4_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_26420_VTRONIC_6x4.png';
import VOLKSWAGEN_CONSTELLATION_31280_6x4_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_31280_6x4.png';
import VOLKSWAGEN_CONSTELLATION_31330_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CONSTELLATION_31330.png';
import VOLKSWAGEN_CRAFTER_FRAME_L3_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CRAFTER_FRAME_L3.png';
import VOLKSWAGEN_CRAFTER_FRAME_L4_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CRAFTER_FRAME_L4.png';
import VOLKSWAGEN_CRAFTER_FRAME_L5_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CRAFTER_FRAME_L5.png';
import VOLKSWAGEN_CRAFTER_L3H3_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CRAFTER_L3H3.png';
import VOLKSWAGEN_CRAFTER_L4H3_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CRAFTER_L4H3.png';
import VOLKSWAGEN_CRAFTER_L5H3_IMG from './../../assets/equipmentModels/VOLKSWAGEN_CRAFTER_L5H3.png';
import VOLKSWAGEN_DELIVERY_6160_IMG from './../../assets/equipmentModels/VOLKSWAGEN_DELIVERY_6160.png';
import VOLKSWAGEN_DELIVERY_9170_IMG from './../../assets/equipmentModels/VOLKSWAGEN_DELIVERY_9170.png';
import VOLKSWAGEN_DELIVERY_11180_IMG from './../../assets/equipmentModels/VOLKSWAGEN_DELIVERY_11180.png';
import VOLKSWAGEN_TRANSPORTER_L1_IMG from './../../assets/equipmentModels/VOLKSWAGEN_TRANSPORTER_L1.png';
import VOLKSWAGEN_TRANSPORTER_L2_IMG from './../../assets/equipmentModels/VOLKSWAGEN_TRANSPORTER_L2.png';
import VOLVO_FH_2_4x2_IMG from './../../assets/equipmentModels/VOLVO_FH_2_4x2.png';
import VOLVO_FH_2_6x2_IMG from './../../assets/equipmentModels/VOLVO_FH_2_6x2.png';
import VOLVO_FH_3_4x2_IMG from './../../assets/equipmentModels/VOLVO_FH_3_4x2.png';
import VOLVO_FH_3_6x2_IMG from './../../assets/equipmentModels/VOLVO_FH_3_6x2.png';
import VOLVO_FH_4_IMG from './../../assets/equipmentModels/VOLVO_FH_4.png';
import VOLVO_FMX_IMG from './../../assets/equipmentModels/VOLVO_FMX.png';
import VOLVO_VNL_300_4x2_IMG from './../../assets/equipmentModels/VOLVO_VNL_300_4x2.png';
import VOLVO_VNL_300_6x2_IMG from './../../assets/equipmentModels/VOLVO_VNL_300_6x2.png';
import VOLVO_VNL_400_IMG from './../../assets/equipmentModels/VOLVO_VNL_400.png';
import VOLVO_VNL_740_6x2_IMG from './../../assets/equipmentModels/VOLVO_VNL_740_6x2.png';
import VOLVO_VNL_760_IMG from './../../assets/equipmentModels/VOLVO_VNL_760.png';
import VOLVO_VNL_860_IMG from './../../assets/equipmentModels/VOLVO_VNL_860.png';
import VOLVO_VNR_300_4x2_IMG from './../../assets/equipmentModels/VOLVO_VNR_300_4x2.png';
import VOLVO_VNR_300_6x2_IMG from './../../assets/equipmentModels/VOLVO_VNR_300_6x2.png';
import VOLVO_VNR_400_IMG from './../../assets/equipmentModels/VOLVO_VNR_400.png';
import VOLVO_VNR_640_IMG from './../../assets/equipmentModels/VOLVO_VNR_640.png';
import WABASH_FLATBED_ALU_IMG from './../../assets/equipmentModels/WABASH_FLATBED_ALU.png';
import WABASH_FLATBED_ALU_DROP_DECK_IMG from './../../assets/equipmentModels/WABASH_FLATBED_ALU_DROP_DECK.png';
import WABASH_REEFER_ARCTIC_LITE_IMG from './../../assets/equipmentModels/WABASH_REEFER_ARCTIC_LITE.png';
import WABASH_REEFER_MSC_IMG from './../../assets/equipmentModels/WABASH_REEFER_MSC.png';
import WABASH_TANK_3A_SANITARY_IMG from './../../assets/equipmentModels/WABASH_TANK_3A_SANITARY.png';
import WABASH_TANK_ALU_DRY_BULK_IMG from './../../assets/equipmentModels/WABASH_TANK_ALU_DRY_BULK.png';
import WABASH_TANK_ALU_PETROLEUM_IMG from './../../assets/equipmentModels/WABASH_TANK_ALU_PETROLEUM.png';
import WABASH_TANK_DEF_IMG from './../../assets/equipmentModels/WABASH_TANK_DEF.png';
import WABASH_TANK_FOOD_IMG from './../../assets/equipmentModels/WABASH_TANK_FOOD.png';
import WABASH_TRAILER_DURAPLATE_IMG from './../../assets/equipmentModels/WABASH_TRAILER_DURAPLATE.png';
import WABASH_TRAILER_DURAPLATE_HD_IMG from './../../assets/equipmentModels/WABASH_TRAILER_DURAPLATE_HD.png';
import WESTERN_STAR_TRUCKS_5700_FE_IMG from './../../assets/equipmentModels/WESTERN_STAR_TRUCKS_5700_FE.png';
import WESTERN_STAR_TRUCKS_5800_FE_IMG from './../../assets/equipmentModels/WESTERN_STAR_TRUCKS_5800_FE.png';

export const EEquipmentPartType = {
  AXLES: 'AXLES',
  BODY: 'BODY',
  ELECTRIC: 'ELECTRIC',
  LOAD: 'LOAD',
  MECHANICAL: 'MECHANICAL'
};

/**
 * Enum: EEquipmentPart
 * Part of an equipment
 */
export const EEquipmentPart = Object.freeze({
  BATTERY: 'BATTERY',
  BODY: 'BODY',
  BRAKES: 'BRAKES',
  COMPRESSOR: 'COMPRESSOR',
  DOORS: 'DOORS',
  ELECTRONIC: 'ELECTRONIC',
  ENGINE: 'ENGINE',
  EXHAUST: 'EXHAUST',
  FIFTH_WHEEL: 'FIFTH_WHEEL',
  FRAME: 'FRAME',
  FRIGO: 'FRIGO',
  FUEL: 'FUEL',
  GEARBOX: 'GEARBOX',
  HYDRAULIC: 'HYDRAULIC',
  INTERIOR: 'INTERIOR',
  LIGHTS: 'LIGHTS',
  LOAD: 'LOAD',
  RAMP: 'RAMP',
  SUPPORT: 'SUPPORT',
  SUSPENSION: 'SUSPENSION',
  TRAILER_ATTACHMENT: 'TRAILER_ATTACHMENT',
  WHEELS: 'WHEELS',
  WINCH: 'WINCH'
});

/**
 * Enum: EEquipmentModelType
 * Type of the equipment
 */
export const EEquipmentModelType = Object.freeze({
  // Truck / Semi truck tractor
  SEMI_TRUCK: 'SEMI_TRUCK',

  // Motorized part of a tamdem truck
  TANDEM: 'TANDEM',

  // Trailer of a semi
  SEMI_TRAILER: 'SEMI_TRAILER',

  // Trailer of a tandem
  TANDEM_TRAILER: 'TANDEM_TRAILER',

  // Van
  VAN: 'VAN',

  // Other
  TOOL: 'TOOL'
});

const EEquipmentModel = {
  ASTRA_HD9_RIGID: 'ASTRA_HD9_RIGID',
  ASTRA_HD9_TRACTOR: 'ASTRA_HD9_TRACTOR',
  ASTRA_HHD9_RIGID: 'ASTRA_HHD9_RIGID',
  ASTRA_HHD9_TRACTOR: 'ASTRA_HHD9_TRACTOR',
  CHEETAH_CONTAINER_20_40_MAXIMIZER_12_PIN: 'CHEETAH_CONTAINER_20_40_MAXIMIZER_12_PIN',
  CHEETAH_FLATBED: 'CHEETAH_FLATBED',
  CHEETAH_CONTAINER_GOOSENECK_41_45: 'CHEETAH_CONTAINER_GOOSENECK_41_45',
  CHEETAH_CONTAINER_20_40_SPREAD_CITY: 'CHEETAH_CONTAINER_20_40_SPREAD_CITY',
  CITROEN_JUMPER_L2H2: 'CITROEN_JUMPER_L2H2',
  CITROEN_JUMPER_L1H1_FRAME: 'CITROEN_JUMPER_L1H1_FRAME',
  CONTRAL_CDU_53_CONTAINER: 'CONTRAL_CDU_53_CONTAINER',
  DAF_CF_6x2: 'DAF_CF_6x2',
  DAF_LF_TANDEM_4x2: 'DAF_LF_TANDEM_4x2',
  DAF_XF_105_4x2: 'DAF_XF_105_4x2',
  DAF_XF_105_6x2: 'DAF_XF_105_6x2',
  DAF_XF_106_4x2: 'DAF_XF_106_4x2',
  DAF_XF_106_6x2: 'DAF_XF_106_6x2',
  DAF_XF_106_8x4: 'DAF_XF_106_8x4',
  DOEPKER_55T_SINGLE_DROP_LOWBED: 'DOEPKER_55T_SINGLE_DROP_LOWBED',
  DOONAN_DOUBLE_DROP_LOWBED: 'DOONAN_DOUBLE_DROP_LOWBED',
  DOONAN_FLATBED_CHAP_1_1: 'DOONAN_FLATBED_CHAP_1_1',
  DOONAN_FIXED_DOUBLE_DROP_LOWBED: 'DOONAN_FIXED_DOUBLE_DROP_LOWBED',
  DORSEY_FLATBED_ALUMINIUM_GIANT: 'DORSEY_FLATBED_ALUMINIUM_GIANT',
  DORSEY_FLATBED_STEEL_GIANT: 'DORSEY_FLATBED_STEEL_GIANT',
  EAST_FLATBED_BEAST: 'EAST_FLATBED_BEAST',
  EAST_FLATBED_BEAST_2: 'EAST_FLATBED_BEAST_2',
  EAST_LOWBED_BEAST_DROP_DECK: 'EAST_LOWBED_BEAST_DROP_DECK',
  EAST_STEEL_DUMP: 'EAST_STEEL_DUMP',
  FELLING_FLATBED: 'FELLING_FLATBED',
  FELLING_LOWBED: 'FELLING_LOWBED',
  FERREE_LTV35_LOWBED: 'FERREE_LTV35_LOWBED',
  FERREE_LTV51_LOWBED: 'FERREE_LTV51_LOWBED',
  FERREE_LTTV51DS_LOWBED: 'FERREE_LTTV51DS_LOWBED',
  FERREE_LTTV55_LOWBED: 'FERREE_LTTV55_LOWBED',
  FIAT_DUCATO_L2H2: 'FIAT_DUCATO_L2H2',
  FONTAINE_INFINITY_TOP_FLATBED: 'FONTAINE_INFINITY_TOP_FLATBED',
  FONTAINE_VELOCITY_TOP_FLATBED: 'FONTAINE_VELOCITY_TOP_FLATBED',
  FONTAINE_MAGNITUDE_51: 'FONTAINE_MAGNITUDE_51',
  FONTAINE_MAGNITUDE_55H_FLD: 'FONTAINE_MAGNITUDE_55H_FLD',
  FONTAINE_MAGNITUDE_55H_DSR: 'FONTAINE_MAGNITUDE_55H_DSR',
  FONTAINE_MAGNITUDE_55L: 'FONTAINE_MAGNITUDE_55L',
  FONTAINE_MAGNITUDE_55L_PLUS: 'FONTAINE_MAGNITUDE_55L_PLUS',
  FONTAINE_MAGNITUDE_55H_MFLD: 'FONTAINE_MAGNITUDE_55H_MFLD',
  FONTAINE_MAGNITUDE_55H_MDSR: 'FONTAINE_MAGNITUDE_55H_MDSR',
  FONTAINE_MAGNITUDE_55H_MBMD: 'FONTAINE_MAGNITUDE_55H_MBMD',
  FONTAINE_MAGNITUDE_55H_MX: 'FONTAINE_MAGNITUDE_55H_MX',
  FONTAINE_RENEGADE_LXL: 'FONTAINE_RENEGADE_LXL',
  FONTAINE_RENEGADE_LX40: 'FONTAINE_RENEGADE_LX40',
  FONTAINE_RENEGADE_LXT40: 'FONTAINE_RENEGADE_LXT40',
  FONTAINE_RENEGADE_LX40C: 'FONTAINE_RENEGADE_LX40C',
  FONTAINE_RENEGADE_LXT40C: 'FONTAINE_RENEGADE_LXT40C',
  FONTAINE_RENEGADE_LXLN12: 'FONTAINE_RENEGADE_LXLN12',
  FONTAINE_RENEGADE_LXLN14: 'FONTAINE_RENEGADE_LXLN14',
  FONTAINE_RENEGADE_LXN40: 'FONTAINE_RENEGADE_LXN40',
  FONTAINE_RENEGADE_LXTN40: 'FONTAINE_RENEGADE_LXTN40',
  FORD_FMAX: 'FORD_FMAX',
  FORD_TRANSIT_L2H2: 'FORD_TRANSIT_L2H2',
  FORD_TRANSIT_L1H1_FRAME: 'FORD_TRANSIT_L1H1_FRAME',
  FORD_1842T: 'FORD_1842T',
  FORD_1833: 'FORD_1833',
  FORD_4142D: 'FORD_4142D',
  FREIGHTLINER_CASCADIA_DAY: 'FREIGHTLINER_CASCADIA_DAY',
  FREIGHTLINER_CASCADIA_SLEEPER: 'FREIGHTLINER_CASCADIA_SLEEPER',
  FREIGHTLINER_M2_106: 'FREIGHTLINER_M2_106',
  FREIGHTLINER_M2_112: 'FREIGHTLINER_M2_112',
  FREIGHTLINER_114SD: 'FREIGHTLINER_114SD',
  FREIGHTLINER_122SD: 'FREIGHTLINER_122SD',
  FUSO_CANTER_L1_FRAME: 'FUSO_CANTER_L1_FRAME',
  FUSO_CANTER_L1_TIPPER: 'FUSO_CANTER_L1_TIPPER',
  FUSO_SHOGUN_6x4: 'FUSO_SHOGUN_6x4',
  FUSO_SHOGUN_8x4: 'FUSO_SHOGUN_8x4',
  FUSO_FIGHTER_6x4: 'FUSO_FIGHTER_6x4',
  GOLDHOFER_TU: 'GOLDHOFER_TU',
  GOLDHOFER_TN_L: 'GOLDHOFER_TN_L',
  GREAT_DANE_EVEREST_SINGLE_TEMP: 'GREAT_DANE_EVEREST_SINGLE_TEMP',
  GREAT_DANE_EVEREST_MULTI_TEMP: 'GREAT_DANE_EVEREST_MULTI_TEMP',
  GREAT_DANE_ALPINE: 'GREAT_DANE_ALPINE',
  GREAT_DANE_CHAMPION_SP2: 'GREAT_DANE_CHAMPION_SP2',
  GREAT_DANE_CHAMPION_CP: 'GREAT_DANE_CHAMPION_CP',
  GREAT_DANE_SAHARA_S: 'GREAT_DANE_SAHARA_S',
  GREAT_DANE_SAHARA_C: 'GREAT_DANE_SAHARA_C',
  GREAT_DANE_FREEDOM_LT: 'GREAT_DANE_FREEDOM_LT',
  GREAT_DANE_FREEDOM_SE: 'GREAT_DANE_FREEDOM_SE',
  GREAT_DANE_FREEDOM_XP: 'GREAT_DANE_FREEDOM_XP',
  HEIL_STANDARD_DUTY_9500_LTD_D4: 'HEIL_STANDARD_DUTY_9500_LTD_D4',
  HEIL_STANDARD_DUTY_9300_DT_S4: 'HEIL_STANDARD_DUTY_9300_DT_S4',
  HEIL_8500_E_DOUBLE_CONICAL_S1_DOT_TC407: 'HEIL_8500_E_DOUBLE_CONICAL_S1_DOT_TC407',
  HEIL_ST_7000_316L_SSSR_JS1: 'HEIL_ST_7000_316L_SSSR_JS1',
  HERCURLES_CHASSIS_CONTAINER: 'HERCURLES_CHASSIS_CONTAINER',
  HERCULES_CHASSIS_LOWBED: 'HERCULES_CHASSIS_LOWBED',
  HINO_300: 'HINO_300',
  HINO_500_4x2: 'HINO_500_4x2',
  HINO_500_6x2: 'HINO_500_6x2',
  HINO_600: 'HINO_600',
  HINO_700: 'HINO_700',
  HYUNDAI_H36L: 'HYUNDAI_H36L',
  HYUNDAI_H120: 'HYUNDAI_H120',
  HYUNDAI_HD35: 'HYUNDAI_HD35',
  HYUNDAI_HD170: 'HYUNDAI_HD170',
  HYUNDAI_PAVISE: 'HYUNDAI_PAVISE',
  HYUNDAI_XCIENT: 'HYUNDAI_XCIENT',
  ISUZU_EXR: 'ISUZU_EXR',
  ISUZU_EXZ: 'ISUZU_EXZ',
  ISUZU_FRR: 'ISUZU_FRR',
  ISUZU_FSR: 'ISUZU_FSR',
  ISUZU_FVZ: 'ISUZU_FVZ',
  ISUZU_FYH: 'ISUZU_FYH',
  ISUZU_GXZ: 'ISUZU_GXZ',
  ISUZU_NLR: 'ISUZU_NLR',
  ISUZU_NMR: 'ISUZU_NMR',
  ISUZU_NPR: 'ISUZU_NPR',
  ISUZU_NPS: 'ISUZU_NPS',
  Iveco_Stralis_4x2: 'Iveco_Stralis_4x2',
  Iveco_Stralis_6x2: 'Iveco_Stralis_6x2',
  Iveco_Stralis_Hiway_4x2: 'Iveco_Stralis_Hiway_4x2',
  Iveco_Stralis_Hiway_6x2: 'Iveco_Stralis_Hiway_6x2',
  IVECO_DAILY_L3H2: 'IVECO_DAILY_L3H2',
  IVECO_EUROCARGO: 'IVECO_EUROCARGO',
  IVECO_S_WAY: 'IVECO_S_WAY',
  IVECO_S_WAY_TANDEM: 'IVECO_S_WAY_TANDEM',
  IVECO_TRAKKER: 'IVECO_TRAKKER',
  J_J_BODIES_210_LARGE_DT: 'J_J_BODIES_210_LARGE_DT',
  J_J_BODIES_211_LARGE_DT_FTA: 'J_J_BODIES_211_LARGE_DT_FTA',
  J_J_BODIES_267_LARGE_DT_FL: 'J_J_BODIES_267_LARGE_DT_FL',
  J_J_BODIES_266_LARGE_TT_LFEVO: 'J_J_BODIES_266_LARGE_TT_LFEVO',
  J_J_BODIES_215_LARGE_TT_AT: 'J_J_BODIES_215_LARGE_TT_AT',
  J_J_BODIES_697_MH_EVO: 'J_J_BODIES_697_MH_EVO',
  KAMAZ_5490: 'KAMAZ_5490',
  KASSBOHRER_BOX_DRY_K_SBT_20_12_27: 'KASSBOHRER_BOX_DRY_K_SBT_20_12_27',
  KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AH_45_12_27: 'KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AH_45_12_27',
  KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AMH_40_12_27: 'KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AMH_40_12_27',
  KASSBOHRER_FLATBED_LIGHT_K_SFS_X_PLUS_90_12_27: 'KASSBOHRER_FLATBED_LIGHT_K_SFS_X_PLUS_90_12_27',
  KASSBOHRER_FLATBED_LIGHT_K_SPS_3_0N_12_27: 'KASSBOHRER_FLATBED_LIGHT_K_SPS_3_0N_12_27',
  KASSBOHRER_LIGHT_K_SCL_X_PLUS_150_12_27: 'KASSBOHRER_LIGHT_K_SCL_X_PLUS_150_12_27',
  KASSBOHRER_LOWBED_K_SLS_3_0N_12_27: 'KASSBOHRER_LOWBED_K_SLS_3_0N_12_27',
  KASSBOHRER_REEFER_STANDARD_K_SRI_C_10_12_27: 'KASSBOHRER_REEFER_STANDARD_K_SRI_C_10_12_27',
  KASSBOHRER_SILO_TIPPING_K_SSK_40_3_10_24: 'KASSBOHRER_SILO_TIPPING_K_SSK_40_3_10_24',
  KASSBOHRER_SILO_TIPPING_K_SSK_60_5_10_24: 'KASSBOHRER_SILO_TIPPING_K_SSK_60_5_10_24',
  KASSBOHRER_STANDARD_K_SCD_M_90_12_27: 'KASSBOHRER_STANDARD_K_SCD_M_90_12_27',
  KASSBOHRER_STANDARD_K_SCX_X_125_12_27: 'KASSBOHRER_STANDARD_K_SCX_X_125_12_27',
  KASSBOHRER_TANK_DANGEROUS_K_STB_E_39_5_11_24: 'KASSBOHRER_TANK_DANGEROUS_K_STB_E_39_5_11_24',
  KASSBOHRER_TANK_DANGEROUS_K_STS_32_1_10_24: 'KASSBOHRER_TANK_DANGEROUS_K_STS_32_1_10_24',
  KASSBOHRER_TANK_FOOD_K_STL_30_3_10_24: 'KASSBOHRER_TANK_FOOD_K_STL_30_3_10_24',
  KASSBOHRER_TIPPER_ALU_K_SKA_B_26_12_27: 'KASSBOHRER_TIPPER_ALU_K_SKA_B_26_12_27',
  KASSBOHRER_TIPPER_STEEL_K_SKS_B_24_15_18: 'KASSBOHRER_TIPPER_STEEL_K_SKS_B_24_15_18',
  KASSBOHRER_TIPPER_STEEL_K_SKS_BS_24_12_27: 'KASSBOHRER_TIPPER_STEEL_K_SKS_BS_24_12_27',
  KENTUCKY_TRAILER_53_COMPOSITE_STRAIGHT_FLOOR: 'KENTUCKY_TRAILER_53_COMPOSITE_STRAIGHT_FLOOR',
  KENTUCKY_TRAILER_BEVERAGE: 'KENTUCKY_TRAILER_BEVERAGE',
  KENTUCKY_TRAILER_MOVING: 'KENTUCKY_TRAILER_MOVING',
  KENWORTH_C500: 'KENWORTH_C500',
  KENWORTH_K270: 'KENWORTH_K270',
  KENWORTH_T660: 'KENWORTH_T660',
  KENWORTH_T800: 'KENWORTH_T800',
  KENWORTH_W900: 'KENWORTH_W900',
  KENWORTH_W990: 'KENWORTH_W990',
  KENWORTH_W990_3: 'KENWORTH_W990_3',
  KOGEL_BOX: 'KOGEL_BOX',
  KOGEL_TIPPER: 'KOGEL_TIPPER',
  KOGEL_FLATBED: 'KOGEL_FLATBED',
  KOGEL_TRAILER: 'KOGEL_TRAILER',
  KRONE_BOX_LINER: 'KRONE_BOX_LINER',
  KRONE_COOL_LINER: 'KRONE_COOL_LINER',
  KRONE_MEGA_LINER: 'KRONE_MEGA_LINER',
  LAMBERET_DAF_CF_PORTEUR: 'LAMBERET_DAF_CF_PORTEUR',
  LAMBERET_FRIGOLINE_CITY: 'LAMBERET_FRIGOLINE_CITY',
  LAMBERET_RENAULT_DCab_Frigoline_City: 'LAMBERET_RENAULT_DCab_Frigoline_City',
  LAMBERET_SR2_green_liner: 'LAMBERET_SR2_green_liner',
  LAMBERET_SR2_HD: 'LAMBERET_SR2_HD',
  LAMBERET_SR2_super_duplex: 'LAMBERET_SR2_super_duplex',
  LANDOLL_LOWBED: 'LANDOLL_LOWBED',
  LAWRENCE_DAVID_BOX_TRAILER: 'LAWRENCE_DAVID_BOX_TRAILER',
  LAWRENCE_DAVID_CURTAIN_TANDEM: 'LAWRENCE_DAVID_CURTAIN_TANDEM',
  LAWRENCE_DAVID_CURTAIN_TANDEM_2: 'LAWRENCE_DAVID_CURTAIN_TANDEM_2',
  LAWRENCE_DAVID_CURTAIN_TRAILER: 'LAWRENCE_DAVID_CURTAIN_TRAILER',
  LAWRENCE_DAVID_FLATBED_TRAILER: 'LAWRENCE_DAVID_FLATBED_TRAILER',
  LAWRENCE_DAVID_RIGID_BOX_VAN: 'LAWRENCE_DAVID_RIGID_BOX_VAN',
  MAC_TRAILER_TANK: 'MAC_TRAILER_TANK',
  MACK_ANTHEM_48_SLEEPER: 'MACK_ANTHEM_48_SLEEPER',
  MACK_ANTHEM_70_SLEEPER: 'MACK_ANTHEM_70_SLEEPER',
  MACK_ANTHEM_DAYCAB: 'MACK_ANTHEM_DAYCAB',
  MACK_GRANITE_SEMI_6x4: 'MACK_GRANITE_SEMI_6x4',
  MACK_GRANITE_TIPPER_6x4: 'MACK_GRANITE_TIPPER_6x4',
  MAN_TGE_CAB_TIPPER: 'MAN_TGE_CAB_TIPPER',
  MAN_TGE_L2H2: 'MAN_TGE_L2H2',
  MAN_TGE_TIPPER: 'MAN_TGE_TIPPER',
  MAN_TGL_TANDEM_4x2: 'MAN_TGL_TANDEM_4x2',
  MAN_TGS_4x2: 'MAN_TGS_4x2',
  MAN_TGS_4x2_TALL: 'MAN_TGS_4x2_TALL',
  MAN_TGS_TANDEM_4x2: 'MAN_TGS_TANDEM_4x2',
  MAN_TGS_TANDEM_4x2_TALL: 'MAN_TGS_TANDEM_4x2_TALL',
  MAN_TGS_TANDEM_6x4: 'MAN_TGS_TANDEM_6x4',
  MAN_TGS_TANDEM_6x4_TALL: 'MAN_TGS_TANDEM_6x4_TALL',
  MAN_TGS_TANDEM_8x4: 'MAN_TGS_TANDEM_8x4',
  MAN_TGX_1_4x2: 'MAN_TGX_1_4x2',
  MAN_TGX_1_6x2: 'MAN_TGX_1_6x2',
  MAN_TGX_2_4x2: 'MAN_TGX_2_4x2',
  MAN_TGX_2_6x2: 'MAN_TGX_2_6x2',
  MAN_TGX_3_4x2: 'MAN_TGX_3_4x2',
  MAN_TGX_3_4x2_TALL: 'MAN_TGX_3_4x2_TALL',
  MAN_TGX_TANDEM_4x2: 'MAN_TGX_TANDEM_4x2',
  MAN_TGX_TANDEM_6x4: 'MAN_TGX_TANDEM_6x4',
  MAN_TGX_TANDEM_6x4_TALL: 'MAN_TGX_TANDEM_6x4_TALL',
  MAN_TGX_TANDEM_8x4: 'MAN_TGX_TANDEM_8x4',
  MANAC_ALU_TIPPER: 'MANAC_ALU_TIPPER',
  MANAC_BOX: 'MANAC_BOX',
  MANAC_BOX_2: 'MANAC_BOX_2',
  MANAC_FLATBED: 'MANAC_FLATBED',
  MANAC_FLATBED_2: 'MANAC_FLATBED_2',
  MANAC_FLATBED_3: 'MANAC_FLATBED_3',
  MANAC_LOWBED: 'MANAC_LOWBED',
  MANAC_LOWBED_2: 'MANAC_LOWBED_2',
  MANAC_REEFER: 'MANAC_REEFER',
  MANAC_STEEL_TIPPER: 'MANAC_STEEL_TIPPER',
  MAXI_TRANS_Freighter_SafeTliner: 'MAXI_TRANS_Freighter_SafeTliner',
  MAXI_TRANS_Freighter_skel_2: 'MAXI_TRANS_Freighter_skel_2',
  MAXI_TRANS_Freighter_Ultra_Lo_Skel: 'MAXI_TRANS_Freighter_Ultra_Lo_Skel',
  MAXI_TRANS_HxW_semi_tipper: 'MAXI_TRANS_HxW_semi_tipper',
  MAXI_TRANS_Maxi_CUBE_Classic_2: 'MAXI_TRANS_Maxi_CUBE_Classic_2',
  MAXI_TRANS_Maxi_CUBE_DryFreight_3: 'MAXI_TRANS_Maxi_CUBE_DryFreight_3',
  MAZ_5440C: 'MAZ_5440C',
  MAZ_5440E: 'MAZ_5440E',
  MAZ_6430C: 'MAZ_6430C',
  MERCEDES_ACTROS_MP3_4x2: 'MERCEDES_ACTROS_MP3_4x2',
  MERCEDES_ACTROS_MP3_6x2: 'MERCEDES_ACTROS_MP3_6x2',
  MERCEDES_ACTROS_MP4_4x2: 'MERCEDES_ACTROS_MP4_4x2',
  MERCEDES_ACTROS_MP4_6x2: 'MERCEDES_ACTROS_MP4_6x2',
  MERCEDES_ACTROS_MP5_4x2: 'MERCEDES_ACTROS_MP5_4x2',
  MERCEDES_ACTROS_MP5_SLT: 'MERCEDES_ACTROS_MP5_SLT',
  MERCEDES_ACTROS_TANDEM_6x2: 'MERCEDES_ACTROS_TANDEM_6x2',
  MERCEDES_AROCS_4x2: 'MERCEDES_AROCS_4x2',
  MERCEDES_AROCS_8x4: 'MERCEDES_AROCS_8x4',
  MERCEDES_ATEGO_TANDEM_4x2: 'MERCEDES_ATEGO_TANDEM_4x2',
  MERCEDES_SPRINTER_FRAME: 'MERCEDES_SPRINTER_FRAME',
  MERCEDES_SPRINTER_L3H2: 'MERCEDES_SPRINTER_L3H2',
  MERCEDES_SPRINTER_TIPPER: 'MERCEDES_SPRINTER_TIPPER',
  MERCEDES_VITO_L1H1: 'MERCEDES_VITO_L1H1',
  NAVISTAR_INTERNATIONAL_DURASTAR_BOX: 'NAVISTAR_INTERNATIONAL_DURASTAR_BOX',
  NAVISTAR_INTERNATIONAL_DURASTAR_SEMI: 'NAVISTAR_INTERNATIONAL_DURASTAR_SEMI',
  NAVISTAR_INTERNATIONAL_HV_SEMI: 'NAVISTAR_INTERNATIONAL_HV_SEMI',
  NAVISTAR_INTERNATIONAL_HV_TIPPER: 'NAVISTAR_INTERNATIONAL_HV_TIPPER',
  NAVISTAR_INTERNATIONAL_HX_SEMI: 'NAVISTAR_INTERNATIONAL_HX_SEMI',
  NAVISTAR_INTERNATIONAL_HX_TIPPER: 'NAVISTAR_INTERNATIONAL_HX_TIPPER',
  NAVISTAR_INTERNATIONAL_LONESTAR_DAYCAB: 'NAVISTAR_INTERNATIONAL_LONESTAR_DAYCAB',
  NAVISTAR_INTERNATIONAL_LONESTAR_HIGH_SLEEPER: 'NAVISTAR_INTERNATIONAL_LONESTAR_HIGH_SLEEPER',
  NAVISTAR_INTERNATIONAL_LONESTAR_LOW_SLEEPER: 'NAVISTAR_INTERNATIONAL_LONESTAR_LOW_SLEEPER',
  NAVISTAR_INTERNATIONAL_LT_DAYCAB: 'NAVISTAR_INTERNATIONAL_LT_DAYCAB',
  NAVISTAR_INTERNATIONAL_LT_HIGH_SLEEPER: 'NAVISTAR_INTERNATIONAL_LT_HIGH_SLEEPER',
  NAVISTAR_INTERNATIONAL_LT_LOW_SLEEPER: 'NAVISTAR_INTERNATIONAL_LT_LOW_SLEEPER',
  NAVISTAR_INTERNATIONAL_MV_BOX: 'NAVISTAR_INTERNATIONAL_MV_BOX',
  NAVISTAR_INTERNATIONAL_MV_SEMI: 'NAVISTAR_INTERNATIONAL_MV_SEMI',
  NAVISTAR_INTERNATIONAL_MV_TIPPER: 'NAVISTAR_INTERNATIONAL_MV_TIPPER',
  NAVISTAR_INTERNATIONAL_PROSTAR_DAYCAB: 'NAVISTAR_INTERNATIONAL_PROSTAR_DAYCAB',
  NAVISTAR_INTERNATIONAL_PROSTAR_HIGH_SLEEPER: 'NAVISTAR_INTERNATIONAL_PROSTAR_HIGH_SLEEPER',
  NAVISTAR_INTERNATIONAL_PROSTAR_LOW_SLEEPER: 'NAVISTAR_INTERNATIONAL_PROSTAR_LOW_SLEEPER',
  NAVISTAR_INTERNATIONAL_RH_DAYCAB: 'NAVISTAR_INTERNATIONAL_RH_DAYCAB',
  NAVISTAR_INTERNATIONAL_RH_HIGH_SLEEPER: 'NAVISTAR_INTERNATIONAL_RH_HIGH_SLEEPER',
  NAVISTAR_INTERNATIONAL_RH_LOW_SLEEPER: 'NAVISTAR_INTERNATIONAL_RH_LOW_SLEEPER',
  NAVISTAR_INTERNATIONAL_WORKSTAR_4x2: 'NAVISTAR_INTERNATIONAL_WORKSTAR_4x2',
  NAVISTAR_INTERNATIONAL_WORKSTAR_6x4: 'NAVISTAR_INTERNATIONAL_WORKSTAR_6x4',
  NAVISTAR_INTERNATIONAL_WORKSTAR_8x6: 'NAVISTAR_INTERNATIONAL_WORKSTAR_8x6',
  NIKOLA_ONE: 'NIKOLA_ONE',
  NIKOLA_TRE: 'NIKOLA_TRE',
  NIKOLA_TWO: 'NIKOLA_TWO',
  NISSAN_CABSTAR_BOX: 'NISSAN_CABSTAR_BOX',
  NISSAN_CABSTAR_TIPPER: 'NISSAN_CABSTAR_TIPPER',
  NISSAN_NV300_L1H1: 'NISSAN_NV300_L1H1',
  NISSAN_NV400_L3H3: 'NISSAN_NV400_L3H3',
  OPEL_MOVANO_L1_CAB_TIPPER: 'OPEL_MOVANO_L1_CAB_TIPPER',
  OPEL_MOVANO_L1_FRAME: 'OPEL_MOVANO_L1_FRAME',
  OPEL_MOVANO_L2H2: 'OPEL_MOVANO_L2H2',
  OPEL_MOVANO_L4H2: 'OPEL_MOVANO_L4H2',
  OPEL_VIVARO: 'OPEL_VIVARO',
  PETERBILT_220: 'PETERBILT_220',
  PETERBILT_325: 'PETERBILT_325',
  PETERBILT_330: 'PETERBILT_330',
  PETERBILT_337: 'PETERBILT_337',
  PETERBILT_348: 'PETERBILT_348',
  PETERBILT_365: 'PETERBILT_365',
  PETERBILT_367: 'PETERBILT_367',
  PETERBILT_389: 'PETERBILT_389',
  PETERBILT_567: 'PETERBILT_567',
  PETERBILT_579: 'PETERBILT_579',
  PEUGEOT_BOXER_L1H1: 'PEUGEOT_BOXER_L1H1',
  PEUGEOT_BOXER_L2H2: 'PEUGEOT_BOXER_L2H2',
  PEUGEOT_EXPERT: 'PEUGEOT_EXPERT',
  PITTS_FLATBED_LB35: 'PITTS_FLATBED_LB35',
  PITTS_LOWBED_LB35_DC: 'PITTS_LOWBED_LB35_DC',
  PITTS_LOWBED_LB51_DC: 'PITTS_LOWBED_LB51_DC',
  PITTS_LOWBED_LB55_DC: 'PITTS_LOWBED_LB55_DC',
  POLAR_TANK_CHEMICAL: 'POLAR_TANK_CHEMICAL',
  POLAR_TANK_DEEP_DROP: 'POLAR_TANK_DEEP_DROP',
  POLAR_TANK_ENERGY: 'POLAR_TANK_ENERGY',
  POLAR_TANK_FOOD: 'POLAR_TANK_FOOD',
  POLAR_TANK_HOT: 'POLAR_TANK_HOT',
  POLAR_TANK_PETROLEUM: 'POLAR_TANK_PETROLEUM',
  PRATT_CONTAINER_CC242: 'PRATT_CONTAINER_CC242',
  PRATT_CONTAINER_CC243: 'PRATT_CONTAINER_CC243',
  PRATT_CONTAINER_D3141: 'PRATT_CONTAINER_D3141',
  PRATT_CONTAINER_GN2040EZ: 'PRATT_CONTAINER_GN2040EZ',
  PRATT_FLATBED_FB472SA: 'PRATT_FLATBED_FB472SA',
  PRATT_FLATBED_FB533: 'PRATT_FLATBED_FB533',
  PRATT_FLATBED_FB4228P: 'PRATT_FLATBED_FB4228P',
  PRATT_LOWBED_LB5374_40: 'PRATT_LOWBED_LB5374_40',
  PRATT_LOWBED_MD482A: 'PRATT_LOWBED_MD482A',
  PRATT_LOWBED_MDE48702A: 'PRATT_LOWBED_MDE48702A',
  RENAULT_MAGNUM_4x2: 'RENAULT_MAGNUM_4x2',
  RENAULT_MAGNUM_6x2: 'RENAULT_MAGNUM_6x2',
  RENAULT_MASTER_BOX_L2: 'RENAULT_MASTER_BOX_L2',
  RENAULT_MASTER_FRAME_L2: 'RENAULT_MASTER_FRAME_L2',
  RENAULT_MASTER_L2H2: 'RENAULT_MASTER_L2H2',
  RENAULT_MASTER_TIPPER_L2: 'RENAULT_MASTER_TIPPER_L2',
  RENAULT_PREMIUM_4x2: 'RENAULT_PREMIUM_4x2',
  RENAULT_PREMIUM_6x2: 'RENAULT_PREMIUM_6x2',
  RENAULT_RANGE_T_4x2: 'RENAULT_RANGE_T_4x2',
  RENAULT_RANGE_T_6x2: 'RENAULT_RANGE_T_6x2',
  RENAULT_TRAFIC: 'RENAULT_TRAFIC',
  REINKE_FLATBED: 'REINKE_FLATBED',
  SCANIA_G_DAYCAB_SEMI_4x2: 'SCANIA_G_DAYCAB_SEMI_4x2',
  SCANIA_G_DAYCAB_SEMI_6x2: 'SCANIA_G_DAYCAB_SEMI_6x2',
  SCANIA_G_DAYCAB_TANDEM_4x2: 'SCANIA_G_DAYCAB_TANDEM_4x2',
  SCANIA_G_DAYCAB_TANDEM_6x2: 'SCANIA_G_DAYCAB_TANDEM_6x2',
  SCANIA_G_DAYCAB_TANDEM_8x4: 'SCANIA_G_DAYCAB_TANDEM_8x4',
  SCANIA_G_SLEEPER_SEMI_4x2: 'SCANIA_G_SLEEPER_SEMI_4x2',
  SCANIA_G_SLEEPER_SEMI_6x2: 'SCANIA_G_SLEEPER_SEMI_6x2',
  SCANIA_G_SLEEPER_TANDEM_4x2: 'SCANIA_G_SLEEPER_TANDEM_4x2',
  SCANIA_G_SLEEPER_TANDEM_6x2: 'SCANIA_G_SLEEPER_TANDEM_6x2',
  SCANIA_G_SLEEPER_TANDEM_8x4: 'SCANIA_G_SLEEPER_TANDEM_8x4',
  SCANIA_L_SEMI_4x2: 'SCANIA_L_SEMI_4x2',
  SCANIA_L_SEMI_6x2: 'SCANIA_L_SEMI_6x2',
  SCANIA_L_TANDEM_4x2: 'SCANIA_L_TANDEM_4x2',
  SCANIA_L_TANDEM_6x2: 'SCANIA_L_TANDEM_6x2',
  SCANIA_OR_G_DAYCAB_SEMI_6x2: 'SCANIA_OR_G_DAYCAB_SEMI_6x2',
  SCANIA_OR_G_DAYCAB_TANDEM_6x2: 'SCANIA_OR_G_DAYCAB_TANDEM_6x2',
  SCANIA_OR_G_DAYCAB_TANDEM_8x4: 'SCANIA_OR_G_DAYCAB_TANDEM_8x4',
  SCANIA_OR_G_SLEEPER_SEMI_6x2: 'SCANIA_OR_G_SLEEPER_SEMI_6x2',
  SCANIA_OR_G_SLEEPER_TANDEM_6x2: 'SCANIA_OR_G_SLEEPER_TANDEM_6x2',
  SCANIA_OR_G_SLEEPER_TANDEM_8x4: 'SCANIA_OR_G_SLEEPER_TANDEM_8x4',
  SCANIA_OR_P_DAYCAB_SEMI_6x2: 'SCANIA_OR_P_DAYCAB_SEMI_6x2',
  SCANIA_OR_P_DAYCAB_TANDEM_6x2: 'SCANIA_OR_P_DAYCAB_TANDEM_6x2',
  SCANIA_OR_P_DAYCAB_TANDEM_8x4: 'SCANIA_OR_P_DAYCAB_TANDEM_8x4',
  SCANIA_OR_P_SLEEPER_SEMI_6x2: 'SCANIA_OR_P_SLEEPER_SEMI_6x2',
  SCANIA_OR_P_SLEEPER_TANDEM_6x2: 'SCANIA_OR_P_SLEEPER_TANDEM_6x2',
  SCANIA_OR_P_SLEEPER_TANDEM_8x4: 'SCANIA_OR_P_SLEEPER_TANDEM_8x4',
  SCANIA_OR_R_DAYCAB_SEMI_6x2: 'SCANIA_OR_R_DAYCAB_SEMI_6x2',
  SCANIA_OR_R_DAYCAB_TANDEM_6x2: 'SCANIA_OR_R_DAYCAB_TANDEM_6x2',
  SCANIA_OR_R_DAYCAB_TANDEM_8x4: 'SCANIA_OR_R_DAYCAB_TANDEM_8x4',
  SCANIA_OR_R_SLEEPER_SEMI_6x2: 'SCANIA_OR_R_SLEEPER_SEMI_6x2',
  SCANIA_OR_R_SLEEPER_TANDEM_6x2: 'SCANIA_OR_R_SLEEPER_TANDEM_6x2',
  SCANIA_OR_R_SLEEPER_TANDEM_8x4: 'SCANIA_OR_R_SLEEPER_TANDEM_8x4',
  SCANIA_OR_S_SEMI_6x2: 'SCANIA_OR_S_SEMI_6x2',
  SCANIA_OR_S_TANDEM_6x2: 'SCANIA_OR_S_TANDEM_6x2',
  SCANIA_OR_S_TANDEM_8x4: 'SCANIA_OR_S_TANDEM_8x4',
  SCANIA_P_DAYCAB_SEMI_4x2: 'SCANIA_P_DAYCAB_SEMI_4x2',
  SCANIA_P_DAYCAB_SEMI_6x2: 'SCANIA_P_DAYCAB_SEMI_6x2',
  SCANIA_P_DAYCAB_TANDEM_4x2: 'SCANIA_P_DAYCAB_TANDEM_4x2',
  SCANIA_P_DAYCAB_TANDEM_6x2: 'SCANIA_P_DAYCAB_TANDEM_6x2',
  SCANIA_P_DAYCAB_TANDEM_8x4: 'SCANIA_P_DAYCAB_TANDEM_8x4',
  SCANIA_P_SLEEPER_SEMI_4x2: 'SCANIA_P_SLEEPER_SEMI_4x2',
  SCANIA_P_SLEEPER_SEMI_6x2: 'SCANIA_P_SLEEPER_SEMI_6x2',
  SCANIA_P_SLEEPER_TANDEM_4x2: 'SCANIA_P_SLEEPER_TANDEM_4x2',
  SCANIA_P_SLEEPER_TANDEM_6x2: 'SCANIA_P_SLEEPER_TANDEM_6x2',
  SCANIA_P_SLEEPER_TANDEM_8x4: 'SCANIA_P_SLEEPER_TANDEM_8x4',
  SCANIA_R_DAYCAB_SEMI_4x2: 'SCANIA_R_DAYCAB_SEMI_4x2',
  SCANIA_R_DAYCAB_SEMI_6x2: 'SCANIA_R_DAYCAB_SEMI_6x2',
  SCANIA_R_DAYCAB_TANDEM_4x2: 'SCANIA_R_DAYCAB_TANDEM_4x2',
  SCANIA_R_DAYCAB_TANDEM_6x2: 'SCANIA_R_DAYCAB_TANDEM_6x2',
  SCANIA_R_DAYCAB_TANDEM_8x4: 'SCANIA_R_DAYCAB_TANDEM_8x4',
  SCANIA_R_PRT1_4x2: 'SCANIA_R_PRT1_4x2',
  SCANIA_R_PRT1_6x2: 'SCANIA_R_PRT1_6x2',
  SCANIA_R_SLEEPER_SEMI_4x2: 'SCANIA_R_SLEEPER_SEMI_4x2',
  SCANIA_R_SLEEPER_SEMI_6x2: 'SCANIA_R_SLEEPER_SEMI_6x2',
  SCANIA_R_SLEEPER_TANDEM_4x2: 'SCANIA_R_SLEEPER_TANDEM_4x2',
  SCANIA_R_SLEEPER_TANDEM_6x2: 'SCANIA_R_SLEEPER_TANDEM_6x2',
  SCANIA_R_SLEEPER_TANDEM_8x4: 'SCANIA_R_SLEEPER_TANDEM_8x4',
  SCANIA_S_SEMI_4x2: 'SCANIA_S_SEMI_4x2',
  SCANIA_S_SEMI_6x2: 'SCANIA_S_SEMI_6x2',
  SCANIA_S_TANDEM_4x2: 'SCANIA_S_TANDEM_4x2',
  SCANIA_S_TANDEM_6x2: 'SCANIA_S_TANDEM_6x2',
  SCANIA_S_TANDEM_8x4: 'SCANIA_S_TANDEM_8x4',
  SCHMITZ_CARGOBULL_SEMI_REEFER: 'SCHMITZ_CARGOBULL_SEMI_REEFER',
  SCHMITZ_CARGOBULL_TANDEM_CURTAIN: 'SCHMITZ_CARGOBULL_TANDEM_CURTAIN',
  SCHWARZMUELLER_FLATBED_3: 'SCHWARZMUELLER_FLATBED_3',
  SCHWARZMUELLER_FLATBED_3_1: 'SCHWARZMUELLER_FLATBED_3_1',
  SCHWARZMUELLER_FLATBED_3_2: 'SCHWARZMUELLER_FLATBED_3_2',
  SCHWARZMUELLER_FLATBED_TANDEM: 'SCHWARZMUELLER_FLATBED_TANDEM',
  SCHWARZMUELLER_FLATBED_TANDEM_1: 'SCHWARZMUELLER_FLATBED_TANDEM_1',
  SCHWARZMUELLER_FLATBED_TANDEM_2: 'SCHWARZMUELLER_FLATBED_TANDEM_2',
  SCHWARZMUELLER_FLATBED_TANDEM_3: 'SCHWARZMUELLER_FLATBED_TANDEM_3',
  SCHWARZMUELLER_FLATBED_TANDEM_4: 'SCHWARZMUELLER_FLATBED_TANDEM_4',
  SCHWARZMUELLER_FLATBED_TANDEM_5: 'SCHWARZMUELLER_FLATBED_TANDEM_5',
  SCHWARZMUELLER_FLATBED_TANDEM_6: 'SCHWARZMUELLER_FLATBED_TANDEM_6',
  SCHWARZMUELLER_SEMI_REEFER: 'SCHWARZMUELLER_SEMI_REEFER',
  SCHWARZMUELLER_SEMI_TIPPER_2_ALU: 'SCHWARZMUELLER_SEMI_TIPPER_2_ALU',
  SCHWARZMUELLER_SEMI_TIPPER_2_ALU_1: 'SCHWARZMUELLER_SEMI_TIPPER_2_ALU_1',
  SCHWARZMUELLER_SEMI_TIPPER_2_STEEL: 'SCHWARZMUELLER_SEMI_TIPPER_2_STEEL',
  SCHWARZMUELLER_SEMI_TIPPER_2_STEEL_1: 'SCHWARZMUELLER_SEMI_TIPPER_2_STEEL_1',
  SCHWARZMUELLER_SEMI_TIPPER_3_ALU: 'SCHWARZMUELLER_SEMI_TIPPER_3_ALU',
  SCHWARZMUELLER_SEMI_TIPPER_3_STEEL: 'SCHWARZMUELLER_SEMI_TIPPER_3_STEEL',
  SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU: 'SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU',
  SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU_1: 'SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU_1',
  SCHWARZMUELLER_SEMI_TRAILER: 'SCHWARZMUELLER_SEMI_TRAILER',
  SCHWARZMUELLER_SEMI_TRAILER_1: 'SCHWARZMUELLER_SEMI_TRAILER_1',
  SCHWARZMUELLER_SEMI_TRAILER_JUMBO: 'SCHWARZMUELLER_SEMI_TRAILER_JUMBO',
  SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL: 'SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL',
  SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL_1: 'SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL_1',
  SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK: 'SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK',
  SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_1: 'SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_1',
  SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_2: 'SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_2',
  SCHWARZMUELLER_SEMI_TRAILER_STANDARD: 'SCHWARZMUELLER_SEMI_TRAILER_STANDARD',
  SCHWARZMUELLER_SEMI_TRAILER_STANDARD_1: 'SCHWARZMUELLER_SEMI_TRAILER_STANDARD_1',
  SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT: 'SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT',
  SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_1: 'SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_1',
  SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_2: 'SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_2',
  SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_3: 'SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_3',
  SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA: 'SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA',
  SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA_1: 'SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA_1',
  SCHWARZMUELLER_TANDEM_4x2: 'SCHWARZMUELLER_TANDEM_4x2',
  SCHWARZMUELLER_TANDEM_6x2: 'SCHWARZMUELLER_TANDEM_6x2',
  SCHWARZMUELLER_TANDEM_TIPPER_2A: 'SCHWARZMUELLER_TANDEM_TIPPER_2A',
  SCHWARZMUELLER_TANDEM_TIPPER_2A_1: 'SCHWARZMUELLER_TANDEM_TIPPER_2A_1',
  SCHWARZMUELLER_TANDEM_TIPPER_3A: 'SCHWARZMUELLER_TANDEM_TIPPER_3A',
  SCHWARZMUELLER_TANDEM_TIPPER_3A_1: 'SCHWARZMUELLER_TANDEM_TIPPER_3A_1',
  SCHWARZMUELLER_TANDEM_TIPPER_3A_ALU: 'SCHWARZMUELLER_TANDEM_TIPPER_3A_ALU',
  SCHWARZMUELLER_TANDEM_TIPPER_4A: 'SCHWARZMUELLER_TANDEM_TIPPER_4A',
  SCHWARZMUELLER_TANDEM_TIPPER_4A_STEEL: 'SCHWARZMUELLER_TANDEM_TIPPER_4A_STEEL',
  SCHWARZMUELLER_TANDEM_TRUCK_2A: 'SCHWARZMUELLER_TANDEM_TRUCK_2A',
  SCHWARZMUELLER_TANDEM_TRUCK_2A_1: 'SCHWARZMUELLER_TANDEM_TRUCK_2A_1',
  SCHWARZMUELLER_TANDEM_TRUCK_3A: 'SCHWARZMUELLER_TANDEM_TRUCK_3A',
  SCHWARZMUELLER_TANDEM_TRUCK_MEDIUM: 'SCHWARZMUELLER_TANDEM_TRUCK_MEDIUM',
  SCHWARZMUELLER_TANK_SEMI: 'SCHWARZMUELLER_TANK_SEMI',
  SCHWARZMUELLER_TANK_SEMI_1: 'SCHWARZMUELLER_TANK_SEMI_1',
  SCHWARZMUELLER_TANK_SEMI_2: 'SCHWARZMUELLER_TANK_SEMI_2',
  SCHWARZMUELLER_TANK_TANDEM: 'SCHWARZMUELLER_TANK_TANDEM',
  SCHWARZMUELLER_TANK_TANDEM_1: 'SCHWARZMUELLER_TANK_TANDEM_1',
  SCHWARZMUELLER_TANK_TANDEM_2: 'SCHWARZMUELLER_TANK_TANDEM_2',
  SCHWARZMUELLER_TANK_TANDEM_3: 'SCHWARZMUELLER_TANK_TANDEM_3',
  SCHWARZMUELLER_TANK_TANDEM_TRUCK: 'SCHWARZMUELLER_TANK_TANDEM_TRUCK',
  SCHWARZMUELLER_TANK_TANDEM_TRUCK_1: 'SCHWARZMUELLER_TANK_TANDEM_TRUCK_1',
  SCHWARZMUELLER_TANK_TANDEM_TRUCK_2: 'SCHWARZMUELLER_TANK_TANDEM_TRUCK_2',
  SDC_BOXVAN_ALU: 'SDC_BOXVAN_ALU',
  SDC_BOXVAN_DOUBLE_DECK: 'SDC_BOXVAN_DOUBLE_DECK',
  SDC_BOXVAN_GRP: 'SDC_BOXVAN_GRP',
  SDC_BOXVAN_URBAN: 'SDC_BOXVAN_URBAN',
  SDC_CURTAIN: 'SDC_CURTAIN',
  SDC_CURTAIN_CHIPLINER: 'SDC_CURTAIN_CHIPLINER',
  SDC_CURTAIN_COILWELL: 'SDC_CURTAIN_COILWELL',
  SDC_CURTAIN_DOUBLE_DECK: 'SDC_CURTAIN_DOUBLE_DECK',
  SDC_CURTAIN_EUROLINER: 'SDC_CURTAIN_EUROLINER',
  SDC_CURTAIN_INSULINER: 'SDC_CURTAIN_INSULINER',
  SDC_CURTAIN_MEGA: 'SDC_CURTAIN_MEGA',
  SDC_CURTAIN_URBAN: 'SDC_CURTAIN_URBAN',
  SDC_PLATFORM: 'SDC_PLATFORM',
  SDC_PLATFORM_EXTENDABLE: 'SDC_PLATFORM_EXTENDABLE',
  SDC_PLATFORM_OIL_SPEC: 'SDC_PLATFORM_OIL_SPEC',
  SDC_PLATFORM_PSK: 'SDC_PLATFORM_PSK',
  SDC_PLATFORM_STEP_FRAME: 'SDC_PLATFORM_STEP_FRAME',
  SDC_SKELETAL_EXTANDABLE: 'SDC_SKELETAL_EXTANDABLE',
  SDC_SKELETAL_FIXED: 'SDC_SKELETAL_FIXED',
  SDC_SKELETAL_FIXED_GOOSENECK: 'SDC_SKELETAL_FIXED_GOOSENECK',
  SDC_SKELETAL_GOOSENECK_EXTENDING: 'SDC_SKELETAL_GOOSENECK_EXTENDING',
  SDC_SKELETAL_ISO_TANK: 'SDC_SKELETAL_ISO_TANK',
  SDC_SKELETAL_TIPPING: 'SDC_SKELETAL_TIPPING',
  STAS_TIPPER_AGGREGATE_STAR: 'STAS_TIPPER_AGGREGATE_STAR',
  STAS_TIPPER_BUILD_STARX: 'STAS_TIPPER_BUILD_STARX',
  STAS_TIPPER_ROCK_STAR: 'STAS_TIPPER_ROCK_STAR',
  STAS_TIPPER_U_ROCKSTAR: 'STAS_TIPPER_U_ROCKSTAR',
  STOUGHTON_TRAILERS_CHASSIS: 'STOUGHTON_TRAILERS_CHASSIS',
  STOUGHTON_TRAILERS_REEFER_PUREBLUE: 'STOUGHTON_TRAILERS_REEFER_PUREBLUE',
  STOUGHTON_TRAILERS_SEMI_TRAILER_EXTRA_WIDE: 'STOUGHTON_TRAILERS_SEMI_TRAILER_EXTRA_WIDE',
  STOUGHTON_TRAILERS_SEMI_TRAILER_TOUGH_PLATE: 'STOUGHTON_TRAILERS_SEMI_TRAILER_TOUGH_PLATE',
  STOUGHTON_TRAILERS_SEMI_TRAILER_Z_PLATE: 'STOUGHTON_TRAILERS_SEMI_TRAILER_Z_PLATE',
  STRICK_TRAILERS_SEMI_TRAILER_COMPOSITE: 'STRICK_TRAILERS_SEMI_TRAILER_COMPOSITE',
  STRICK_TRAILERS_SEMI_TRAILER_SHEET_POST: 'STRICK_TRAILERS_SEMI_TRAILER_SHEET_POST',
  STRICK_TRAILERS_TANDEM_4x2: 'STRICK_TRAILERS_TANDEM_4x2',
  TATA_1821_TANDEM_6x2: 'TATA_1821_TANDEM_6x2',
  TATA_1918T_TANDEM_4x2: 'TATA_1918T_TANDEM_4x2',
  TATA_1923_TANDEM_TIPPER_4x2: 'TATA_1923_TANDEM_TIPPER_4x2',
  TATA_2818_TANDEM_6x2: 'TATA_2818_TANDEM_6x2',
  TATA_2823_TANDEM_TIPPER_6x2: 'TATA_2823_TANDEM_TIPPER_6x2',
  TATA_2825_TANDEM_TIPPER_6x2: 'TATA_2825_TANDEM_TIPPER_6x2',
  TATA_3518_TANDEM_8x4: 'TATA_3518_TANDEM_8x4',
  TATA_3521_TANDEM_8x4: 'TATA_3521_TANDEM_8x4',
  TATA_4018_SEMI_4x2: 'TATA_4018_SEMI_4x2',
  TATA_4625_SEMI_4x2: 'TATA_4625_SEMI_4x2',
  TATA_5530_SEMI_6x2: 'TATA_5530_SEMI_6x2',
  TRAIL_KING_TIPPER: 'TRAIL_KING_TIPPER',
  TRAIL_KING_TIPPER_1: 'TRAIL_KING_TIPPER_1',
  TRANSCRAFT_FLATBED_COMBO: 'TRANSCRAFT_FLATBED_COMBO',
  TRANSCRAFT_FLATBED_DROP_DECK_COMBO: 'TRANSCRAFT_FLATBED_DROP_DECK_COMBO',
  TRANSCRAFT_FLATBED_DROP_DECK_STEEL: 'TRANSCRAFT_FLATBED_DROP_DECK_STEEL',
  TRANSCRAFT_FLATBED_STEEL: 'TRANSCRAFT_FLATBED_STEEL',
  UTM_FLATBED_4000AE: 'UTM_FLATBED_4000AE',
  UTM_FLATBED_4000AE_DROP_DECK: 'UTM_FLATBED_4000AE_DROP_DECK',
  UTM_FLATBED_DROP_DECK: 'UTM_FLATBED_DROP_DECK',
  UTM_TRAILER_3000R: 'UTM_TRAILER_3000R',
  UTM_TRAILER_3000R_MULTI_TEMP: 'UTM_TRAILER_3000R_MULTI_TEMP',
  UTM_TRAILER_4000D: 'UTM_TRAILER_4000D',
  UTM_TRAILER_4000D_X_COMPOSITE: 'UTM_TRAILER_4000D_X_COMPOSITE',
  UTM_TRAILER_4000D_X_COMPOSITE_100: 'UTM_TRAILER_4000D_X_COMPOSITE_100',
  UTM_TRAILER_4000D_X_COMPOSITE_TBR: 'UTM_TRAILER_4000D_X_COMPOSITE_TBR',
  UTM_TRAILER_TAUTLINER: 'UTM_TRAILER_TAUTLINER',
  VANGUARD_CIE_20_40_CITYCOMBO_WS_TANDEM: 'VANGUARD_CIE_20_40_CITYCOMBO_WS_TANDEM',
  VANGUARD_CIE_20_40_SL_COMBO_TANDEM_WS: 'VANGUARD_CIE_20_40_SL_COMBO_TANDEM_WS',
  VANGUARD_CIE_20_40_SL_COMBO_TRIDEM: 'VANGUARD_CIE_20_40_SL_COMBO_TRIDEM',
  VANGUARD_CIE_23_5_TANDEM: 'VANGUARD_CIE_23_5_TANDEM',
  VANGUARD_CIE_33_LIGHTWEIGHT_TRIDEM: 'VANGUARD_CIE_33_LIGHTWEIGHT_TRIDEM',
  VANGUARD_CIE_33_SLIDER_TRIDEM: 'VANGUARD_CIE_33_SLIDER_TRIDEM',
  VANGUARD_CIE_40_45_EXTANDABLE: 'VANGUARD_CIE_40_45_EXTANDABLE',
  VANGUARD_CIE_40_53_EXTENDABLE_TRIDEM: 'VANGUARD_CIE_40_53_EXTENDABLE_TRIDEM',
  VANGUARD_CIE_40_GOOSENECK_LIGHTWEIGHT: 'VANGUARD_CIE_40_GOOSENECK_LIGHTWEIGHT',
  VANGUARD_CIE_40_GOOSENECK_TANDEM: 'VANGUARD_CIE_40_GOOSENECK_TANDEM',
  VANGUARD_CIE_40_GOOSENECK_TRIDEM: 'VANGUARD_CIE_40_GOOSENECK_TRIDEM',
  VANGUARD_CIE_43_DROP_FRAME: 'VANGUARD_CIE_43_DROP_FRAME',
  VANGUARD_CIE_53_GOOSENECK: 'VANGUARD_CIE_53_GOOSENECK',
  VANGUARD_MAXCUBE: 'VANGUARD_MAXCUBE',
  VANGUARD_REEFER: 'VANGUARD_REEFER',
  VANGUARD_VAF: 'VANGUARD_VAF',
  VANGUARD_VIP_4000: 'VANGUARD_VIP_4000',
  VANGUARD_VSF: 'VANGUARD_VSF',
  VANGUARD_VXP: 'VANGUARD_VXP',
  VOLKSWAGEN_CONSTELLATION_15190_ROBUST: 'VOLKSWAGEN_CONSTELLATION_15190_ROBUST',
  VOLKSWAGEN_CONSTELLATION_17190: 'VOLKSWAGEN_CONSTELLATION_17190',
  VOLKSWAGEN_CONSTELLATION_17230_ROBUST: 'VOLKSWAGEN_CONSTELLATION_17230_ROBUST',
  VOLKSWAGEN_CONSTELLATION_17280: 'VOLKSWAGEN_CONSTELLATION_17280',
  VOLKSWAGEN_CONSTELLATION_17280_TRACTOR: 'VOLKSWAGEN_CONSTELLATION_17280_TRACTOR',
  VOLKSWAGEN_CONSTELLATION_19330: 'VOLKSWAGEN_CONSTELLATION_19330',
  VOLKSWAGEN_CONSTELLATION_19360: 'VOLKSWAGEN_CONSTELLATION_19360',
  VOLKSWAGEN_CONSTELLATION_19420_VTRONIC: 'VOLKSWAGEN_CONSTELLATION_19420_VTRONIC',
  VOLKSWAGEN_CONSTELLATION_25360: 'VOLKSWAGEN_CONSTELLATION_25360',
  VOLKSWAGEN_CONSTELLATION_25420_VTRONIC: 'VOLKSWAGEN_CONSTELLATION_25420_VTRONIC',
  VOLKSWAGEN_CONSTELLATION_26280_6x4: 'VOLKSWAGEN_CONSTELLATION_26280_6x4',
  VOLKSWAGEN_CONSTELLATION_26420_VTRONIC_6x4: 'VOLKSWAGEN_CONSTELLATION_26420_VTRONIC_6x4',
  VOLKSWAGEN_CONSTELLATION_31280_6x4: 'VOLKSWAGEN_CONSTELLATION_31280_6x4',
  VOLKSWAGEN_CONSTELLATION_31330: 'VOLKSWAGEN_CONSTELLATION_31330',
  VOLKSWAGEN_CRAFTER_FRAME_L3: 'VOLKSWAGEN_CRAFTER_FRAME_L3',
  VOLKSWAGEN_CRAFTER_FRAME_L4: 'VOLKSWAGEN_CRAFTER_FRAME_L4',
  VOLKSWAGEN_CRAFTER_FRAME_L5: 'VOLKSWAGEN_CRAFTER_FRAME_L5',
  VOLKSWAGEN_CRAFTER_L3H3: 'VOLKSWAGEN_CRAFTER_L3H3',
  VOLKSWAGEN_CRAFTER_L4H3: 'VOLKSWAGEN_CRAFTER_L4H3',
  VOLKSWAGEN_CRAFTER_L5H3: 'VOLKSWAGEN_CRAFTER_L5H3',
  VOLKSWAGEN_DELIVERY_6160: 'VOLKSWAGEN_DELIVERY_6160',
  VOLKSWAGEN_DELIVERY_9170: 'VOLKSWAGEN_DELIVERY_9170',
  VOLKSWAGEN_DELIVERY_11180: 'VOLKSWAGEN_DELIVERY_11180',
  VOLKSWAGEN_TRANSPORTER_L1: 'VOLKSWAGEN_TRANSPORTER_L1',
  VOLKSWAGEN_TRANSPORTER_L2: 'VOLKSWAGEN_TRANSPORTER_L2',
  VOLVO_FH_2_4x2: 'VOLVO_FH_2_4x2',
  VOLVO_FH_2_6x2: 'VOLVO_FH_2_6x2',
  VOLVO_FH_3_4x2: 'VOLVO_FH_3_4x2',
  VOLVO_FH_3_6x2: 'VOLVO_FH_3_6x2',
  VOLVO_FH_4: 'VOLVO_FH_4',
  VOLVO_FMX: 'VOLVO_FMX',
  VOLVO_VNL_300_4x2: 'VOLVO_VNL_300_4x2',
  VOLVO_VNL_300_6x2: 'VOLVO_VNL_300_6x2',
  VOLVO_VNL_400: 'VOLVO_VNL_400',
  VOLVO_VNL_740_6x2: 'VOLVO_VNL_740_6x2',
  VOLVO_VNL_760: 'VOLVO_VNL_760',
  VOLVO_VNL_860: 'VOLVO_VNL_860',
  VOLVO_VNR_300_4x2: 'VOLVO_VNR_300_4x2',
  VOLVO_VNR_300_6x2: 'VOLVO_VNR_300_6x2',
  VOLVO_VNR_400: 'VOLVO_VNR_400',
  VOLVO_VNR_640: 'VOLVO_VNR_640',
  WABASH_FLATBED_ALU: 'WABASH_FLATBED_ALU',
  WABASH_FLATBED_ALU_DROP_DECK: 'WABASH_FLATBED_ALU_DROP_DECK',
  WABASH_REEFER_ARCTIC_LITE: 'WABASH_REEFER_ARCTIC_LITE',
  WABASH_REEFER_MSC: 'WABASH_REEFER_MSC',
  WABASH_TANK_3A_SANITARY: 'WABASH_TANK_3A_SANITARY',
  WABASH_TANK_ALU_DRY_BULK: 'WABASH_TANK_ALU_DRY_BULK',
  WABASH_TANK_ALU_PETROLEUM: 'WABASH_TANK_ALU_PETROLEUM',
  WABASH_TANK_DEF: 'WABASH_TANK_DEF',
  WABASH_TANK_FOOD: 'WABASH_TANK_FOOD',
  WABASH_TRAILER_DURAPLATE: 'WABASH_TRAILER_DURAPLATE',
  WABASH_TRAILER_DURAPLATE_HD: 'WABASH_TRAILER_DURAPLATE_HD',
  WESTERN_STAR_TRUCKS_5700_FE: 'WESTERN_STAR_TRUCKS_5700_FE',
  WESTERN_STAR_TRUCKS_5800_FE: 'WESTERN_STAR_TRUCKS_5800_FE',
};

export const EEquipmentPartTypeDetails = {
  [EEquipmentPartType.AXLES]: {
    palette: EPalette.GREEN,
    children: [EEquipmentPart.BRAKES, EEquipmentPart.SUSPENSION, EEquipmentPart.WHEELS],
    master: EEquipmentPart.WHEELS
  },
  [EEquipmentPartType.BODY]: {
    palette: EPalette.PURPLE,
    children: [EEquipmentPart.BODY, EEquipmentPart.FRAME, EEquipmentPart.INTERIOR,
              EEquipmentPart.SUPPORT],
    master: EEquipmentPart.BODY
  },
  [EEquipmentPartType.ELECTRIC]: {
    palette: EPalette.TURQUOISE,
    children: [EEquipmentPart.BATTERY, EEquipmentPart.ELECTRONIC, EEquipmentPart.LIGHTS],
    master: EEquipmentPart.BATTERY
  },
  [EEquipmentPartType.LOAD]: {
    palette: EPalette.BLUE,
    chldren: [EEquipmentPart.FIFTH_WHEEL, EEquipmentPart.DOORS, EEquipmentPart.HYDRAULIC,
              EEquipmentPart.FRIGO, EEquipmentPart.RAMP, EEquipmentPart.TRAILER_ATTACHMENT,
              EEquipmentPart.WINCH, EEquipmentPart.LOAD],
    master: EEquipmentPart.TRAILER_ATTACHMENT
  },
  [EEquipmentPartType.MECHANICAL]: {
    palette: EPalette.RED,
    children: [EEquipmentPart.ENGINE, EEquipmentPart.EXHAUST, EEquipmentPart.FUEL, 
              EEquipmentPart.GEARBOX, EEquipmentPart.COMPRESSOR],
    master: EEquipmentPart.ENGINE
  }
};

/**
 * Enum: EEquipmentPartDetails
 * Details of the enum EEquipmentPart
 */
export const EEquipmentPartDetails = Object.freeze({
  [EEquipmentPart.BATTERY]: {
    icon: faCarBattery,
    iconSource: 'fa',
    name: 'Battery',
    parent: EEquipmentPartType.ELECTRIC
  },
  [EEquipmentPart.BODY]: {
    icon: 'CarDoor',
    iconSource: 'custom',
    name: 'Body',
    parent: EEquipmentPartType.BODY
  },
  [EEquipmentPart.BRAKES]: {
    icon: 'Brake',
    iconSource: 'custom',
    name: 'Brakes',
    parent: EEquipmentPartType.AXLES
  },
  [EEquipmentPart.COMPRESSOR]: {
    icon: faTachometerFast,
    iconSource: 'fa',
    name: 'Compressor',
    parent: EEquipmentPartType.MECHANICAL
  },
  [EEquipmentPart.DOORS]: {
    icon: 'Doors',
    iconSource: 'custom',
    name: 'Doors',
    parent: EEquipmentPartType.LOAD
  },
  [EEquipmentPart.ELECTRONIC]: {
    icon: faMicrochip,
    iconSource: 'fa',
    name: 'Electronic',
    parent: EEquipmentPartType.ELECTRIC
  },
  [EEquipmentPart.ENGINE]: {
    icon: 'Engine',
    iconSource: 'custom',
    name: 'Engine',
    parent: EEquipmentPartType.MECHANICAL
  },
  [EEquipmentPart.EXHAUST]: {
    icon: 'Exhaust',
    iconSource: 'custom',
    name: 'Exhaust',
    parent: EEquipmentPartType.MECHANICAL
  },
  [EEquipmentPart.FIFTH_WHEEL]: {
    icon: 'FifthWheel',
    iconSource: 'custom',
    name: 'Fifth Wheel',
    parent: EEquipmentPartType.LOAD
  },
  [EEquipmentPart.FRAME]: {
    icon: faShareAlt,
    iconSource: 'fa',
    name: 'Frame',
    parent: EEquipmentPartType.BODY
  },
  [EEquipmentPart.FRIGO]: {
    icon: faSnowflake,
    iconSource: 'fa',
    name: 'Frigo',
    parent: EEquipmentPartType.LOAD
  },
  [EEquipmentPart.FUEL]: {
    icon: 'Fuel',
    iconSource: 'custom',
    name: 'Fuel',
    parent: EEquipmentPartType.MECHANICAL
  },
  [EEquipmentPart.GEARBOX]: {
    icon: 'Gearbox',
    iconSource: 'custom',
    name: 'Gearbox',
    parent: EEquipmentPartType.MECHANICAL
  },
  [EEquipmentPart.HYDRAULIC]: {
    icon: 'Hydraulic',
    iconSource: 'custom',
    name: 'Hydraulic',
    parent: EEquipmentPartType.LOAD
  },
  [EEquipmentPart.INTERIOR]: {
    icon: 'CarSeat',
    iconSource: 'custom',
    name: 'Interior',
    parent: EEquipmentPartType.BODY
  },
  [EEquipmentPart.LIGHTS]: {
    icon: faLightbulbOn,
    iconSource: 'fa',
    name: 'Lights',
    parent: EEquipmentPartType.ELECTRIC
  },
  [EEquipmentPart.LOAD]: {
    icon: 'Load',
    iconSource: 'custom',
    name: 'Load',
    parent: EEquipmentPartType.LOAD
  },
  [EEquipmentPart.RAMP]: {
    icon: faRampLoading,
    iconSource: 'fa',
    name: 'Ramp / Elevator',
    parent: EEquipmentPartType.LOAD
  },
  [EEquipmentPart.SUPPORT]: {
    icon: 'Support',
    iconSource: 'custom',
    name: 'Support',
    parent: EEquipmentPartType.BODY
  },
  [EEquipmentPart.SUSPENSION]: {
    icon: 'Spring',
    iconSource: 'custom',
    name: 'Suspension',
    parent: EEquipmentPartType.AXLES
  },
  [EEquipmentPart.TRAILER_ATTACHMENT]: {
    icon: 'TrailerHook',
    iconSource: 'custom',
    name: 'Trailer Attachment',
    parent: EEquipmentPartType.LOAD
  },
  [EEquipmentPart.WHEELS]: {
    icon: faTire,
    iconSource: 'fa',
    name: 'Wheels',
    parent: EEquipmentPartType.AXLES
  },
  [EEquipmentPart.WINCH]: {
    icon: 'Winch',
    iconSource: 'custom',
    name: 'Winch',
    parent: EEquipmentPartType.LOAD
  }
});

/**
* Enum: EEquipmentModelTypeDetails
* Details about the enum EEquipmentModelType
* 
* name: string | Printable name of the type
* icon: HTMLElement | Icon set of the type
*/
export const EEquipmentModelTypeDetails = Object.freeze({
  [EEquipmentModelType.SEMI_TRUCK]: {
      name: 'Semi Truck',
      icon: <div className="transportation-icon-container">
          <i className="icon icon-truck-front" />
          <i className="icon icon-truck-end-4x2" />
      </div>
  },
  [EEquipmentModelType.TANDEM]: {
      name: 'Tandem',
      icon: <div className="transportation-icon-container">
          <i className="icon icon-truck-front" />
          <i className="icon icon-truck-end-4x2-tandem-trailer" />
      </div>
  },
  [EEquipmentModelType.SEMI_TRAILER]: {
      name: 'Semi Trailer',
      icon: <div className="transportation-icon-container">
          <i className="icon icon-trailer-start-big" />
          <i className="icon icon-trailer-mid-big" />
          <i className="icon icon-trailer-end-6" />
      </div>
  },
  [EEquipmentModelType.VAN]: {
      name: 'Van',
      icon: <div className="transportation-icon-container">
          <i className="icon icon-van-front-h1" />
          <i className="icon icon-van-end-l1h1" />
      </div>
  },
  [EEquipmentModelType.TANDEM_TRAILER]: {
      name: 'Tandem Trailer',
      icon: <div className="transportation-icon-container">
          <i className="icon icon-trailer-start-2" />
          <i className="icon icon-trailer-end-2" />
      </div>
  },
  [EEquipmentModelType.TOOL]: {
      name: 'Tool',
      icon: <Icon source="fa" icon={faToolbox} />
  }
});

/**
* Enum: EEquipmentModelSubType
* SubType of an equipment model type
* Structurized as : TYPE: { SUBTYPE, SUBTYPE }
*/
export const EEquipmentModelSubType = Object.freeze({
  [EEquipmentModelType.SEMI_TRUCK]: {
      T4x2: 'T4x2',
      T6x2: 'T6x2',
      T8x4: 'T8x4',

      T4x2_big: 'T4x2_big',
      T6x2_big: 'T6x2_big',
      T8x4_big: 'T8x4_big',

      T4x2_small: 'T4x2_small',
      T6x2_small: 'T6x2_small',
      T8x4_small: 'T8x4_small'
  },
  [EEquipmentModelType.TANDEM]: {
      TRAILER_T4x2: 'TRAILER_T4x2',
      TRAILER_T6x2: 'TRAILER_T6x2',
      TRAILER_T8x4: 'TRAILER_T8x4',

      TRAILER_T4x2_small: 'TRAILER_T4x2_small',
      TRAILER_T6x2_small: 'TRAILER_T6x2_small',

      TRAILER_T4x2_big: 'TRAILER_T4x2_big',
      TRAILER_T6x2_big: 'TRAILER_T6x2_big',
      TRAILER_T8x4_big: 'TRAILER_T8x4_big',

      TIPPER_T4x2: 'TIPPER_T4x2',
      TIPPER_T6x2: 'TIPPER_T6x2',
      TIPPER_T8x4: 'TIPPER_T8x4',
      
      TIPPER_T4x2_big: 'TIPPER_T4x2_big',
      TIPPER_T6x2_big: 'TIPPER_T6x2_big',

      FLATBED_T4x2: 'FLATBED_T4x2',
      FLATBED_T6x2: 'FLATBED_T6x2',
      
      FRIGO_T4x2: 'FRIGO_T4x2',
      FRIGO_T6x2: 'FRIGO_T6x2',

	  TANK_T4x2: 'TANK_T4x2',
	  TANK_T6x2: 'TANK_T6x2',
      TANK_T6x2_small: 'TANK_T6x2_small'
  },
  [EEquipmentModelType.SEMI_TRAILER]: {
      TRAILER_2_AXLES: 'TRAILER_2_AXLES',
      TRAILER_3_AXLES: 'TRAILER_3_AXLES',

      FLATBED_1_1_AXLES: 'FLATBED_1_1_AXLES',
	  FLATBED_1_2_AXLES: 'FLATBED_1_2_AXLES',
      FLATBED_3_AXLES: 'FLATBED_3_AXLES',
      FLATBED_2_AXLES: 'FLATBED_2_AXLES',

      CONTAINER_1_1_AXLES: 'CONTAINER_1_1_AXLES',
      CONTAINER_2_AXLES: 'CONTAINER_2_AXLES',
      CONTAINER_3_AXLES: 'CONTAINER_3_AXLES',
      
      LOWBED_2_AXLES: 'LOWBED_2_AXLES',
      LOWBED_3_AXLES: 'LOWBED_3_AXLES',

      TIPPER_1_1_AXLES: 'TIPPER_1_1_AXLES',
      TIPPER_2_AXLES: 'TIPPER_2_AXLES',
      TIPPER_3_AXLES: 'TIPPER_3_AXLES',

      FRIGO_2_AXLES: 'FRIGO_2_AXLES',
      FRIGO_3_AXLES: 'FRIGO_3_AXLES',

      TANK_2_AXLES: 'TANK_2_AXLES',
      TANK_3_AXLES: 'TANK_3_AXLES'
  },
  [EEquipmentModelType.TANDEM_TRAILER]: {
      TRAILER_1_1_AXLES: 'TRAILER_1_1_AXLES',
	  TRAILER_2_MID_AXLES: 'TRAILER_2_MID_AXLES',

      FLATBED_1_1_AXLES: 'FLATBED_1_1_AXLES',
      FLATBED_1_2_AXLES: 'FLATBED_1_2_AXLES',
      FLATBED_2_3_AXLES: 'FLATBED_2_3_AXLES',
	  
	  TANK_1_1_AXLES: 'TANK_1_1_AXLES',
	  TANK_1_2_AXLES: 'TANK_1_2_AXLES',
  },
  [EEquipmentModelType.VAN]: {
      // All different variants of a van

      L1H1: 'L1H1',
      L1H2: 'L1H2',
      L1H3: 'L1H3',

      L2H1: 'L2H1',
      L2H2: 'L2H2',
      L2H3: 'L2H3',

      L3H1: 'L3H1',
      L3H2: 'L3H2',
      L3H3: 'L3H3',

      L4H1: 'L4H1',
      L4H2: 'L4H2',
      L4H3: 'L4H3',

      // Body means no rear equipment
      L1BODY: 'L1BODY',
      L2BODY: 'L2BODY',
      L3BODY: 'L3BODY',
      L4BODY: 'L3BODY',

      L1_TIPPER: 'L1_TIPPER',
	    L1_CREW_TIPPER: 'L1_CREW_TIPPER',
      L2_TIPPER: 'L2_TIPPER',

      L1_BOX: 'L1_BOX',
	    L2_BOX: 'L2_BOX'
  },
  [EEquipmentModelType.TOOL]: {
      // Nothing here for the moment :)
  }
});

/**
* Enum: EEquipmentModelSubTypeDetails
* Details about the enum EEquipmentModelSubType
* 
* name: string | Printable name
* icon: HTMLElement | Icon set for the subType
*/
export const EEquipmentModelSubTypeDetails = Object.freeze({
  [EEquipmentModelType.SEMI_TRUCK]: {
      [EEquipmentModelSubType.SEMI_TRUCK.T4x2]: {
          name: 'Semi 4x2',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front" />
              <i className="icon icon-truck-end-4x2" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRUCK.T6x2]: {
          name: 'Semi 6x2',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front" />
              <i className="icon icon-truck-end-6x2" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRUCK.T8x4]: {
          name: 'Semi 8x4',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front" />
              <i className="icon icon-truck-end-8x4" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRUCK.T4x2_big]: {
          name: 'Semi 4x2 Long cabin',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front-big" />
              <i className="icon icon-truck-end-4x2" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRUCK.T6x2_big]: {
          name: 'Semi 6x2 Long cabin',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front-big" />
              <i className="icon icon-truck-end-6x2" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRUCK.T8x4_big]: {
          name: 'Semi 8x4 Long cabin',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front-big" />
              <i className="icon icon-truck-end-8x4" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRUCK.T4x2_small]: {
          name: 'Semi 4x2 Small Body',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front-small" />
              <i className="icon icon-truck-end-4x2" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRUCK.T6x2_small]: {
          name: 'Semi 6x2 Small Body',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front-small" />
              <i className="icon icon-truck-end-6x2" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRUCK.T8x4_small]: {
          name: 'Semi 8x2 Small Body',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front-small" />
              <i className="icon icon-truck-end-8x4" />
          </div>
      },
  },
  [EEquipmentModelType.TANDEM]: {
      [EEquipmentModelSubType.TANDEM.TRAILER_T4x2]: {
          name: 'Tandem 4x2',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front" />
              <i className="icon icon-truck-end-4x2-tandem-trailer" />
          </div>
      },
      [EEquipmentModelSubType.TANDEM.TRAILER_T6x2]: {
          name: 'Tandem 6x2',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front" />
              <i className="icon icon-truck-end-6x2-tandem-trailer" />
          </div>
      },
      [EEquipmentModelSubType.TANDEM.TRAILER_T8x4]: {
          name: 'Tandem 8x4',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front" />
              <i className="icon icon-truck-end-8x4-tandem-trailer" />
          </div>
      },
      [EEquipmentModelSubType.TANDEM.TRAILER_T4x2_small]: {
        name: 'Tandem 4x2 small',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front-small" />
            <i className="icon icon-truck-end-4x2-tandem-trailer" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM.TRAILER_T6x2_small]: {
        name: 'Tandem 6x2 small',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front-small" />
            <i className="icon icon-truck-end-6x2-tandem-trailer" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM.TRAILER_T4x2_big]: {
        name: 'Tandem 4x2 big',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front-big" />
            <i className="icon icon-truck-end-4x2-tandem-trailer" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM.TRAILER_T6x2_big]: {
        name: 'Tandem 6x2 long cabin',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front-big" />
            <i className="icon icon-truck-end-6x2-tandem-trailer" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM.TRAILER_T8x4_big]: {
        name: 'Tandem 8x4 long cabin',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front-big" />
            <i className="icon icon-truck-end-8x4-tandem-trailer" />
        </div>
      },

      [EEquipmentModelSubType.TANDEM.TIPPER_T4x2]: {
          name: 'Tandem tipper 4x2',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front" />
              <i className="icon icon-truck-end-4x2-tandem-tipper" />
          </div>
      },
      [EEquipmentModelSubType.TANDEM.TIPPER_T6x2]: {
          name: 'Tandem tipper 6x2',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front" />
              <i className="icon icon-truck-end-6x2-tandem-tipper" />
          </div>
      },
      [EEquipmentModelSubType.TANDEM.TIPPER_T8x4]: {
          name: 'Tandem tipper 8x4',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front" />
              <i className="icon icon-truck-end-8x4-tandem-tipper" />
          </div>
      },
      [EEquipmentModelSubType.TANDEM.TIPPER_T4x2_big]: {
          name: 'Tandem tipper 4x2 Big cabin',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front-big" />
              <i className="icon icon-truck-end-4x2-tandem-tipper" />
          </div>
      },
      [EEquipmentModelSubType.TANDEM.TIPPER_T6x2_big]: {
          name: 'Tandem tipper 6x2 Big cabin',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-truck-front-big" />
              <i className="icon icon-truck-end-6x2-tandem-tipper" />
          </div>
      },

      [EEquipmentModelSubType.TANDEM.FLATBED_T4x2]: {
        name: 'Tandem Flatbed 4x2',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front" />
            <i className="icon icon-truck-end-4x2-tandem-flatbed" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM.FLATBED_T6x2]: {
        name: 'Tandem Flatbed 6x2',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front" />
            <i className="icon icon-truck-end-6x2-tandem-flatbed" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM.FRIGO_T4x2]: {
        name: 'Tandem Frigo 4x2',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front-small-frigo" />
            <i className="icon icon-truck-end-4x2-tandem-trailer-cold" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM.FRIGO_T6x2]: {
        name: 'Tandem Frigo 6x2',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front-small-frigo" />
            <i className="icon icon-truck-end-6x2-tandem-trailer-cold" />
        </div>
      },

	  [EEquipmentModelSubType.TANDEM.TANK_T4x2]: {
        name: 'Tandem Tank 4x2',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front" />
            <i className="icon icon-truck-end-4x2-tandem-tank" />
        </div>
      },
	  [EEquipmentModelSubType.TANDEM.TANK_T6x2]: {
        name: 'Tandem Tank 6x2',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front" />
            <i className="icon icon-truck-end-6x2-tandem-tank" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM.TANK_T6x2_small]: {
        name: 'Tandem Tank 6x2 small',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front-small" />
            <i className="icon icon-truck-end-6x2-tandem-tank" />
        </div>
      }
  },
  [EEquipmentModelType.SEMI_TRAILER]: {
      [EEquipmentModelSubType.SEMI_TRAILER.TRAILER_2_AXLES]: {
          name: '2 axles Trailer',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-trailer-start-big" />
              <i className="icon icon-trailer-mid-big" />
              <i className="icon icon-trailer-end-4" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.TRAILER_3_AXLES]: {
          name: '3 axles Trailer',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-trailer-start-big" />
              <i className="icon icon-trailer-mid-big" />
              <i className="icon icon-trailer-end-6" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.FLATBED_1_1_AXLES]: {
        name: '1 + 1 axles Flatbed Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-flatbed-start-big" />
          <i className="icon icon-flatbed-mid" />
          <i className="icon icon-flatbed-mid-2" />
          <i className="icon icon-flatbed-end-2" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.FLATBED_1_2_AXLES]: {
        name: '1 + 2 axles Flatbed Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-flatbed-start-big" />
          <i className="icon icon-flatbed-mid" />
          <i className="icon icon-flatbed-mid-2" />
          <i className="icon icon-flatbed-end-4" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.FLATBED_3_AXLES]: {
          name: '3 axles Flatbed Trailer',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-flatbed-start-big" />
              <i className="icon icon-flatbed-mid-big" />
              <i className="icon icon-flatbed-end-6" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.FLATBED_2_AXLES]: {
          name: '2 axles Flatbed Trailer',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-flatbed-start-big" />
              <i className="icon icon-flatbed-mid-big" />
              <i className="icon icon-flatbed-end-4" />
          </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.CONTAINER_1_1_AXLES]: {
        name: '1 + 1 axles Container Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-container-start-big" />
          <i className="icon icon-container-mid" />
          <i className="icon icon-container-mid-2" />
          <i className="icon icon-container-end-2" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.CONTAINER_3_AXLES]: {
        name: '3 axles Container Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-container-start-big" />
          <i className="icon icon-container-mid-big" />
          <i className="icon icon-container-end-6" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.CONTAINER_2_AXLES]: {
        name: '2 axles Container Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-container-start-big" />
          <i className="icon icon-container-mid-big" />
          <i className="icon icon-container-end-4" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.LOWBED_2_AXLES]: {
        name: '2 axles Lowbed Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-flatbed-start-big" />
          <i className="icon icon-flatbed-mid-small" />
          <i className="icon icon-lowbed-link" />
          <i className="icon icon-lowbed-mid-big" />
          <i className="icon icon-lowbed-mid-big" />
          <i className="icon icon-lowbed-link" />
          <i className="icon icon-flatbed-end-4" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.LOWBED_3_AXLES]: {
        name: '3 axles Lowbed Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-flatbed-start-big" />
          <i className="icon icon-flatbed-mid-small" />
          <i className="icon icon-lowbed-link" />
          <i className="icon icon-lowbed-mid-big" />
          <i className="icon icon-lowbed-mid-big" />
          <i className="icon icon-lowbed-link" />
          <i className="icon icon-flatbed-end-6" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.TIPPER_1_1_AXLES]: {
        name: '1 + 1 axles Tipper Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-tipper-start-big" />
          <i className="icon icon-trailer-mid" />
          <i className="icon icon-trailer-mid-2" />
          <i className="icon icon-trailer-end-2" />
          <i className="icon icon-tipper-u-end" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.TIPPER_2_AXLES]: {
        name: '2 axles Tipper Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-tipper-start-big" />
          <i className="icon icon-trailer-mid" />
          <i className="icon icon-trailer-end-4" />
          <i className="icon icon-tipper-u-end" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.TIPPER_3_AXLES]: {
        name: '3 axles Tipper Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-tipper-start-big" />
          <i className="icon icon-trailer-mid" />
          <i className="icon icon-trailer-end-6" />
          <i className="icon icon-tipper-u-end" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.FRIGO_2_AXLES]: {
        name: '2 axles Refrigerated Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-frigo-start-big" />
          <i className="icon icon-trailer-mid-big-cold" />
          <i className="icon icon-trailer-end-4" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.FRIGO_3_AXLES]: {
        name: '3 axles Refrigerated Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-frigo-start-big" />
          <i className="icon icon-trailer-mid-big-cold" />
          <i className="icon icon-trailer-end-6" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.TANK_2_AXLES]: {
        name: '2 axles Tank Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-tank-start-big" />
          <i className="icon icon-trailer-mid-big" />
          <i className="icon icon-trailer-end-4" />
          <i className="icon icon-tank-u-end" />
        </div>
      },
      [EEquipmentModelSubType.SEMI_TRAILER.TANK_3_AXLES]: {
        name: '3 axles Tank Trailer',
        icon: <div className="transportation-icon-container">
          <i className="icon icon-tank-start-big" />
          <i className="icon icon-trailer-mid-big" />
          <i className="icon icon-trailer-end-6" />
          <i className="icon icon-tank-u-end" />
        </div>
      },
  },
  [EEquipmentModelType.TANDEM_TRAILER]: {
      [EEquipmentModelSubType.TANDEM_TRAILER.TRAILER_1_1_AXLES]: {
          name: 'Trailer 1 front and 1 rear axle',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-trailer-start-2" />
              <i className="icon icon-trailer-end-2" />
          </div>
      },
	  [EEquipmentModelSubType.TANDEM_TRAILER.TRAILER_2_MID_AXLES]: {
		  name: 'Trailer 2 middle axles',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-trailer-start" />
              <i className="icon icon-trailer-mid-small" />
              <i className="icon icon-trailer-mid-4" />
              <i className="icon icon-trailer-mid" />
          </div>
	  },
      [EEquipmentModelSubType.TANDEM_TRAILER.FLATBED_1_1_AXLES]: {
          name: 'Flatbed 1 front + 1 rear axles',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-flatbed-start-2" />
              <i className="icon icon-flatbed-end-2" />
          </div>
      },
      [EEquipmentModelSubType.TANDEM_TRAILER.FLATBED_1_2_AXLES]: {
        name: 'Flatbed 1 front + 2 rear axles',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-flatbed-start-2" />
            <i className="icon icon-flatbed-mid-big" />
            <i className="icon icon-flatbed-end-4" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM_TRAILER.FLATBED_2_2_AXLES]: {
        name: 'Flatbed 2 front + 2 rear axles',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-flatbed-start-2" />
            <i className="icon icon-flatbed-mid-2" />
            <i className="icon icon-flatbed-mid-big" />
            <i className="icon icon-flatbed-end-4" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM_TRAILER.FLATBED_2_3_AXLES]: {
        name: 'Flatbed 2 front + 3 rear axles',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-flatbed-start-2" />
            <i className="icon icon-flatbed-mid-2" />
            <i className="icon icon-flatbed-mid-big" />
            <i className="icon icon-flatbed-end-6" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM_TRAILER.TANK_1_1_AXLES]: {
        name: 'Tank 1 front + 1 rear axles',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-tank-start-2" />
            <i className="icon icon-trailer-mid-big" />
            <i className="icon icon-trailer-end-2" />
            <i className="icon icon-tank-u-end" />
        </div>
      },
      [EEquipmentModelSubType.TANDEM_TRAILER.TANK_1_2_AXLES]: {
        name: 'Tank 1 front + 2 rear axles',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-tank-start-2" />
            <i className="icon icon-trailer-mid-big" />
            <i className="icon icon-trailer-end-4" />
            <i className="icon icon-tank-u-end" />
        </div>
      },
  },
  [EEquipmentModelType.VAN]: {
      [EEquipmentModelSubType.VAN.L1H1]: {
          name: 'L1H1',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h1" />
              <i className="icon icon-van-end-l1h1" />
          </div>
      },
      [EEquipmentModelSubType.VAN.L1H2]: {
          name: 'L1H2',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h2" />
              <i className="icon icon-van-end-l1h2" />
          </div>
      },
      [EEquipmentModelSubType.VAN.L1H3]: {
          name: 'L1H3',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h3" />
              <i className="icon icon-van-end-l1h3" />
          </div>
      },

      [EEquipmentModelSubType.VAN.L2H1]: {
          name: 'L2H1',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h1" />
              <i className="icon icon-van-end-l2h1" />
          </div>
      },
      [EEquipmentModelSubType.VAN.L2H2]: {
          name: 'L2H2',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h2" />
              <i className="icon icon-van-end-l2h2" />
          </div>
      },
      [EEquipmentModelSubType.VAN.L2H3]: {
          name: 'L2H3',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h3" />
              <i className="icon icon-van-end-l2h3" />
          </div>
      },

      [EEquipmentModelSubType.VAN.L3H1]: {
          name: 'L3H1',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h1" />
              <i className="icon icon-van-end-l3h1" />
          </div>
      },
      [EEquipmentModelSubType.VAN.L3H2]: {
          name: 'L3H2',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h2" />
              <i className="icon icon-van-end-l3h2" />
          </div>
      },
      [EEquipmentModelSubType.VAN.L3H3]: {
          name: 'L3H3',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h3" />
              <i className="icon icon-van-end-l3h3" />
          </div>
      },
	  
      [EEquipmentModelSubType.VAN.L4H1]: {
          name: 'L4H1',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h1" />
              <i className="icon icon-van-end-l4h1" />
          </div>
      },
      [EEquipmentModelSubType.VAN.L4H2]: {
          name: 'L4H2',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h2" />
              <i className="icon icon-van-end-l4h2" />
          </div>
      },
      [EEquipmentModelSubType.VAN.L4H3]: {
          name: 'L4H3',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h3" />
              <i className="icon icon-van-end-l4h3" />
          </div>
      },

      [EEquipmentModelSubType.VAN.L1BODY]: {
          name: 'L1 Body',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h1" />
              <i className="icon icon-van-end-l1-frame" />
          </div>
      },
      [EEquipmentModelSubType.VAN.L2BODY]: {
          name: 'L2 Body',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h1" />
              <i className="icon icon-van-end-l2-frame" />
          </div>
      },
      [EEquipmentModelSubType.VAN.L3BODY]: {
          name: 'L3 Body',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h1" />
              <i className="icon icon-van-end-l3-frame" />
          </div>
      },
      [EEquipmentModelSubType.VAN.L4BODY]: {
          name: 'L4 Body',
          icon: <div className="transportation-icon-container">
              <i className="icon icon-van-front-h1" />
              <i className="icon icon-van-end-l4-frame" />
          </div>
      },
      
      [EEquipmentModelSubType.VAN.L1_TIPPER]: {
        name: 'L1 Tipper',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1" />
            <i className="icon icon-van-end-l1-tipper" />
        </div>
      },
      [EEquipmentModelSubType.VAN.L1_CREW_TIPPER]: {
        name: 'L1 Crewcab Tipper',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1" />
            <i className="icon icon-van-mid-h1" />
            <i className="icon icon-van-end-l1-tipper" />
        </div>
      },
      [EEquipmentModelSubType.VAN.L2_TIPPER]: {
        name: 'L2 Tipper',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1" />
            <i className="icon icon-van-end-l2-tipper" />
        </div>
      },
      
      [EEquipmentModelSubType.VAN.L1_BOX]: {
        name: 'L1 Box',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1" />
            <i className="icon icon-van-end-l1-box" />
        </div>
      },
      [EEquipmentModelSubType.VAN.L2_BOX]: {
        name: 'L2 Box',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1" />
            <i className="icon icon-van-end-l2-box" />
        </div>
      },
  },
  [EEquipmentModelType.TOOL]: {
      // Nothing here for the moment :)
  }
});

export const EEquipmentPartMaintenance = Object.freeze({
  BATTERY_REPLACEMENT: {
    parent: EEquipmentPart.BATTERY,
    name: 'Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  BATTERY_RECHARGE: {
    parent: EEquipmentPart.BATTERY,
    name: 'Recharge',
    subSource: 'fa',
    subIcon: faPlug
  },
  BATTERY_VOLTAGE_CHECK: {
    parent: EEquipmentPart.BATTERY,
    name: 'Voltage Check',
    subSource: 'fa',
    subIcon: faBolt
  },
  BODY_PAINT: {
    parent: EEquipmentPart.BODY,
    name: 'Paint',
    subSource: 'fa',
    subIcon: faFill
  },
  BODY_WORK: {
    parent: EEquipmentPart.BODY,
    name: 'Work',
    subSource: 'fa',
    subIcon: faHammer
  },
  BODY_PART_REPLACEMENT: {
    parent: EEquipmentPart.BODY,
    name: 'Part Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  BODY_WINDSHIELD_REPAIR: {
    parent: EEquipmentPart.BODY,
    name: 'Windshield Repair',
    mainSource: 'custom',
    mainIcon: 'Windshield',
    subSource: 'fa',
    subIcon: faWrench
  },
  BODY_WINDSHIELD_REPLACEMENT: {
    parent: EEquipmentPart.BODY,
    name: 'Windshield Replacement',
    mainSource: 'custom',
    mainIcon: 'Windshield',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  BODY_SIDE_WINDOW_REPAIR: {
    parent: EEquipmentPart.BODY,
    name: 'Side Window Repair',
    mainSource: 'custom',
    mainIcon: 'CarSideWindow',
    subSource: 'fa',
    subIcon: faWrench
  },
  BODY_SIDE_WINDOW_REPLACEMENT: {
    parent: EEquipmentPart.BODY,
    name: 'Side Window Replacement',
    mainSource: 'custom',
    mainIcon: 'CarSideWindow',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  BODY_DOOR_REPAIR: {
    parent: EEquipmentPart.BODY,
    name: 'Door Repair',
    subSource: 'fa',
    subIcon: faWrench
  },
  BODY_DOOR_REPLACMEENT: {
    parent: EEquipmentPart.BODY,
    name: 'Door Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  BODY_MIRROR_REPAIR: {
    parent: EEquipmentPart.BODY,
    name: 'Mirror Repair',
    mainSource: 'custom',
    mainIcon: 'CarMirror',
    subSource: 'fa',
    subIcon: faWrench
  },
  BODY_MIRROR_REPLACEMENT: {
    parent: EEquipmentPart.BODY,
    name: 'Mirror Replacement',
    mainSource: 'custom',
    mainIcon: 'CarMirror',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  BRAKE_CHECK: {
    parent: EEquipmentPart.BRAKES,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  BRAKE_MASTER_CYLINDER_REPLACEMENT: {
    parent: EEquipmentPart.BRAKES,
    name: 'Master Cylinder Replacement',
    mainSource: 'custom',
    mainIcon: 'BrakeMasterCylinder',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  BRAKE_FLUID_PURGE: {
    parent: EEquipmentPart.BRAKES,
    name: 'Fluid Purge',
    subSource: 'fa',
    subIcon: faFaucet
  },
  BRAKE_DISK_REPLACEMENT: {
    parent: EEquipmentPart.BRAKES,
    name: 'Disk Replacement',
    mainSource: 'custom',
    mainIcon: 'BrakeDisk',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  BRAKE_PADS_REPLACEMENT: {
    parent: EEquipmentPart.BRAKES,
    name: 'Pads Replacement',
    mainSource: 'custom',
    mainIcon: 'BrakePad',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  BRAKE_DRUM_REPLACEMENT: {
    parent: EEquipmentPart.BRAKES,
    name: 'Drum Replacement',
    mainSource: 'custom',
    mainIcon: 'BrakeDrum',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  COMPRESSOR_CHECK: {
    parent: EEquipmentPart.COMPRESSOR,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  COMPRESSOR_REPLACEMENT: {
    parent: EEquipmentPart.COMPRESSOR,
    name: 'Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  COMPRESSOR_HOSE_REPLACEMENT: {
    parent: EEquipmentPart.COMPRESSOR,
    name: 'Hose Replacement',
    mainSource: 'custom',
    mainIcon: 'Hose',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  DOOR_CHECK: {
    parent: EEquipmentPart.DOORS,
    name: 'Door Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  DOOR_REPLACEMENT: {
    parent: EEquipmentPart.DOORS,
    name: 'Door Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  DOOR_SEAL_REPLACEMENT: {
    parent: EEquipmentPart.DOORS,
    name: 'Seal Replacement',
    mainSource: 'fa',
    mainIcon: faSquareFull,
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  DOOR_HINGE_REPLACEMENT: {
    parent: EEquipmentPart.DOORS,
    name: 'Hinge Replacement',
    mainSource: 'custom',
    mainIcon: 'Hinge',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  DOOR_CLOSING_MECHANISM_REPLACEMENT: {
    parent: EEquipmentPart.DOORS,
    name: 'Closing Mechanism Replacement',
    mainSource: 'custom',
    mainIcon: 'DoorClose',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FUSE_REPLACEMENT: {
    parent: EEquipmentPart.ELECTRONIC,
    name: 'Fuse Replacement',
    mainSource: 'custom',
    mainIcon: 'Fuse',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FUSE_CHECK: {
    parent: EEquipmentPart.ELECTRONIC,
    name: 'Fuse Check',
    mainSource: 'custom',
    mainIcon: 'Fuse',
    subSource: 'fa',
    subIcon: faSearch
  },
  SENSOR_CHECK: {
    parent: EEquipmentPart.ELECTRONIC,
    name: 'Sensor Check',
    mainSource: 'custom',
    mainIcon: 'Sensor',
    subSource: 'fa',
    subIcon: faSearch
  },
  SENSOR_REPLACEMENT: {
    parent: EEquipmentPart.ELECTRONIC,
    name: 'Sensor Replacement',
    mainSource: 'custom',
    mainIcon: 'Sensor',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  ENGINE_FAULT_READ: {
    parent: EEquipmentPart.ENGINE,
    name: 'ODB Fault Read',
    mainSource: 'custom',
    mainIcon: 'Obd',
    subSource: 'fa',
    subIcon: faSearch
  },
  ENGINE_CHECK: {
    parent: EEquipmentPart.ENGINE,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  ENGINE_COMPRESSION_CHECK: {
    parent: EEquipmentPart.ENGINE,
    name: 'Compression Check',
    subSource: 'fa',
    subIcon: faTachometerAltFast
  },
  ENGINE_INJECTION_CHECK: {
    parent: EEquipmentPart.ENGINE,
    name: 'Injection Check',
    mainSource: 'custom',
    mainIcon: 'Injector',
    subSource: 'fa',
    subIcon: faSearch
  },
  ENGINE_INJECTION_REPLACEMENT: {
    parent: EEquipmentPart.ENGINE,
    name: 'Injection Part Replacement',
    mainSource: 'custom',
    mainIcon: 'Injector',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  ENGINE_INTAKE_CHECK: {
    parent: EEquipmentPart.ENGINE,
    name: 'Intake Check',
    mainSource: 'fa',
    mainIcon: faArrowAltToRight,
    subSource: 'fa',
    subIcon: faSearch
  },
  ENGINE_INTAKE_REPLACEMENT: {
    parent: EEquipmentPart.ENGINE,
    name: 'Intake Part Replacement',
    mainSource: 'fa',
    mainIcon: faArrowAltToRight,
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  ENGINE_OIL_CHECK: {
    parent: EEquipmentPart.ENGINE,
    name: 'Oil Check',
    mainSource: 'fa',
    mainIcon: faOilCan,
    subSource: 'fa',
    subIcon: faSearch
  },
  ENGINE_OIL_REPLACEMENT: {
    parent: EEquipmentPart.ENGINE,
    name: 'Oil Replacement',
    mainSource: 'fa',
    mainIcon: faOilCan,
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  EXHAUST_TURBO_CHECK: {
    parent: EEquipmentPart.EXHAUST,
    name: 'Turbo Check',
    mainSource: 'fa',
    mainIcon: faFan,
    subSource: 'fa',
    subIcon: faSearch
  },
  EXHAUST_TURBO_REPLACEMENT: {
    parent: EEquipmentPart.EXHAUST,
    name: 'Turbo Replacement',
    mainSource: 'fa',
    mainIcon: faFan,
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  EXHAUST_CHECK: {
    parent: EEquipmentPart.EXHAUST,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  EXHAUST_PART_REPLACEMENT: {
    parent: EEquipmentPart.EXHAUST,
    name: 'Part Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  EXHAUST_SENSOR_REPLACEMENT: {
    parent: EEquipmentPart.EXHAUST,
    name: 'Sensor Replacement',
    mainSource: 'custom',
    mainIcon: 'Sensor',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FIFTH_WHEEL_CHECK: {
    parent: EEquipmentPart.FIFTH_WHEEL,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  FIFTH_WHEEL_REPLACEMENT: {
    parent: EEquipmentPart.FIFTH_WHEEL,
    name: 'Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FIFTH_WHEEL_HOSE_CHECK: {
    parent: EEquipmentPart.FIFTH_WHEEL,
    name: 'Hose Check',
    mainSource: 'custom',
    mainIcon: 'Hose',
    subSource: 'fa',
    subIcon: faSearch
  },
  FIFTH_WHEEL_HOSE_REPLACEMENT: {
    parent: EEquipmentPart.FIFTH_WHEEL,
    name: 'Hose Replacement',
    mainSource: 'custom',
    mainIcon: 'Hose',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FIFTH_WHEEL_TRAILER_HARNESS_CHECK: {
    parent: EEquipmentPart.FIFTH_WHEEL,
    name: 'Trailer Harness Check',
    mainSource: 'custom',
    mainIcon: 'TrailerHarness',
    subSource: 'fa',
    subIcon: faSearch
  },
  FIFTH_WHEEL_TRAILER_HARNESS_REPLACEMENT: {
    parent: EEquipmentPart.FIFTH_WHEEL,
    name: 'Trailer Harness Replacement',
    mainSource: 'custom',
    mainIcon: 'TrailerHarness',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FRAME_CHECK: {
    parent: EEquipmentPart.FRAME,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  FRAME_WELDING: {
    parent: EEquipmentPart.FRAME,
    name: 'Welding Work',
    subSource: 'fa',
    subIcon: faBurn
  },
  FRIGO_CHECK: {
    parent: EEquipmentPart.FRIGO,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  FRIGO_REPLACEMENT: {
    parent: EEquipmentPart.FRIGO,
    name: 'Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FRIGO_GAZ_CHECK: {
    parent: EEquipmentPart.FRIGO,
    name: 'Gaz Check',
    mainSource: 'custom',
    mainIcon: 'ColdGaz',
    subSource: 'fa',
    subIcon: faSearch
  },
  FRIGO_FLUID_REPLACEMENT: {
    parent: EEquipmentPart.FRIGO,
    name: 'Gaz Replacement',
    mainSource: 'custom',
    mainIcon: 'ColdGaz',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FRIGO_COMPRESSOR_CHECK: {
    parent: EEquipmentPart.FRIGO,
    name: 'Compressor Check',
    mainSource: 'fa',
    mainIcon: faTachometerAltFast,
    subSource: 'fa',
    subIcon: faSearch
  },
  FRIGO_COMPRESSOR_REPLACEMENT: {
    parent: EEquipmentPart.FRIGO,
    name: 'Compressor Replacement',
    mainSource: 'fa',
    mainIcon: faTachometerAltFast,
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FUEL_TANK_CHECK: {
    parent: EEquipmentPart.FUEL,
    name: 'Tank Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  FUEL_TANK_REPLACEMENT: {
    parent: EEquipmentPart.FUEL,
    name: 'Tank Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FUEL_HOSE_CHECK: {
    parent: EEquipmentPart.FUEL,
    name: 'Hose Check',
    mainSource: 'custom',
    mainIcon: 'Hose',
    subSource: 'fa',
    subIcon: faSearch
  },
  FUEL_HOSE_REPLACEMENT: {
    parent: EEquipmentPart.FUEL,
    name: 'Hose Replacement',
    mainSource: 'custom',
    mainIcon: 'Hose',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FUEL_PUMP_CHECK: {
    parent: EEquipmentPart.FUEL,
    name: 'Pump Check',
    mainSource: 'custom',
    mainIcon: 'FuelPump',
    subSource: 'fa',
    subIcon: faSearch
  },
  FUEL_PUMP_REPLACEMENT: {
    parent: EEquipmentPart.FUEL,
    name: 'Pump Replacement',
    mainSource: 'custom',
    mainIcon: 'FuelPump',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  FUEL_SENSOR_CHECK: {
    parent: EEquipmentPart.FUEL,
    name: 'Sensor Check',
    mainSource: 'custom',
    mainIcon: 'Sensor',
    subSource: 'fa',
    subIcon: faSearch
  },
  FUEL_SENSOR_REPLACEMENT: {
    parent: EEquipmentPart.FUEL,
    name: 'Sensor Replacement',
    mainSource: 'custom',
    mainIcon: 'Sensor',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  GEARBOX_CHECK: {
    parent: EEquipmentPart.GEARBOX,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  GEARBOX_REPLACEMENT: {
    parent: EEquipmentPart.GEARBOX,
    name: 'Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  GEARBOX_OIL_REPLACEMENT: {
    parent: EEquipmentPart.GEARBOX,
    name: 'Oil Replacement',
    mainSource: 'fa',
    mainIcon: faOilCan,
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  GEARBOX_FORK_REPAIR: {
    parent: EEquipmentPart.GEARBOX,
    name: 'Fork Repair',
    mainSource: 'custom',
    mainIcon: 'GearboxFork',
    subSource: 'fa',
    subIcon: faWrench
  },
  GEARBOX_FORK_REPLACEMENT: {
    parent: EEquipmentPart.GEARBOX,
    name: 'Fork Replacement',
    mainSource: 'custom',
    mainIcon: 'GearboxFork',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  GEARBOX_GEAR_REPLACEMENT: {
    parent: EEquipmentPart.GEARBOX,
    name: 'Gear Replacement',
    mainSource: 'fa',
    mainIcon: faCog,
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  TRANSMISSION_CHECK: {
    parent: EEquipmentPart.GEARBOX,
    name: 'Transmission Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  TRANSSISSION_SHAFT_REPLACEMENT: {
    parent: EEquipmentPart.GEARBOX,
    name: 'Shaft Replacement',
    mainSource: 'custom',
    mainIcon: 'Shaft',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  TRANSMISSION_DIFFERENTIAL_OIL_REPLACEMENT: {
    parent: EEquipmentPart.GEARBOX,
    name: 'Differential Oil Replacement',
    mainSource: 'custom',
    mainIcon: 'Differential',
    subSource: 'fa',
    subIcon: faOilCan
  },
  TRANSMISSION_DIFFERENTIAL_REPLACEMENT: {
    parent: EEquipmentPart.GEARBOX,
    name: 'Differential Replacement',
    mainSource: 'custom',
    mainIcon: 'Differential',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  TRANSMISSION_GIMBAL_REPLACEMENT: {
    parent: EEquipmentPart.GEARBOX,
    name: 'Gimbal Replacement',
    mainSource: 'custom',
    mainIcon: 'Gimbal',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  HYDRAULIC_CHECK: {
    parent: EEquipmentPart.HYDRAULIC,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  HYDRAULIC_HOSE_CHECK: {
    parent: EEquipmentPart.HYDRAULIC,
    name: 'Hose Check',
    mainSource: 'custom',
    mainIcon: 'Hose',
    subSource: 'fa',
    subIcon: faSearch
  },
  HYDRAULIC_HOSE_REPLACEMENT: {
    parent: EEquipmentPart.HYDRAULIC,
    name: 'Hose Replacement',
    mainSource: 'custom',
    mainIcon: 'Hose',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  HYDRAULIC_PRESSURE_CHECK: {
    parent: EEquipmentPart.HYDRAULIC,
    name: 'Pressure Check',
    subSource: 'fa',
    subIcon: faTachometerAltFast
  },
  HYDRAULIC_CYLINDER_CHECK: {
    parent: EEquipmentPart.HYDRAULIC,
    name: 'Cylinder Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  HYDRAULIC_CYLINDER_REPAIR: {
    parent: EEquipmentPart.HYDRAULIC,
    name: 'Cylinder Repair',
    subSource: 'fa',
    subIcon: faWrench
  },
  HYDRAULIC_CYLINDER_REPLACEMENT: {
    parent: EEquipmentPart.HYDRAULIC,
    name: 'Cylinder Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  INTERIOR_SEAT_REPLACEMENT: {
    parent: EEquipmentPart.INTERIOR,
    name: 'Seat Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  INTERIOR_STEERING_WHEEL_REPLACEMENT: {
    parent: EEquipmentPart.INTERIOR,
    name: 'Driving Wheel Replacement',
    mainSource: 'fa',
    mainIcon: faSteeringWheel,
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  INTERIOR_EQUIPMENT_REPAIR: {
    parent: EEquipmentPart.INTERIOR,
    name: 'Interior Equipment Repair',
    subSource: 'fa',
    subIcon: faWrench
  },
  INTERIOR_EQUIPMENT_REPLACEMENT: {
    parent: EEquipmentPart.INTERIOR,
    name: 'Interior Equipment Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  LIGHT_REPAIR: {
    parent: EEquipmentPart.LIGHTS,
    name: 'Repair',
    subSource: 'fa',
    subIcon: faWrench
  },
  LIGHT_REPLACEMENT: {
    parent: EEquipmentPart.LIGHTS,
    name: 'Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  LIGHT_BULB_REPLACEMENT: {
    parent: EEquipmentPart.LIGHTS,
    name: 'Light Bulb Replacement',
    mainSource: 'fa',
    mainIcon: faLightbulb,
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  LOAD_ATTACHMENT_REPLACEMENT: {
    parent: EEquipmentPart.LOAD,
    name: 'Attachment Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  RAMP_CHECK: {
    parent: EEquipmentPart.RAMP,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  RAMP_REPLACEMENT: {
    parent: EEquipmentPart.RAMP,
    name: 'Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  RAMP_CONTROLS_REPLACEMENT: {
    parent: EEquipmentPart.RAMP,
    name: 'Controls Replacement',
    mainSource: 'fa',
    mainIcon: faJoystick,
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  SUPPORT_REPAIR: {
    parent: EEquipmentPart.SUPPORT,
    name: 'Repair',
    subSource: 'fa',
    subIcon: faWrench
  },
  SUPPORT_REPLACEMENT: {
    parent: EEquipmentPart.SUPPORT,
    name: 'Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  SUSPENSION_CHECK: {
    parent: EEquipmentPart.SUSPENSION,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  SUSPENSION_SPRING_REPLACEMENT: {
    parent: EEquipmentPart.SUSPENSION,
    name: 'Spring Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  SUSPENSION_SHOCK_ABSORBER_REPLACEMENT: {
    parent: EEquipmentPart.SUSPENSION,
    name: 'Shock Absorber Replacement',
    mainSource: 'custom',
    mainIcon: 'ShockAbsorber',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  SUSPENSION_LEAF_REPLACEMENT: {
    parent: EEquipmentPart.SUSPENSION,
    name: 'Leaf Replacement',
    mainSource: 'custom',
    mainIcon: 'SuspensionLeaf',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  SUSPENSION_TRIANGLE_REPLACEMENT: {
    parent: EEquipmentPart.SUSPENSION,
    name: 'Triangle Replacement',
    mainSource: 'custom',
    mainIcon: 'SuspensionTriangle',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  SUSPENSION_SILENT_BLOC_REPLACEMENT: {
    parent: EEquipmentPart.SUSPENSION,
    name: 'Silent Bloc Replacement',
    mainSource: 'custom',
    mainIcon: 'SilentBloc',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  SUSPENSION_PART_REPLACEMENT: {
    parent: EEquipmentPart.SUSPENSION,
    name: 'Part Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  TRAILER_ATTACHMENT_CHECK: {
    parent: EEquipmentPart.TRAILER_ATTACHMENT,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  TRAILER_ATTACHMENT_REPLACEMENT: {
    parent: EEquipmentPart.TRAILER_ATTACHMENT,
    name: 'Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  TRAILER_ATTACHMENT_WIRING_HARNESS_CHECK: {
    parent: EEquipmentPart.TRAILER_ATTACHMENT,
    name: 'Wiring Harness Check',
    mainSource: 'custom',
    mainIcon: 'TrailerHarness',
    subSource: 'fa',
    subIcon: faSearch
  },
  TRAILER_ATTACHMENT_WIRING_HARNESS_REPLACEMENT: {
    parent: EEquipmentPart.TRAILER_ATTACHMENT,
    name: 'Wiring Harness Replacement',
    mainSource: 'custom',
    mainIcon: 'TrailerHarness',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  WHEELS_TIRE_CHECK: {
    parent: EEquipmentPart.WHEELS,
    name: 'Tire Check',
    mainSource: 'custom',
    mainIcon: 'Tire',
    subSource: 'fa',
    subIcon: faSearch
  },
  WHEELS_TIRE_PRESSURE_CHECK: {
    parent: EEquipmentPart.WHEELS,
    name: 'Tire Pressure Check',
    mainSource: 'custom',
    mainIcon: 'Tire',
    subSource: 'fa',
    subIcon: faTachometerAltFast
  },
  WHEELS_TIRE_REPLACEMENT: {
    parent: EEquipmentPart.WHEELS,
    name: 'Tire Replacement',
    mainSource: 'custom',
    mainIcon: 'Tire',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  WHEELS_RIM_CHECK: {
    parent: EEquipmentPart.WHEELS,
    name: 'Rim Check',
    mainSource: 'custom',
    mainIcon: 'Rim',
    subSource: 'fa',
    subIcon: faSearch
  },
  WHEELS_RIM_REPLACEMENT: {
    parent: EEquipmentPart.WHEELS,
    name: 'Rim Replacement',
    mainSource: 'custom',
    mainIcon: 'Rim',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  WINCH_CHECK: {
    parent: EEquipmentPart.WINCH,
    name: 'Check',
    subSource: 'fa',
    subIcon: faSearch
  },
  WINCH_REPLACEMENT: {
    parent: EEquipmentPart.WINCH,
    name: 'Replacement',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  WINCH_ENGINE_REPLACEMENT: {
    parent: EEquipmentPart.WINCH,
    name: 'Engine Replacement',
    mainSource: 'custom',
    mainIcon: 'ElectricEngine',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  WINCH_ENGINE_REPAIR: {
    parent: EEquipmentPart.WINCH,
    name: 'Engine Repair',
    mainSource: 'custom',
    mainIcon: 'ElectricEngine',
    subSource: 'fa',
    subIcon: faWrench
  },
  WINCH_ROPE_REPLACEMENT: {
    parent: EEquipmentPart.WINCH,
    name: 'Rope Replacement',
    mainSource: 'custom',
    mainIcon: 'Rope',
    subSource: 'fa',
    subIcon: faSyncAlt
  },
  WINCH_HOOK_REPLACEMENT: {
    parent: EEquipmentPart.WINCH,
    name: 'Hook Replacement',
    mainSource: 'custom',
    mainIcon: 'Hook',
    subSource: 'fa',
    subIcon: faSyncAlt
  }
});

/**
 * Enum: EEquipmentModelDetails
 * Details of the enum EEquipmentModel
 */
export const EEquipmentModelDetails = {
  [EEquipmentModel.ASTRA_HD9_RIGID]: {
    name: 'Astra HD9 Rigid 8x4 Tipper',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T8x4,
    brand: EBrand.ASTRA,
    image: ASTRA_HD9_RIGID_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":78}},{"type":"SUSPENSION","position":{"x":40,"y":59}},
          {"type":"WHEELS","position":{"x":30,"y":79}},{"type":"BODY","position":{"x":50,"y":46}},
          {"type":"FRAME","position":{"x":61,"y":81}},{"type":"INTERIOR","position":{"x":45,"y":31}},
          {"type":"BATTERY","position":{"x":82,"y":52}},{"type":"ELECTRONIC","position":{"x":76,"y":43}},
          {"type":"LIGHTS","position":{"x":90,"y":59}},{"type":"LOAD","position":{"x":22,"y":59}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":13,"y":67}},{"type":"GEARBOX","position":{"x":67,"y":83}},
          {"type":"FUEL","position":{"x":25,"y":68}},{"type":"EXHAUST","position":{"x":27,"y":40}},
          {"type":"ENGINE","position":{"x":68,"y":62}},{"type":"COMPRESSOR","position":{"x":51,"y":62}}]
  },
  [EEquipmentModel.ASTRA_HHD9_RIGID]: {
    name: 'Astra HHD9 Rigid 8x4 Tipper',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T8x4,
    brand: EBrand.ASTRA,
    image: ASTRA_HHD9_RIGID_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":78}},{"type":"SUSPENSION","position":{"x":40,"y":59}},
          {"type":"WHEELS","position":{"x":30,"y":79}},{"type":"BODY","position":{"x":50,"y":46}},
          {"type":"FRAME","position":{"x":61,"y":81}},{"type":"INTERIOR","position":{"x":45,"y":31}},
          {"type":"BATTERY","position":{"x":82,"y":52}},{"type":"ELECTRONIC","position":{"x":76,"y":43}},
          {"type":"LIGHTS","position":{"x":90,"y":59}},{"type":"LOAD","position":{"x":22,"y":59}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":13,"y":67}},{"type":"GEARBOX","position":{"x":67,"y":83}},
          {"type":"FUEL","position":{"x":25,"y":68}},{"type":"EXHAUST","position":{"x":27,"y":40}},
          {"type":"ENGINE","position":{"x":68,"y":62}},{"type":"COMPRESSOR","position":{"x":51,"y":62}}]
  },
  [EEquipmentModel.ASTRA_HD9_TRACTOR]: {
    name: 'Astra HD9 Tractor 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.ASTRA,
    image: ASTRA_HD9_TRACTOR_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":78}},{"type":"SUSPENSION","position":{"x":40,"y":59}},
          {"type":"WHEELS","position":{"x":30,"y":79}},{"type":"BODY","position":{"x":50,"y":46}},
          {"type":"FRAME","position":{"x":61,"y":81}},{"type":"INTERIOR","position":{"x":45,"y":31}},
          {"type":"BATTERY","position":{"x":82,"y":52}},{"type":"ELECTRONIC","position":{"x":76,"y":43}},
          {"type":"LIGHTS","position":{"x":90,"y":59}},{"type":"LOAD","position":{"x":22,"y":59}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":13,"y":67}},{"type":"GEARBOX","position":{"x":67,"y":83}},
          {"type":"FUEL","position":{"x":25,"y":68}},{"type":"EXHAUST","position":{"x":27,"y":40}},
          {"type":"ENGINE","position":{"x":68,"y":62}},{"type":"COMPRESSOR","position":{"x":51,"y":62}}]
  },
  [EEquipmentModel.ASTRA_HHD9_TRACTOR]: {
    name: 'Astra HHD9 Tractor 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.ASTRA,
    image: ASTRA_HHD9_TRACTOR_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":78}},{"type":"SUSPENSION","position":{"x":40,"y":59}},
          {"type":"WHEELS","position":{"x":30,"y":79}},{"type":"BODY","position":{"x":50,"y":46}},
          {"type":"FRAME","position":{"x":61,"y":81}},{"type":"INTERIOR","position":{"x":45,"y":31}},
          {"type":"BATTERY","position":{"x":82,"y":52}},{"type":"ELECTRONIC","position":{"x":76,"y":43}},
          {"type":"LIGHTS","position":{"x":90,"y":59}},{"type":"LOAD","position":{"x":22,"y":59}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":13,"y":67}},{"type":"GEARBOX","position":{"x":67,"y":83}},
          {"type":"FUEL","position":{"x":25,"y":68}},{"type":"EXHAUST","position":{"x":27,"y":40}},
          {"type":"ENGINE","position":{"x":68,"y":62}},{"type":"COMPRESSOR","position":{"x":51,"y":62}}]
  },
  [EEquipmentModel.CHEETAH_CONTAINER_20_40_MAXIMIZER_12_PIN]: {
    name: 'Cheetah Container 20-40\' Maximizer 12-PIN 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_1_1_AXLES,
    brand: EBrand.CHEETAH,
    image: CHEETAH_CONTAINER_20_40_MAXIMIZER_12_PIN_IMG,
    parts: [{"type":"BRAKES","position":{"x":58,"y":55}},{"type":"WHEELS","position":{"x":52,"y":56}},
            {"type":"SUSPENSION","position":{"x":54,"y":49}},{"type":"FRAME","position":{"x":43,"y":49}},
            {"type":"LIGHTS","position":{"x":91,"y":55}},{"type":"TRAILER_ATTACHMENT","position":{"x":9,"y":46}},
            {"type":"SUPPORT","position":{"x":21,"y":50}}, {"type":"LOAD","position":{"x":50,"y":47}}]
  },
  [EEquipmentModel.CHEETAH_FLATBED]: {
    name: 'Cheetah Flatbed 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.CHEETAH,
    image: CHEETAH_FLATBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":67,"y":65}},{"type":"WHEELS","position":{"x":55,"y":66}},
            {"type":"SUSPENSION","position":{"x":58,"y":61}},{"type":"FRAME","position":{"x":37,"y":50}},
            {"type":"SUPPORT","position":{"x":15,"y":46}},{"type":"LIGHTS","position":{"x":89,"y":57}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":17,"y":39}}, {"type":"LOAD","position":{"x":50,"y":47}}]
  },
  [EEquipmentModel.CHEETAH_CONTAINER_GOOSENECK_41_45]: {
    name: 'Cheetah Container 41-45\' Gooseneck 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.CHEETAH,
    image: CHEETAH_CONTAINER_GOOSENECK_41_45_IMG,
    parts: [{"type":"BRAKES","position":{"x":34,"y":53}},{"type":"SUSPENSION","position":{"x":38,"y":49}},
    {"type":"WHEELS","position":{"x":42,"y":53}},{"type":"FRAME","position":{"x":61,"y":44}},
    {"type":"SUPPORT","position":{"x":83,"y":44}},{"type":"LIGHTS","position":{"x":21,"y":57}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":88,"y":38}}, {"type":"LOAD","position":{"x":45,"y":43}}]
  },
  [EEquipmentModel.CHEETAH_CONTAINER_20_40_SPREAD_CITY]: {
    name: 'Cheetah Container 20-40\' City Spread 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_2_AXLES,
    brand: EBrand.CHEETAH,
    image: CHEETAH_CONTAINER_20_40_SPREAD_CITY_IMG,
    parts: [{"type":"BRAKES","position":{"x":34,"y":53}},{"type":"SUSPENSION","position":{"x":38,"y":49}},
    {"type":"WHEELS","position":{"x":42,"y":53}},{"type":"FRAME","position":{"x":61,"y":44}},
    {"type":"SUPPORT","position":{"x":83,"y":44}},{"type":"LIGHTS","position":{"x":21,"y":57}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":88,"y":38}}, {"type":"LOAD","position":{"x":60,"y":46}}]
  },
  [EEquipmentModel.CITROEN_JUMPER_L2H2]: {
    name: 'Citroën Jumper L2H2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2H2,
    brand: EBrand.CITROEN,
    image: CITROEN_JUMPER_L2H2_IMG,
    parts: [{"type":"BRAKES","position":{"x":65,"y":66}},{"type":"WHEELS","position":{"x":56,"y":65}},
            {"type":"SUSPENSION","position":{"x":60,"y":58}},{"type":"INTERIOR","position":{"x":64,"y":40}},
            {"type":"FRAME","position":{"x":40,"y":64}},{"type":"BODY","position":{"x":50,"y":54}},
            {"type":"BATTERY","position":{"x":71,"y":56}},{"type":"ELECTRONIC","position":{"x":63,"y":50}},
            {"type":"LIGHTS","position":{"x":69,"y":49}},{"type":"DOORS","position":{"x":23,"y":46}},
            {"type":"ENGINE","position":{"x":80,"y":52}},{"type":"EXHAUST","position":{"x":48,"y":65}},
            {"type":"FUEL","position":{"x":57,"y":49}},{"type":"GEARBOX","position":{"x":74,"y":61}},
            {"type":"LOAD","position":{"x":18,"y":47}}]
  },  
  [EEquipmentModel.CITROEN_JUMPER_L1H1_FRAME]: {
    name: 'Citroën Jumper L1H1 Frame',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1BODY,
    brand: EBrand.CITROEN,
    image: CITROEN_JUMPER_L1H1_FRAME_IMG,
    parts: [{"type":"BRAKES","position":{"x":78,"y":61}},{"type":"SUSPENSION","position":{"x":81,"y":54}},
    {"type":"WHEELS","position":{"x":83,"y":62}},{"type":"BODY","position":{"x":65,"y":53}},
    {"type":"FRAME","position":{"x":53,"y":60}},{"type":"INTERIOR","position":{"x":70,"y":43}},
    {"type":"ENGINE","position":{"x":86,"y":48}},{"type":"LIGHTS","position":{"x":91,"y":47}},
    {"type":"ELECTRONIC","position":{"x":86,"y":44}},{"type":"BATTERY","position":{"x":90,"y":52}},
    {"type":"EXHAUST","position":{"x":60,"y":62}},{"type":"FUEL","position":{"x":59,"y":46}},
    {"type":"GEARBOX","position":{"x":85,"y":53}}]
  },
  [EEquipmentModel.CONTRAL_CDU_53_CONTAINER]: {
    name: 'Contral CDU 53 Container 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_2_AXLES,
    brand: EBrand.CONTRAL,
    image: CONTRAL_CDU_53_CONTAINER_IMG,
    parts: [{"type":"BRAKES","position":{"x":18,"y":48}},{"type":"SUSPENSION","position":{"x":15,"y":47}},
            {"type":"WHEELS","position":{"x":14,"y":51}},{"type":"FRAME","position":{"x":39,"y":51}},
            {"type":"SUPPORT","position":{"x":58,"y":59}},{"type":"LIGHTS","position":{"x":8,"y":47}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":77,"y":48}}, {"type":"LOAD","position":{"x":29,"y":46}}]
  },
  [EEquipmentModel.DAF_CF_6x2]: {
    name: 'DAF CF 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.DAF,
    image: DAF_CF_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":44,"y":78}},{"type":"SUSPENSION","position":{"x":49,"y":64}},
    {"type":"WHEELS","position":{"x":55,"y":75}},{"type":"BODY","position":{"x":35,"y":53}},
    {"type":"FRAME","position":{"x":28,"y":77}},{"type":"INTERIOR","position":{"x":30,"y":40}},
    {"type":"BATTERY","position":{"x":24,"y":59}},{"type":"ELECTRONIC","position":{"x":28,"y":54}},
    {"type":"LIGHTS","position":{"x":35,"y":68}},{"type":"FIFTH_WHEEL","position":{"x":68,"y":63}},
    {"type":"COMPRESSOR","position":{"x":8,"y":69}},{"type":"ENGINE","position":{"x":17,"y":69}},
    {"type":"EXHAUST","position":{"x":51,"y":28}},{"type":"FUEL","position":{"x":63,"y":70}},
    {"type":"GEARBOX","position":{"x":18,"y":77}}]
  },
  [EEquipmentModel.DAF_LF_TANDEM_4x2]: {
    name: 'DAF LF Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.DAF,
    image: DAF_LF_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":62,"y":77}},{"type":"SUSPENSION","position":{"x":57,"y":68}},
    {"type":"WHEELS","position":{"x":55,"y":78}},{"type":"BODY","position":{"x":53,"y":58}},
    {"type":"FRAME","position":{"x":49,"y":75}},{"type":"INTERIOR","position":{"x":60,"y":48}},
    {"type":"ELECTRONIC","position":{"x":81,"y":61}},{"type":"LIGHTS","position":{"x":72,"y":75}},
    {"type":"BATTERY","position":{"x":88,"y":64}},{"type":"DOORS","position":{"x":14,"y":56}},
    {"type":"LOAD","position":{"x":29,"y":65}},{"type":"COMPRESSOR","position":{"x":78,"y":75}},
    {"type":"ENGINE","position":{"x":84,"y":72}},{"type":"EXHAUST","position":{"x":35,"y":78}},
    {"type":"GEARBOX","position":{"x":81,"y":79}},{"type":"FUEL","position":{"x":41,"y":73}}]
  },
  [EEquipmentModel.DAF_XF_105_4x2]: {
    name: 'DAF XF 105 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.DAF,
    image: DAF_XF_105_4x2_IMG,
    parts: [{"type":"SUSPENSION","position":{"x":57,"y":68}},{"type":"WHEELS","position":{"x":59,"y":79}},
            {"type":"BRAKES","position":{"x":52,"y":78}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":60}},
            {"type":"COMPRESSOR","position":{"x":16,"y":70}},{"type":"ENGINE","position":{"x":25,"y":77}},
            {"type":"EXHAUST","position":{"x":67,"y":80}},{"type":"FUEL","position":{"x":69,"y":69}},
            {"type":"GEARBOX","position":{"x":31,"y":73}},{"type":"LIGHTS","position":{"x":12,"y":72}},
            {"type":"ELECTRONIC","position":{"x":26,"y":55}},{"type":"BATTERY","position":{"x":32,"y":67}},
            {"type":"INTERIOR","position":{"x":18,"y":41}},{"type":"BODY","position":{"x":15,"y":51}},
            {"type":"FRAME","position":{"x":13,"y":78}}]
  },
  [EEquipmentModel.DAF_XF_105_6x2]: {
    name: 'DAF XF 105 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.DAF,
    image: DAF_XF_105_6x2_IMG,
    parts: [{"type":"WHEELS","position":{"x":56,"y":78}},{"type":"SUSPENSION","position":{"x":53,"y":67}},
            {"type":"BRAKES","position":{"x":45,"y":77}},{"type":"ENGINE","position":{"x":22,"y":73}},
            {"type":"COMPRESSOR","position":{"x":15,"y":70}},{"type":"GEARBOX","position":{"x":28,"y":70}},
            {"type":"FUEL","position":{"x":65,"y":69}},{"type":"EXHAUST","position":{"x":63,"y":79}},
            {"type":"FIFTH_WHEEL","position":{"x":70,"y":58}},{"type":"BODY","position":{"x":7,"y":51}},
            {"type":"FRAME","position":{"x":9,"y":77}},{"type":"INTERIOR","position":{"x":16,"y":37}},
            {"type":"LIGHTS","position":{"x":8,"y":70}},{"type":"BATTERY","position":{"x":23,"y":67}},
            {"type":"ELECTRONIC","position":{"x":20,"y":57}}]
  },
  [EEquipmentModel.DAF_XF_106_4x2]: {
    name: 'DAF XF 106 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.DAF,
    image: DAF_XF_106_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":79}},{"type":"SUSPENSION","position":{"x":54,"y":68}},
            {"type":"WHEELS","position":{"x":58,"y":78}},{"type":"LIGHTS","position":{"x":11,"y":71}},
            {"type":"BATTERY","position":{"x":38,"y":68}},{"type":"ELECTRONIC","position":{"x":23,"y":62}},
            {"type":"FIFTH_WHEEL","position":{"x":71,"y":58}},{"type":"COMPRESSOR","position":{"x":19,"y":73}},
            {"type":"ENGINE","position":{"x":26,"y":77}},{"type":"GEARBOX","position":{"x":35,"y":75}},
            {"type":"EXHAUST","position":{"x":66,"y":77}},{"type":"FUEL","position":{"x":71,"y":65}},
            {"type":"INTERIOR","position":{"x":25,"y":39}},{"type":"FRAME","position":{"x":13,"y":78}},
            {"type":"BODY","position":{"x":15,"y":53}}]
  },
  [EEquipmentModel.DAF_XF_106_6x2]: {
    name: 'DAF XF 106 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.DAF,
    image: DAF_XF_106_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":79}},{"type":"WHEELS","position":{"x":58,"y":78}},
            {"type":"SUSPENSION","position":{"x":56,"y":67}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":58}},
            {"type":"FUEL","position":{"x":67,"y":68}},{"type":"GEARBOX","position":{"x":33,"y":77}},
            {"type":"ENGINE","position":{"x":25,"y":76}},{"type":"EXHAUST","position":{"x":45,"y":72}},
            {"type":"COMPRESSOR","position":{"x":16,"y":73}},{"type":"LIGHTS","position":{"x":10,"y":71}},
            {"type":"ELECTRONIC","position":{"x":22,"y":60}},{"type":"BATTERY","position":{"x":24,"y":67}},
            {"type":"BODY","position":{"x":12,"y":50}},{"type":"FRAME","position":{"x":9,"y":76}},
            {"type":"INTERIOR","position":{"x":19,"y":37}}]
  },
  [EEquipmentModel.DAF_XF_106_8x4]: {
    name: 'DAF XF 106 8x4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T8x4,
    brand: EBrand.DAF,
    image: DAF_XF_106_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":82}},{"type":"SUSPENSION","position":{"x":52,"y":66}},
    {"type":"WHEELS","position":{"x":55,"y":77}},{"type":"BODY","position":{"x":38,"y":57}},
    {"type":"FRAME","position":{"x":41,"y":82}},{"type":"INTERIOR","position":{"x":34,"y":41}},
    {"type":"BATTERY","position":{"x":27,"y":66}},{"type":"ELECTRONIC","position":{"x":31,"y":57}},
    {"type":"LIGHTS","position":{"x":35,"y":75}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":64}},
    {"type":"COMPRESSOR","position":{"x":8,"y":72}},{"type":"ENGINE","position":{"x":20,"y":72}},
    {"type":"EXHAUST","position":{"x":69,"y":81}},{"type":"FUEL","position":{"x":64,"y":76}},
    {"type":"GEARBOX","position":{"x":24,"y":82}}]
  },
  [EEquipmentModel.DOEPKER_55T_SINGLE_DROP_LOWBED]: {
    name: 'Doepker 55T Single Drop Lowbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.DOEPKER,
    image: DOEPKER_55T_SINGLE_DROP_LOWBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":52}},{"type":"WHEELS","position":{"x":41,"y":56}},
            {"type":"SUSPENSION","position":{"x":42,"y":49}},{"type":"FRAME","position":{"x":63,"y":53}},
            {"type":"SUPPORT","position":{"x":59,"y":59}},{"type":"LIGHTS","position":{"x":5,"y":42}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":69,"y":55}},{"type":"LOAD","position":{"x":24,"y":43}},
            {"type":"RAMP","position":{"x":10,"y":41}}]
  },
  [EEquipmentModel.DOONAN_DOUBLE_DROP_LOWBED]: {
    name: 'Doonan Double Drop Lowbed 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.DOONAN,
    image: DOONAN_DOUBLE_DROP_LOWBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":26,"y":53}},{"type":"WHEELS","position":{"x":33,"y":55}},
            {"type":"SUSPENSION","position":{"x":32,"y":50}},{"type":"SUPPORT","position":{"x":88,"y":50}},
            {"type":"FRAME","position":{"x":62,"y":51}},{"type":"LIGHTS","position":{"x":16,"y":53}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":91,"y":44}},{"type":"HYDRAULIC","position":{"x":21,"y":54}},
            {"type":"LOAD","position":{"x":67,"y":48}}]
  },
  [EEquipmentModel.DOONAN_FLATBED_CHAP_1_1]: {
    name: 'Doonan Flatbed Chap Trailer 1+1 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.DOONAN,
    image: DOONAN_FLATBED_CHAP_1_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":52}},{"type":"WHEELS","position":{"x":35,"y":53}},
            {"type":"SUSPENSION","position":{"x":39,"y":46}},{"type":"SUPPORT","position":{"x":13,"y":39}},
            {"type":"FRAME","position":{"x":28,"y":40}},{"type":"LIGHTS","position":{"x":68,"y":56}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":9,"y":34}},{"type":"LOAD","position":{"x":42,"y":37}}]
  },
  [EEquipmentModel.DOONAN_FIXED_DOUBLE_DROP_LOWBED]: {
    name: 'Doonan Lowbed Fixed double drop Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.DOONAN,
    image: DOONAN_FIXED_DOUBLE_DROP_LOWBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":65,"y":57}},{"type":"SUSPENSION","position":{"x":61,"y":52}},
          {"type":"WHEELS","position":{"x":60,"y":59}},{"type":"SUPPORT","position":{"x":10,"y":47}},
          {"type":"FRAME","position":{"x":21,"y":48}},{"type":"LIGHTS","position":{"x":79,"y":59}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":10,"y":37}},{"type":"LOAD","position":{"x":33,"y":48}}]
  },
  [EEquipmentModel.DORSEY_FLATBED_ALUMINIUM_GIANT]: {
    name: 'Dorsey Flatbed Aluminium Giant 1+1 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.DORSEY,
    image: DORSEY_FLATBED_ALUMINIUM_GIANT_IMG,
    parts: [{"type":"BRAKES","position":{"x":81,"y":47}},{"type":"SUSPENSION","position":{"x":83,"y":42}},
            {"type":"WHEELS","position":{"x":88,"y":47}},{"type":"FRAME","position":{"x":55,"y":46}},
            {"type":"SUPPORT","position":{"x":46,"y":60}},{"type":"LIGHTS","position":{"x":95,"y":41}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":24,"y":50}},{"type":"LOAD","position":{"x":48,"y":43}}]
  },
  [EEquipmentModel.DORSEY_FLATBED_STEEL_GIANT]: {
    name: 'Dorsey Flatbed Steelu Giant 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.DORSEY,
    image: DORSEY_FLATBED_STEEL_GIANT_IMG,
    parts: [{"type":"BRAKES","position":{"x":60,"y":56}},{"type":"WHEELS","position":{"x":52,"y":62}},
            {"type":"SUSPENSION","position":{"x":53,"y":51}},{"type":"SUPPORT","position":{"x":12,"y":45}},
            {"type":"FRAME","position":{"x":25,"y":42}},{"type":"LIGHTS","position":{"x":81,"y":55}},
            {"type":"LOAD","position":{"x":43,"y":41}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":36}}]
  },
  [EEquipmentModel.EAST_FLATBED_BEAST]: {
    name: 'East Flatbed Beast 1+1 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.EAST,
    image: EAST_FLATBED_BEAST_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":50}},{"type":"WHEELS","position":{"x":62,"y":51}},
            {"type":"SUSPENSION","position":{"x":61,"y":43}},{"type":"FRAME","position":{"x":72,"y":41}},
            {"type":"SUPPORT","position":{"x":86,"y":46}},{"type":"LIGHTS","position":{"x":17,"y":44}},
            {"type":"LOAD","position":{"x":45,"y":38}},{"type":"TRAILER_ATTACHMENT","position":{"x":92,"y":40}}]
  },
  [EEquipmentModel.EAST_FLATBED_BEAST_2]: {
    name: 'East Flatbed Beast 2 1+1 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.EAST,
    image: EAST_FLATBED_BEAST_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":54}},{"type":"SUSPENSION","position":{"x":41,"y":45}},
            {"type":"WHEELS","position":{"x":36,"y":57}},{"type":"FRAME","position":{"x":23,"y":44}},
            {"type":"SUPPORT","position":{"x":13,"y":50}},{"type":"LIGHTS","position":{"x":61,"y":44}},
            {"type":"LOAD","position":{"x":48,"y":38}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":42}}]
  },
  [EEquipmentModel.EAST_LOWBED_BEAST_DROP_DECK]: {
    name: 'East Lowbed Beast Drop Deck 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.EAST,
    image: EAST_LOWBED_BEAST_DROP_DECK_IMG,
    parts: [{"type":"BRAKES","position":{"x":14,"y":51}},{"type":"SUSPENSION","position":{"x":9,"y":48}},
            {"type":"WHEELS","position":{"x":7,"y":54}},{"type":"FRAME","position":{"x":51,"y":52}},
            {"type":"SUPPORT","position":{"x":53,"y":58}},{"type":"LIGHTS","position":{"x":2,"y":49}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":80,"y":44}},{"type":"LOAD","position":{"x":33,"y":46}}]
  },
  [EEquipmentModel.EAST_STEEL_DUMP]: {
    name: 'East Steel Dump 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_2_AXLES,
    brand: EBrand.EAST,
    image: EAST_STEEL_DUMP_IMG,
    parts: [{"type":"BRAKES","position":{"x":70,"y":66}},{"type":"SUSPENSION","position":{"x":76,"y":60}},
            {"type":"WHEELS","position":{"x":80,"y":67}},{"type":"SUPPORT","position":{"x":53,"y":72}},
            {"type":"FRAME","position":{"x":41,"y":59}},{"type":"LIGHTS","position":{"x":95,"y":57}},
            {"type":"LOAD","position":{"x":53,"y":43}},{"type":"TRAILER_ATTACHMENT","position":{"x":25,"y":59}},
            {"type":"HYDRAULIC","position":{"x":19,"y":55}}]
  },
  [EEquipmentModel.FELLING_FLATBED]: {
    name: 'Felling Trailers Flatbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.FELLING,
    image: FELLING_FLATBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":36,"y":53}},{"type":"WHEELS","position":{"x":45,"y":53}},
            {"type":"SUSPENSION","position":{"x":38,"y":47}},{"type":"FRAME","position":{"x":72,"y":45}},
            {"type":"SUPPORT","position":{"x":86,"y":51}},{"type":"LIGHTS","position":{"x":17,"y":46}},
            {"type":"LOAD","position":{"x":50,"y":41}},{"type":"TRAILER_ATTACHMENT","position":{"x":89,"y":42}}]
  },
  [EEquipmentModel.FELLING_LOWBED]: {
    name: 'Felling Trailers Lowbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FELLING,
    image: FELLING_LOWBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":71,"y":53}},{"type":"SUSPENSION","position":{"x":76,"y":47}},
            {"type":"WHEELS","position":{"x":79,"y":57}},{"type":"LIGHTS","position":{"x":94,"y":52}},
            {"type":"SUPPORT","position":{"x":27,"y":59}},{"type":"FRAME","position":{"x":48,"y":57}},
            {"type":"LOAD","position":{"x":45,"y":49}},{"type":"TRAILER_ATTACHMENT","position":{"x":9,"y":49}}]
  },
  [EEquipmentModel.FERREE_LTV35_LOWBED]: {
    name: 'Ferree Trailers Lowbed LTV35 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.FERREE,
    image: FERREE_LTV35_LOWBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":46}},{"type":"WHEELS","position":{"x":38,"y":52}},
            {"type":"SUSPENSION","position":{"x":40,"y":39}},{"type":"FRAME","position":{"x":22,"y":49}},
            {"type":"SUPPORT","position":{"x":3,"y":45}},{"type":"LIGHTS","position":{"x":69,"y":47}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":10,"y":33}},{"type":"LOAD","position":{"x":28,"y":41}}]
  },
  [EEquipmentModel.FERREE_LTV51_LOWBED]: {
    name: 'Ferree Trailers Lowbed LTV51 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FERREE,
    image: FERREE_LTV51_LOWBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":53}},{"type":"WHEELS","position":{"x":43,"y":55}},
            {"type":"SUSPENSION","position":{"x":44,"y":45}},{"type":"SUPPORT","position":{"x":11,"y":44}},
            {"type":"FRAME","position":{"x":28,"y":49}},{"type":"LOAD","position":{"x":34,"y":45}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":5,"y":35}},{"type":"LIGHTS","position":{"x":76,"y":53}}]
  },
  [EEquipmentModel.FERREE_LTTV51DS_LOWBED]: {
    name: 'Ferree Trailers Lowbed LTTV51 DS 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FERREE,
    image: FERREE_LTTV51DS_LOWBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":81,"y":47}},{"type":"SUSPENSION","position":{"x":88,"y":47}},
            {"type":"WHEELS","position":{"x":83,"y":56}},{"type":"SUPPORT","position":{"x":38,"y":60}},
            {"type":"FRAME","position":{"x":57,"y":55}},{"type":"LIGHTS","position":{"x":96,"y":49}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":19,"y":44}},{"type":"LOAD","position":{"x":66,"y":50}}]
  },
  [EEquipmentModel.FERREE_LTTV55_LOWBED]: {
    name: 'Ferree Trailers Lowbed LTV55 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FERREE,
    image: FERREE_LTTV55_LOWBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":80,"y":46}},{"type":"WHEELS","position":{"x":85,"y":49}},
            {"type":"SUSPENSION","position":{"x":86,"y":43}},{"type":"FRAME","position":{"x":55,"y":53}},
            {"type":"SUPPORT","position":{"x":44,"y":55}},{"type":"LIGHTS","position":{"x":94,"y":43}},
            {"type":"LOAD","position":{"x":63,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":9,"y":42}}]
  },
  [EEquipmentModel.FIAT_DUCATO_L2H2]: {
    name: 'Fiat Ducato L2H2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2H2,
    brand: EBrand.FIAT,
    image: FIAT_DUCATO_L2H2_IMG,
    parts: [{"type":"BRAKES","position":{"x":54,"y":73}},{"type":"SUSPENSION","position":{"x":47,"y":60}},
            {"type":"WHEELS","position":{"x":46,"y":72}},{"type":"FRAME","position":{"x":29,"y":70}},
            {"type":"BODY","position":{"x":37,"y":54}},{"type":"INTERIOR","position":{"x":54,"y":38}},
            {"type":"BATTERY","position":{"x":54,"y":59}},{"type":"ELECTRONIC","position":{"x":67,"y":56}},
            {"type":"LIGHTS","position":{"x":56,"y":52}},{"type":"DOORS","position":{"x":20,"y":45}},
            {"type":"LOAD","position":{"x":18,"y":55}},{"type":"ENGINE","position":{"x":78,"y":63}},
            {"type":"EXHAUST","position":{"x":72,"y":74}},{"type":"FUEL","position":{"x":80,"y":50}},
            {"type":"GEARBOX","position":{"x":61,"y":68}}]
  },
  [EEquipmentModel.FONTAINE_INFINITY_TOP_FLATBED]: {
    name: 'Fontaine Trailers Flatbed Infinity Top 1+1 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_INFINITY_TOP_FLATBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":34,"y":54}},{"type":"SUSPENSION","position":{"x":20,"y":39}},
            {"type":"WHEELS","position":{"x":18,"y":61}},{"type":"FRAME","position":{"x":53,"y":43}},
            {"type":"SUPPORT","position":{"x":5,"y":36}},{"type":"LIGHTS","position":{"x":33,"y":40}},
            {"type":"LOAD","position":{"x":29,"y":28}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":29}}]
  },
  [EEquipmentModel.FONTAINE_VELOCITY_TOP_FLATBED]: {
    name: 'Fontaine Trailers Flatbed Velocity Top 1+1 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_VELOCITY_TOP_FLATBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":86,"y":45}},{"type":"SUSPENSION","position":{"x":86,"y":42}},
            {"type":"WHEELS","position":{"x":93,"y":46}},{"type":"FRAME","position":{"x":74,"y":44}},
            {"type":"SUPPORT","position":{"x":69,"y":54}},{"type":"LIGHTS","position":{"x":97,"y":37}},
            {"type":"LOAD","position":{"x":58,"y":39}},{"type":"TRAILER_ATTACHMENT","position":{"x":24,"y":49}}]
  },
  [EEquipmentModel.FONTAINE_MAGNITUDE_51]: {
    name: 'Fontaine Trailers Magnitude 51 Lowbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_MAGNITUDE_51_IMG,
    parts: [{"type":"BRAKES","position":{"x":73,"y":52}},{"type":"SUSPENSION","position":{"x":77,"y":50}},
          {"type":"WHEELS","position":{"x":75,"y":55}},{"type":"SUPPORT","position":{"x":19,"y":56}},
          {"type":"FRAME","position":{"x":38,"y":52}},{"type":"LIGHTS","position":{"x":95,"y":52}},
          {"type":"LOAD","position":{"x":53,"y":53}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":46}}]
  },
  [EEquipmentModel.FONTAINE_MAGNITUDE_55H_FLD]: {
    name: 'Fontaine Trailers Magnitude 55H FLD Lowbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_MAGNITUDE_55H_FLD_IMG,
    parts: [{"type":"BRAKES","position":{"x":15,"y":45}},{"type":"SUSPENSION","position":{"x":8,"y":43}},
        {"type":"WHEELS","position":{"x":10,"y":49}},{"type":"FRAME","position":{"x":41,"y":58}},
        {"type":"SUPPORT","position":{"x":52,"y":58}},{"type":"LIGHTS","position":{"x":2,"y":43}},
        {"type":"LOAD","position":{"x":34,"y":48}},{"type":"TRAILER_ATTACHMENT","position":{"x":84,"y":46}}]
  },
  [EEquipmentModel.FONTAINE_MAGNITUDE_55H_DSR]: {
    name: 'Fontaine Trailers Magnitude 55H DSR Lowbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_MAGNITUDE_55H_DSR_IMG,
    parts: [{"type":"BRAKES","position":{"x":14,"y":45}},{"type":"SUSPENSION","position":{"x":8,"y":42}},
          {"type":"WHEELS","position":{"x":9,"y":50}},{"type":"FRAME","position":{"x":34,"y":55}},
          {"type":"SUPPORT","position":{"x":50,"y":62}},{"type":"LIGHTS","position":{"x":0,"y":43}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":84,"y":46}},{"type":"LOAD","position":{"x":35,"y":49}}]
  },
  [EEquipmentModel.FONTAINE_MAGNITUDE_55L]: {
    name: 'Fontaine Trailers Magnitude 55L Lowbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_MAGNITUDE_55L_IMG,
    parts: [{"type":"BRAKES","position":{"x":79,"y":44}},{"type":"SUSPENSION","position":{"x":84,"y":41}},
            {"type":"WHEELS","position":{"x":86,"y":47}},{"type":"SUPPORT","position":{"x":33,"y":57}},
            {"type":"FRAME","position":{"x":52,"y":53}},{"type":"LIGHTS","position":{"x":96,"y":41}},
            {"type":"LOAD","position":{"x":61,"y":48}},{"type":"TRAILER_ATTACHMENT","position":{"x":13,"y":48}}]
  },
  [EEquipmentModel.FONTAINE_MAGNITUDE_55L_PLUS]: {
    name: 'Fontaine Trailers Magnitude 55L Plus Lowbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_MAGNITUDE_55L_PLUS_IMG,
    parts: [{"type":"BRAKES","position":{"x":77,"y":45}},{"type":"SUSPENSION","position":{"x":83,"y":41}},
            {"type":"WHEELS","position":{"x":87,"y":46}},{"type":"SUPPORT","position":{"x":31,"y":60}},
            {"type":"FRAME","position":{"x":52,"y":52}},{"type":"LIGHTS","position":{"x":96,"y":41}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":8,"y":47}},{"type":"LOAD","position":{"x":60,"y":46}}]
  },
  [EEquipmentModel.FONTAINE_MAGNITUDE_55H_MFLD]: {
    name: 'Fontaine Trailers Magnitude 55H MFLD Lowbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_MAGNITUDE_55H_MFLD_IMG,
    parts: [{"type":"BRAKES","position":{"x":14,"y":44}},{"type":"WHEELS","position":{"x":7,"y":47}},
          {"type":"SUSPENSION","position":{"x":9,"y":42}},{"type":"SUPPORT","position":{"x":50,"y":59}},
          {"type":"FRAME","position":{"x":31,"y":54}},{"type":"LIGHTS","position":{"x":0,"y":43}},
          {"type":"LOAD","position":{"x":37,"y":47}},{"type":"TRAILER_ATTACHMENT","position":{"x":84,"y":46}}]
  },
  [EEquipmentModel.FONTAINE_MAGNITUDE_55H_MDSR]: {
    name: 'Fontaine Trailers Magnitude 55H MDSR Lowbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_MAGNITUDE_55H_MDSR_IMG,
    parts: [{"type":"BRAKES","position":{"x":14,"y":44}},{"type":"WHEELS","position":{"x":8,"y":49}},
          {"type":"SUSPENSION","position":{"x":7,"y":42}},{"type":"FRAME","position":{"x":34,"y":55}},
          {"type":"SUPPORT","position":{"x":51,"y":59}},{"type":"LIGHTS","position":{"x":2,"y":43}},
          {"type":"LOAD","position":{"x":36,"y":50}},{"type":"TRAILER_ATTACHMENT","position":{"x":87,"y":45}}]
  },
  [EEquipmentModel.FONTAINE_MAGNITUDE_55H_MBMD]: {
    name: 'Fontaine Trailers Magnitude 55H MBMD Lowbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_MAGNITUDE_55H_MBMD_IMG,
    parts: [{"type":"BRAKES","position":{"x":16,"y":48}},{"type":"SUSPENSION","position":{"x":11,"y":44}},
          {"type":"WHEELS","position":{"x":9,"y":50}},{"type":"SUPPORT","position":{"x":57,"y":60}},
          {"type":"FRAME","position":{"x":31,"y":53}},{"type":"LIGHTS","position":{"x":3,"y":45}},
          {"type":"LOAD","position":{"x":42,"y":51}},{"type":"TRAILER_ATTACHMENT","position":{"x":85,"y":48}}]
  },
  [EEquipmentModel.FONTAINE_MAGNITUDE_55H_MX]: {
    name: 'Fontaine Trailers Magnitude 55H MX Lowbed 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_MAGNITUDE_55H_MX_IMG,
    parts: [{"type":"BRAKES","position":{"x":37,"y":43}},{"type":"SUSPENSION","position":{"x":35,"y":37}},
          {"type":"WHEELS","position":{"x":23,"y":51}},{"type":"SUPPORT","position":{"x":2,"y":29}},
          {"type":"FRAME","position":{"x":13,"y":33}},{"type":"LIGHTS","position":{"x":43,"y":51}},
          {"type":"LOAD","position":{"x":19,"y":32}},{"type":"TRAILER_ATTACHMENT","position":{"x":6,"y":24}}]
  },
  [EEquipmentModel.FONTAINE_RENEGADE_LXL]: {
    name: 'Fontaine Trailers Renegade LXL Lowbed 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_RENEGADE_LXL_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":54}},{"type":"WHEELS","position":{"x":48,"y":61}},
          {"type":"SUSPENSION","position":{"x":53,"y":49}},{"type":"LIGHTS","position":{"x":70,"y":53}},
          {"type":"SUPPORT","position":{"x":7,"y":53}},{"type":"FRAME","position":{"x":29,"y":57}},
          {"type":"LOAD","position":{"x":35,"y":53}},{"type":"TRAILER_ATTACHMENT","position":{"x":8,"y":45}}]
  },
  [EEquipmentModel.FONTAINE_RENEGADE_LX40]: {
    name: 'Fontaine Trailers Renegade LX40 Lowbed 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_RENEGADE_LX40_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":56}},{"type":"SUSPENSION","position":{"x":54,"y":49}},
          {"type":"WHEELS","position":{"x":46,"y":57}},{"type":"SUPPORT","position":{"x":9,"y":50}},
          {"type":"FRAME","position":{"x":29,"y":54}},{"type":"LIGHTS","position":{"x":67,"y":51}},
          {"type":"LOAD","position":{"x":36,"y":50}},{"type":"TRAILER_ATTACHMENT","position":{"x":8,"y":42}}]
  },
  [EEquipmentModel.FONTAINE_RENEGADE_LXT40]: {
    name: 'Fontaine Trailers Renegade LXT40 Lowbed 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_RENEGADE_LXT40_IMG,
    parts: [{"type":"BRAKES","position":{"x":59,"y":55}},{"type":"WHEELS","position":{"x":51,"y":56}},
          {"type":"SUSPENSION","position":{"x":54,"y":50}},{"type":"FRAME","position":{"x":39,"y":51}},
          {"type":"SUPPORT","position":{"x":7,"y":50}},{"type":"LIGHTS","position":{"x":72,"y":52}},
          {"type":"LOAD","position":{"x":24,"y":48}},{"type":"TRAILER_ATTACHMENT","position":{"x":6,"y":44}}]
  },
  [EEquipmentModel.FONTAINE_RENEGADE_LX40C]: {
    name: 'Fontaine Trailers Renegade LX40C Lowbed 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_RENEGADE_LX40C_IMG,
    parts: [{"type":"BRAKES","position":{"x":83,"y":57}},{"type":"SUSPENSION","position":{"x":86,"y":54}},
          {"type":"WHEELS","position":{"x":87,"y":58}},{"type":"FRAME","position":{"x":37,"y":57}},
          {"type":"SUPPORT","position":{"x":18,"y":58}},{"type":"LIGHTS","position":{"x":97,"y":54}},
          {"type":"LOAD","position":{"x":53,"y":55}},{"type":"TRAILER_ATTACHMENT","position":{"x":6,"y":52}}]
  },
  [EEquipmentModel.FONTAINE_RENEGADE_LXT40C]: {
    name: 'Fontaine Trailers Renegade LXT40C Lowbed 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_RENEGADE_LXT40C_IMG,
    parts: [{"type":"BRAKES","position":{"x":88,"y":55}},{"type":"WHEELS","position":{"x":89,"y":59}},
          {"type":"SUSPENSION","position":{"x":91,"y":54}},{"type":"SUPPORT","position":{"x":13,"y":57}},
          {"type":"FRAME","position":{"x":40,"y":56}},{"type":"LIGHTS","position":{"x":98,"y":54}},
          {"type":"LOAD","position":{"x":49,"y":53}},{"type":"TRAILER_ATTACHMENT","position":{"x":4,"y":53}}]
  },
  [EEquipmentModel.FONTAINE_RENEGADE_LXLN12]: {
    name: 'Fontaine Trailers Renegade LXLN12 Lowbed 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_RENEGADE_LXLN12_IMG,
    parts: [{"type":"BRAKES","position":{"x":84,"y":56}},{"type":"SUSPENSION","position":{"x":86,"y":52}},
          {"type":"WHEELS","position":{"x":88,"y":58}},{"type":"SUPPORT","position":{"x":16,"y":57}},
          {"type":"FRAME","position":{"x":45,"y":57}},{"type":"LIGHTS","position":{"x":98,"y":53}},
          {"type":"LOAD","position":{"x":58,"y":55}},{"type":"TRAILER_ATTACHMENT","position":{"x":4,"y":50}}]
  },
  [EEquipmentModel.FONTAINE_RENEGADE_LXLN14]: {
    name: 'Fontaine Trailers Renegade LXLN14 Lowbed 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_RENEGADE_LXLN14_IMG,
    parts: [{"type":"BRAKES","position":{"x":83,"y":56}},{"type":"SUSPENSION","position":{"x":86,"y":52}},
          {"type":"WHEELS","position":{"x":87,"y":57}},{"type":"SUPPORT","position":{"x":17,"y":58}},
          {"type":"FRAME","position":{"x":41,"y":56}},{"type":"LIGHTS","position":{"x":97,"y":54}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":5,"y":50}},{"type":"LOAD","position":{"x":54,"y":55}}]
  },
  [EEquipmentModel.FONTAINE_RENEGADE_LXN40]: {
    name: 'Fontaine Trailers Renegade LXN40 Lowbed 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_RENEGADE_LXN40_IMG,
    parts: [{"type":"BRAKES","position":{"x":83,"y":56}},{"type":"WHEELS","position":{"x":86,"y":60}},
            {"type":"SUSPENSION","position":{"x":87,"y":52}},{"type":"LIGHTS","position":{"x":98,"y":54}},
            {"type":"SUPPORT","position":{"x":18,"y":58}},{"type":"FRAME","position":{"x":46,"y":55}},
            {"type":"LOAD","position":{"x":55,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":5,"y":51}}]
  },
  [EEquipmentModel.FONTAINE_RENEGADE_LXTN40]: {
    name: 'Fontaine Trailers Renegade LXTN40 Lowbed 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.FONTAINE,
    image: FONTAINE_RENEGADE_LXTN40_IMG,
    parts: [{"type":"BRAKES","position":{"x":89,"y":57}},{"type":"WHEELS","position":{"x":94,"y":58}},
          {"type":"SUSPENSION","position":{"x":93,"y":53}},{"type":"SUPPORT","position":{"x":13,"y":56}},
          {"type":"FRAME","position":{"x":32,"y":55}},{"type":"LIGHTS","position":{"x":98,"y":54}},
          {"type":"LOAD","position":{"x":49,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":4,"y":51}}]
  },
  [EEquipmentModel.FORD_1842T]: {
    name: 'Ford 1842T 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.FORD,
    image: FORD_1842T_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":69}},{"type":"SUSPENSION","position":{"x":57,"y":56}},
            {"type":"WHEELS","position":{"x":64,"y":70}},{"type":"BODY","position":{"x":15,"y":43}},
            {"type":"INTERIOR","position":{"x":30,"y":29}},{"type":"FRAME","position":{"x":17,"y":71}},
            {"type":"ELECTRONIC","position":{"x":37,"y":41}},{"type":"LIGHTS","position":{"x":10,"y":58}},
            {"type":"BATTERY","position":{"x":39,"y":64}},{"type":"FIFTH_WHEEL","position":{"x":75,"y":55}},
            {"type":"COMPRESSOR","position":{"x":12,"y":62}},{"type":"ENGINE","position":{"x":24,"y":65}},
            {"type":"EXHAUST","position":{"x":70,"y":73}},{"type":"FUEL","position":{"x":78,"y":64}},
            {"type":"GEARBOX","position":{"x":33,"y":58}}]
  },
  [EEquipmentModel.FORD_1833]: {
    name: 'Ford 1833 Tandem Semi 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.FORD,
    image: FORD_1833_IMG,
    parts: [{"type":"BRAKES","position":{"x":41,"y":71}},{"type":"WHEELS","position":{"x":48,"y":75}},
        {"type":"SUSPENSION","position":{"x":42,"y":59}},{"type":"BODY","position":{"x":24,"y":52}},
        {"type":"FRAME","position":{"x":23,"y":70}},{"type":"INTERIOR","position":{"x":29,"y":40}},
        {"type":"BATTERY","position":{"x":26,"y":56}},{"type":"ELECTRONIC","position":{"x":29,"y":48}},
        {"type":"LIGHTS","position":{"x":32,"y":63}},{"type":"DOORS","position":{"x":88,"y":53}},
        {"type":"LOAD","position":{"x":67,"y":46}},{"type":"COMPRESSOR","position":{"x":8,"y":63}},
        {"type":"ENGINE","position":{"x":16,"y":63}},{"type":"EXHAUST","position":{"x":53,"y":71}},
        {"type":"FUEL","position":{"x":58,"y":66}},{"type":"GEARBOX","position":{"x":25,"y":61}},
        {"type":"TRAILER_ATTACHMENT","position":{"x":83,"y":67}}]
  },
  [EEquipmentModel.FORD_4142D]: {
    name: 'Ford 4142D Tandem Tipper 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T8x4,
    brand: EBrand.FORD,
    image: FORD_4142D_IMG,
    parts: [{"type":"BRAKES","position":{"x":42,"y":69}},{"type":"WHEELS","position":{"x":50,"y":78}},
          {"type":"SUSPENSION","position":{"x":45,"y":62}},{"type":"BODY","position":{"x":8,"y":53}},
          {"type":"FRAME","position":{"x":14,"y":69}},{"type":"INTERIOR","position":{"x":20,"y":38}},
          {"type":"ELECTRONIC","position":{"x":25,"y":47}},{"type":"BATTERY","position":{"x":23,"y":56}},
          {"type":"LIGHTS","position":{"x":34,"y":57}},{"type":"LOAD","position":{"x":70,"y":45}},
          {"type":"HYDRAULIC","position":{"x":55,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":82,"y":63}},
          {"type":"COMPRESSOR","position":{"x":11,"y":63}},{"type":"ENGINE","position":{"x":20,"y":63}},
          {"type":"EXHAUST","position":{"x":59,"y":72}},{"type":"FUEL","position":{"x":58,"y":62}},
          {"type":"GEARBOX","position":{"x":29,"y":60}}]
  },
  [EEquipmentModel.FORD_FMAX]: {
    name: 'Ford F-MAX 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.FORD,
    image: FORD_FMAX_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":77}},{"type":"SUSPENSION","position":{"x":54,"y":65}},
          {"type":"WHEELS","position":{"x":56,"y":77}},{"type":"BODY","position":{"x":42,"y":53}},
          {"type":"FRAME","position":{"x":42,"y":83}},{"type":"INTERIOR","position":{"x":29,"y":36}},
          {"type":"BATTERY","position":{"x":61,"y":62}},{"type":"ELECTRONIC","position":{"x":36,"y":58}},
          {"type":"LIGHTS","position":{"x":38,"y":75}},{"type":"FIFTH_WHEEL","position":{"x":75,"y":60}},
          {"type":"COMPRESSOR","position":{"x":12,"y":71}},{"type":"ENGINE","position":{"x":22,"y":74}},
          {"type":"EXHAUST","position":{"x":65,"y":79}},{"type":"FUEL","position":{"x":69,"y":65}},
          {"type":"GEARBOX","position":{"x":29,"y":68}}]
  },
  [EEquipmentModel.FORD_TRANSIT_L2H2]: {
    name: 'Ford Transit L2H2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2H2,
    brand: EBrand.FORD,
    image: FORD_TRANSIT_L2H2_IMG,
    parts: [{"type":"BRAKES","position":{"x":44,"y":75}},{"type":"SUSPENSION","position":{"x":40,"y":63}},
            {"type":"WHEELS","position":{"x":32,"y":75}},{"type":"INTERIOR","position":{"x":49,"y":41}},
            {"type":"BODY","position":{"x":32,"y":56}},{"type":"FRAME","position":{"x":27,"y":75}},
            {"type":"BATTERY","position":{"x":50,"y":59}},{"type":"ELECTRONIC","position":{"x":53,"y":50}},
            {"type":"LIGHTS","position":{"x":45,"y":55}},{"type":"DOORS","position":{"x":18,"y":54}},
            {"type":"LOAD","position":{"x":24,"y":53}},{"type":"ENGINE","position":{"x":72,"y":63}},
            {"type":"EXHAUST","position":{"x":63,"y":77}},{"type":"FUEL","position":{"x":81,"y":53}},
            {"type":"GEARBOX","position":{"x":60,"y":66}}]
  },
  [EEquipmentModel.FORD_TRANSIT_L1H1_FRAME]: {
    name: 'Ford Transit L1H1 Frame',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1BODY,
    brand: EBrand.FORD,
    image: FORD_TRANSIT_L1H1_FRAME_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":75}},{"type":"SUSPENSION","position":{"x":41,"y":63}},
            {"type":"WHEELS","position":{"x":35,"y":74}},{"type":"INTERIOR","position":{"x":44,"y":37}},
            {"type":"FRAME","position":{"x":21,"y":70}},{"type":"BODY","position":{"x":28,"y":53}},
            {"type":"LIGHTS","position":{"x":46,"y":50}},{"type":"BATTERY","position":{"x":50,"y":59}},
            {"type":"ELECTRONIC","position":{"x":54,"y":48}},{"type":"ENGINE","position":{"x":70,"y":60}},
            {"type":"EXHAUST","position":{"x":71,"y":75}},{"type":"FUEL","position":{"x":84,"y":51}},
            {"type":"GEARBOX","position":{"x":58,"y":60}}]
  },
  [EEquipmentModel.FREIGHTLINER_CASCADIA_DAY]: {
    name: 'Freightliner Cascadia Day Cab 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.FREIGHTLINER,
    image: FREIGHTLINER_CASCADIA_DAY_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":75}},{"type":"SUSPENSION","position":{"x":45,"y":63}},
            {"type":"WHEELS","position":{"x":53,"y":78}},{"type":"INTERIOR","position":{"x":40,"y":41}},
            {"type":"FRAME","position":{"x":29,"y":78}},{"type":"BODY","position":{"x":23,"y":49}},
            {"type":"BATTERY","position":{"x":35,"y":53}},{"type":"ELECTRONIC","position":{"x":47,"y":55}},
            {"type":"LIGHTS","position":{"x":37,"y":62}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":63}},
            {"type":"COMPRESSOR","position":{"x":9,"y":67}},{"type":"ENGINE","position":{"x":18,"y":67}},
            {"type":"EXHAUST","position":{"x":61,"y":72}},{"type":"FUEL","position":{"x":76,"y":72}},
            {"type":"GEARBOX","position":{"x":30,"y":62}}]
  },
  [EEquipmentModel.FREIGHTLINER_CASCADIA_SLEEPER]: {
    name: 'Freightliner Cascadia Sleeper Cab 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.FREIGHTLINER,
    image: FREIGHTLINER_CASCADIA_SLEEPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":39,"y":69}},{"type":"SUSPENSION","position":{"x":40,"y":58}},
            {"type":"WHEELS","position":{"x":48,"y":67}},{"type":"BODY","position":{"x":30,"y":43}},
            {"type":"FRAME","position":{"x":23,"y":70}},{"type":"INTERIOR","position":{"x":40,"y":37}},
            {"type":"ELECTRONIC","position":{"x":42,"y":47}},{"type":"BATTERY","position":{"x":34,"y":51}},
            {"type":"LIGHTS","position":{"x":33,"y":56}},{"type":"FIFTH_WHEEL","position":{"x":75,"y":58}},
            {"type":"COMPRESSOR","position":{"x":5,"y":64}},{"type":"ENGINE","position":{"x":15,"y":65}},
            {"type":"EXHAUST","position":{"x":54,"y":67}},{"type":"FUEL","position":{"x":72,"y":65}},
            {"type":"GEARBOX","position":{"x":19,"y":59}}]
  },
  [EEquipmentModel.FREIGHTLINER_M2_106]: {
    name: 'Freightliner M2 106 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_big,
    brand: EBrand.FREIGHTLINER,
    image: FREIGHTLINER_M2_106_IMG,
    parts: [{"type":"BRAKES","position":{"x":32,"y":61}},{"type":"WHEELS","position":{"x":39,"y":65}},
          {"type":"SUSPENSION","position":{"x":36,"y":53}},{"type":"INTERIOR","position":{"x":28,"y":41}},
          {"type":"FRAME","position":{"x":23,"y":63}},{"type":"BODY","position":{"x":19,"y":47}},
          {"type":"LIGHTS","position":{"x":27,"y":54}},{"type":"BATTERY","position":{"x":22,"y":55}},
          {"type":"ELECTRONIC","position":{"x":30,"y":48}},{"type":"LOAD","position":{"x":63,"y":54}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":82,"y":56}},{"type":"COMPRESSOR","position":{"x":4,"y":57}},
          {"type":"ENGINE","position":{"x":13,"y":56}},{"type":"EXHAUST","position":{"x":52,"y":59}},
          {"type":"FUEL","position":{"x":51,"y":54}},{"type":"GEARBOX","position":{"x":18,"y":59}}]
  },
  [EEquipmentModel.FREIGHTLINER_M2_112]: {
    name: 'Freightliner M2 112 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2_big,
    brand: EBrand.FREIGHTLINER,
    image: FREIGHTLINER_M2_112_IMG,
    parts: [{"type":"BRAKES","position":{"x":63,"y":72}},{"type":"WHEELS","position":{"x":51,"y":72}},
          {"type":"SUSPENSION","position":{"x":61,"y":66}},{"type":"INTERIOR","position":{"x":58,"y":40}},
          {"type":"FRAME","position":{"x":70,"y":72}},{"type":"BODY","position":{"x":74,"y":57}},
          {"type":"LIGHTS","position":{"x":64,"y":58}},{"type":"ELECTRONIC","position":{"x":87,"y":50}},
          {"type":"BATTERY","position":{"x":92,"y":53}},{"type":"LOAD","position":{"x":30,"y":60}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":15,"y":66}},{"type":"ENGINE","position":{"x":83,"y":62}},
          {"type":"COMPRESSOR","position":{"x":72,"y":65}},{"type":"EXHAUST","position":{"x":40,"y":55}},
          {"type":"FUEL","position":{"x":45,"y":66}},{"type":"GEARBOX","position":{"x":79,"y":68}}]
  },
  [EEquipmentModel.FREIGHTLINER_114SD]: {
    name: 'Freightliner 114SD 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2_big,
    brand: EBrand.FREIGHTLINER,
    image: FREIGHTLINER_114SD_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":64}},{"type":"SUSPENSION","position":{"x":28,"y":56}},
          {"type":"WHEELS","position":{"x":31,"y":64}},{"type":"FRAME","position":{"x":18,"y":66}},
          {"type":"BODY","position":{"x":28,"y":48}},{"type":"INTERIOR","position":{"x":42,"y":40}},
          {"type":"BATTERY","position":{"x":21,"y":50}},{"type":"ELECTRONIC","position":{"x":22,"y":44}},
          {"type":"LIGHTS","position":{"x":18,"y":54}},{"type":"LOAD","position":{"x":67,"y":57}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":88,"y":62}},{"type":"ENGINE","position":{"x":13,"y":58}},
          {"type":"COMPRESSOR","position":{"x":3,"y":60}},{"type":"EXHAUST","position":{"x":31,"y":30}},
          {"type":"FUEL","position":{"x":44,"y":60}},{"type":"GEARBOX","position":{"x":12,"y":68}}]
  },
  [EEquipmentModel.FREIGHTLINER_122SD]: {
    name: 'Freightliner 122SD 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2_big,
    brand: EBrand.FREIGHTLINER,
    image: FREIGHTLINER_122SD_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":78}},{"type":"SUSPENSION","position":{"x":40,"y":59}},
          {"type":"WHEELS","position":{"x":30,"y":79}},{"type":"BODY","position":{"x":50,"y":46}},
          {"type":"FRAME","position":{"x":61,"y":81}},{"type":"INTERIOR","position":{"x":45,"y":31}},
          {"type":"BATTERY","position":{"x":82,"y":52}},{"type":"ELECTRONIC","position":{"x":76,"y":43}},
          {"type":"LIGHTS","position":{"x":90,"y":59}},{"type":"LOAD","position":{"x":22,"y":59}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":13,"y":67}},{"type":"GEARBOX","position":{"x":67,"y":83}},
          {"type":"FUEL","position":{"x":25,"y":68}},{"type":"EXHAUST","position":{"x":27,"y":40}},
          {"type":"ENGINE","position":{"x":68,"y":62}},{"type":"COMPRESSOR","position":{"x":51,"y":62}}]
  },
  [EEquipmentModel.FUSO_CANTER_L1_FRAME]: {
    name: 'Fuso Canter L1 Frame',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1BODY,
    brand: EBrand.FUSO,
    image: FUSO_CANTER_L1_FRAME_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":73}},{"type":"SUSPENSION","position":{"x":58,"y":58}},
          {"type":"WHEELS","position":{"x":66,"y":73}},{"type":"INTERIOR","position":{"x":34,"y":37}},
          {"type":"FRAME","position":{"x":35,"y":76}},{"type":"BODY","position":{"x":38,"y":49}},
          {"type":"LIGHTS","position":{"x":46,"y":64}},{"type":"ELECTRONIC","position":{"x":32,"y":63}},
          {"type":"BATTERY","position":{"x":38,"y":54}},{"type":"ENGINE","position":{"x":23,"y":65}},
          {"type":"EXHAUST","position":{"x":73,"y":68}},{"type":"FUEL","position":{"x":27,"y":52}},
          {"type":"GEARBOX","position":{"x":25,"y":71}}]
  },
  [EEquipmentModel.FUSO_CANTER_L1_TIPPER]: {
    name: 'Fuso Canter L1 Tipper',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1_TIPPER,
    brand: EBrand.FUSO,
    image: FUSO_CANTER_L1_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":80}},{"type":"SUSPENSION","position":{"x":62,"y":64}},
          {"type":"WHEELS","position":{"x":67,"y":78}},{"type":"BODY","position":{"x":50,"y":57}},
          {"type":"INTERIOR","position":{"x":40,"y":40}},{"type":"FRAME","position":{"x":44,"y":82}},
          {"type":"LIGHTS","position":{"x":44,"y":67}},{"type":"BATTERY","position":{"x":32,"y":67}},
          {"type":"ELECTRONIC","position":{"x":35,"y":56}},{"type":"LOAD","position":{"x":75,"y":47}},
          {"type":"ENGINE","position":{"x":16,"y":72}},{"type":"EXHAUST","position":{"x":72,"y":70}},
          {"type":"FUEL","position":{"x":71,"y":61}},{"type":"GEARBOX","position":{"x":28,"y":80}}]
  },
  [EEquipmentModel.FUSO_SHOGUN_6x4]: {
    name: 'Fuso Shogun 6x4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_small,
    brand: EBrand.FUSO,
    image: FUSO_SHOGUN_6x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":75}},{"type":"WHEELS","position":{"x":55,"y":73}},
          {"type":"SUSPENSION","position":{"x":52,"y":61}},{"type":"BODY","position":{"x":41,"y":51}},
          {"type":"INTERIOR","position":{"x":38,"y":32}},{"type":"FRAME","position":{"x":43,"y":73}},
          {"type":"LIGHTS","position":{"x":38,"y":64}},{"type":"ELECTRONIC","position":{"x":32,"y":52}},
          {"type":"BATTERY","position":{"x":36,"y":57}},{"type":"FIFTH_WHEEL","position":{"x":75,"y":59}},
          {"type":"COMPRESSOR","position":{"x":9,"y":66}},{"type":"ENGINE","position":{"x":18,"y":65}},
          {"type":"EXHAUST","position":{"x":61,"y":75}},{"type":"FUEL","position":{"x":76,"y":65}},
          {"type":"GEARBOX","position":{"x":23,"y":73}}]
  },
  [EEquipmentModel.FUSO_SHOGUN_8x4]: {
    name: 'Fuso Shogun 8x4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T8x4_small,
    brand: EBrand.FUSO,
    image: FUSO_SHOGUN_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":74}},{"type":"WHEELS","position":{"x":53,"y":73}},
            {"type":"SUSPENSION","position":{"x":50,"y":61}},{"type":"BODY","position":{"x":39,"y":51}},
            {"type":"FRAME","position":{"x":40,"y":75}},{"type":"INTERIOR","position":{"x":33,"y":29}},
            {"type":"LIGHTS","position":{"x":37,"y":66}},{"type":"ELECTRONIC","position":{"x":35,"y":49}},
            {"type":"BATTERY","position":{"x":36,"y":57}},{"type":"FIFTH_WHEEL","position":{"x":74,"y":62}},
            {"type":"COMPRESSOR","position":{"x":14,"y":65}},{"type":"ENGINE","position":{"x":22,"y":67}},
            {"type":"EXHAUST","position":{"x":59,"y":74}},{"type":"EXHAUST","position":{"x":77,"y":71}},
            {"type":"GEARBOX","position":{"x":25,"y":75}}]
  },
  [EEquipmentModel.FUSO_FIGHTER_6x4]: {
    name: 'Fuso Fighter 6x4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_small,
    brand: EBrand.FUSO,
    image: FUSO_FIGHTER_6x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":68}},{"type":"SUSPENSION","position":{"x":53,"y":53}},
          {"type":"WHEELS","position":{"x":58,"y":65}},{"type":"BODY","position":{"x":40,"y":50}},
          {"type":"FRAME","position":{"x":41,"y":66}},{"type":"INTERIOR","position":{"x":33,"y":35}},
          {"type":"LIGHTS","position":{"x":38,"y":61}},{"type":"ELECTRONIC","position":{"x":35,"y":49}},
          {"type":"BATTERY","position":{"x":36,"y":55}},{"type":"FIFTH_WHEEL","position":{"x":75,"y":56}},
          {"type":"COMPRESSOR","position":{"x":13,"y":59}},{"type":"ENGINE","position":{"x":22,"y":60}},
          {"type":"EXHAUST","position":{"x":59,"y":68}},{"type":"FUEL","position":{"x":71,"y":60}},
          {"type":"GEARBOX","position":{"x":27,"y":66}}]
  },
  [EEquipmentModel.GOLDHOFER_TU]: {
    name: 'GoldHofer TU Tandem Trailer 1+2 axles',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].FLATBED_1_2_AXLES,
    brand: EBrand.GOLDHOFER,
    image: GOLDHOFER_TU_IMG,
    parts: [{"type":"BRAKES","position":{"x":70,"y":58}},{"type":"WHEELS","position":{"x":76,"y":62}},
          {"type":"SUSPENSION","position":{"x":78,"y":54}},{"type":"FRAME","position":{"x":51,"y":63}},
          {"type":"LIGHTS","position":{"x":92,"y":50}},{"type":"LOAD","position":{"x":56,"y":55}},
          {"type":"RAMP","position":{"x":88,"y":39}},{"type":"TRAILER_ATTACHMENT","position":{"x":4,"y":70}}]
  },
  [EEquipmentModel.GOLDHOFER_TN_L]: {
    name: 'GoldHofer TN-L Tandem Trailer 2+3 axles',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].FLATBED_2_3_AXLES,
    brand: EBrand.GOLDHOFER,
    image: GOLDHOFER_TN_L_IMG,
    parts: [{"type":"BRAKES","position":{"x":69,"y":57}},{"type":"WHEELS","position":{"x":75,"y":59}},
            {"type":"SUSPENSION","position":{"x":73,"y":51}},{"type":"FRAME","position":{"x":59,"y":59}},
            {"type":"LIGHTS","position":{"x":92,"y":47}},{"type":"LOAD","position":{"x":52,"y":53}},
            {"type":"RAMP","position":{"x":94,"y":40}},{"type":"TRAILER_ATTACHMENT","position":{"x":1,"y":69}}]
  },
  [EEquipmentModel.GREAT_DANE_EVEREST_SINGLE_TEMP]: {
    name: 'Great Dane Everst Single Temp 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_2_AXLES,
    brand: EBrand.GREAT_DANE,
    image: GREAT_DANE_EVEREST_SINGLE_TEMP_IMG,
    parts: [{"type":"BRAKES","position":{"x":80,"y":64}},{"type":"WHEELS","position":{"x":85,"y":70}},
          {"type":"SUSPENSION","position":{"x":84,"y":60}},{"type":"FRAME","position":{"x":57,"y":62}},
          {"type":"BODY","position":{"x":58,"y":47}},{"type":"SUPPORT","position":{"x":47,"y":73}},
          {"type":"LIGHTS","position":{"x":96,"y":61}},{"type":"DOORS","position":{"x":91,"y":49}},
          {"type":"FRIGO","position":{"x":11,"y":38}},{"type":"LOAD","position":{"x":39,"y":52}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":19,"y":64}}]
  },
  [EEquipmentModel.GREAT_DANE_EVEREST_MULTI_TEMP]: {
    name: 'Great Dane Everst Multi Temp 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_2_AXLES,
    brand: EBrand.GREAT_DANE,
    image: GREAT_DANE_EVEREST_MULTI_TEMP_IMG,
    parts: [{"type":"BRAKES","position":{"x":83,"y":65}},{"type":"SUSPENSION","position":{"x":87,"y":60}},
            {"type":"WHEELS","position":{"x":88,"y":68}},{"type":"BODY","position":{"x":59,"y":49}},
            {"type":"FRAME","position":{"x":51,"y":65}},{"type":"SUPPORT","position":{"x":54,"y":72}},
            {"type":"LIGHTS","position":{"x":95,"y":63}},{"type":"DOORS","position":{"x":91,"y":53}},
            {"type":"FRIGO","position":{"x":22,"y":46}},{"type":"LOAD","position":{"x":45,"y":45}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":25,"y":67}}]
  },
  [EEquipmentModel.GREAT_DANE_ALPINE]: {
    name: 'Great Dane Alpine 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].FRIGO_T4x2,
    brand: EBrand.GREAT_DANE,
    image: GREAT_DANE_ALPINE_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":72}},{"type":"SUSPENSION","position":{"x":53,"y":65}},
          {"type":"WHEELS","position":{"x":47,"y":74}},{"type":"BODY","position":{"x":20,"y":48}},
          {"type":"FRAME","position":{"x":27,"y":66}},{"type":"INTERIOR","position":{"x":11,"y":51}},
          {"type":"BATTERY","position":{"x":4,"y":61}},{"type":"LIGHTS","position":{"x":71,"y":55}},
          {"type":"ELECTRONIC","position":{"x":7,"y":57}},{"type":"DOORS","position":{"x":77,"y":41}},
          {"type":"FRIGO","position":{"x":14,"y":40}},{"type":"LOAD","position":{"x":53,"y":48}},
          {"type":"COMPRESSOR","position":{"x":20,"y":55}},{"type":"ENGINE","position":{"x":12,"y":56}},
          {"type":"EXHAUST","position":{"x":38,"y":68}},{"type":"GEARBOX","position":{"x":11,"y":63}},
          {"type":"FUEL","position":{"x":16,"y":66}}]
  },
  [EEquipmentModel.GREAT_DANE_CHAMPION_SP2]: {
    name: 'Great Dane Champion SP2 (Sheet and Post) 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.GREAT_DANE,
    image: GREAT_DANE_CHAMPION_SP2_IMG,
    parts: [{"type":"BRAKES","position":{"x":16,"y":61}},{"type":"SUSPENSION","position":{"x":12,"y":57}},
          {"type":"WHEELS","position":{"x":11,"y":62}},{"type":"BODY","position":{"x":25,"y":50}},
          {"type":"FRAME","position":{"x":27,"y":59}},{"type":"SUPPORT","position":{"x":45,"y":67}},
          {"type":"LIGHTS","position":{"x":8,"y":58}},{"type":"DOORS","position":{"x":16,"y":50}},
          {"type":"LOAD","position":{"x":48,"y":50}},{"type":"TRAILER_ATTACHMENT","position":{"x":74,"y":60}}]
  },
  [EEquipmentModel.GREAT_DANE_CHAMPION_CP]: {
    name: 'Great Dane Champion CP (Composite) 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.GREAT_DANE,
    image: GREAT_DANE_CHAMPION_CP_IMG,
    parts: [{"type":"BRAKES","position":{"x":17,"y":60}},{"type":"SUSPENSION","position":{"x":14,"y":57}},
            {"type":"WHEELS","position":{"x":12,"y":62}},{"type":"BODY","position":{"x":35,"y":53}},
            {"type":"FRAME","position":{"x":37,"y":59}},{"type":"SUPPORT","position":{"x":52,"y":66}},
            {"type":"LIGHTS","position":{"x":9,"y":58}},{"type":"DOORS","position":{"x":11,"y":49}},
            {"type":"LOAD","position":{"x":46,"y":49}},{"type":"TRAILER_ATTACHMENT","position":{"x":77,"y":59}}]
  },
  [EEquipmentModel.GREAT_DANE_SAHARA_S]: {
    name: 'Great Dane Sahara S Series 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_big,
    brand: EBrand.GREAT_DANE,
    image: GREAT_DANE_SAHARA_S_IMG,
    parts: [{"type":"BRAKES","position":{"x":57,"y":71}},{"type":"SUSPENSION","position":{"x":57,"y":64}},
          {"type":"WHEELS","position":{"x":46,"y":69}},{"type":"BODY","position":{"x":29,"y":54}},
          {"type":"FRAME","position":{"x":32,"y":65}},{"type":"INTERIOR","position":{"x":12,"y":49}},
          {"type":"LIGHTS","position":{"x":74,"y":55}},{"type":"ELECTRONIC","position":{"x":7,"y":56}},
          {"type":"BATTERY","position":{"x":5,"y":58}},{"type":"DOORS","position":{"x":78,"y":48}},
          {"type":"LOAD","position":{"x":53,"y":49}},{"type":"COMPRESSOR","position":{"x":19,"y":61}},
          {"type":"ENGINE","position":{"x":9,"y":59}},{"type":"EXHAUST","position":{"x":26,"y":65}},
          {"type":"GEARBOX","position":{"x":5,"y":65}},{"type":"FUEL","position":{"x":13,"y":66}}]
  },
  [EEquipmentModel.GREAT_DANE_SAHARA_C]: {
    name: 'Great Dane Sahara C Series 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_big,
    brand: EBrand.GREAT_DANE,
    image: GREAT_DANE_SAHARA_C_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":69}},{"type":"SUSPENSION","position":{"x":56,"y":63}},
          {"type":"WHEELS","position":{"x":47,"y":72}},{"type":"BODY","position":{"x":29,"y":55}},
          {"type":"FRAME","position":{"x":30,"y":64}},{"type":"INTERIOR","position":{"x":12,"y":54}},
          {"type":"LIGHTS","position":{"x":76,"y":66}},{"type":"ELECTRONIC","position":{"x":5,"y":57}},
          {"type":"BATTERY","position":{"x":3,"y":60}},{"type":"DOORS","position":{"x":82,"y":47}},
          {"type":"LOAD","position":{"x":49,"y":51}},{"type":"COMPRESSOR","position":{"x":18,"y":58}},
          {"type":"ENGINE","position":{"x":11,"y":58}},{"type":"EXHAUST","position":{"x":30,"y":66}},
          {"type":"GEARBOX","position":{"x":10,"y":64}},{"type":"FUEL","position":{"x":15,"y":66}}]
  },
  [EEquipmentModel.GREAT_DANE_FREEDOM_LT]: {
    name: 'Great Dane Freedom LT Flatbed trailer 1+1 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.GREAT_DANE,
    image: GREAT_DANE_FREEDOM_LT_IMG,
    parts: [{"type":"BRAKES","position":{"x":71,"y":60}},{"type":"WHEELS","position":{"x":60,"y":61}},
          {"type":"SUSPENSION","position":{"x":67,"y":52}},{"type":"FRAME","position":{"x":36,"y":46}},
          {"type":"SUPPORT","position":{"x":16,"y":54}},{"type":"LIGHTS","position":{"x":74,"y":50}},
          {"type":"LOAD","position":{"x":51,"y":42}},{"type":"TRAILER_ATTACHMENT","position":{"x":12,"y":44}}]
  },
  [EEquipmentModel.GREAT_DANE_FREEDOM_SE]: {
    name: 'Great Dane Freedom SE Flatbed trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.GREAT_DANE,
    image: GREAT_DANE_FREEDOM_SE_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":57}},{"type":"SUSPENSION","position":{"x":46,"y":47}},
          {"type":"WHEELS","position":{"x":41,"y":57}},{"type":"FRAME","position":{"x":23,"y":48}},
          {"type":"SUPPORT","position":{"x":13,"y":54}},{"type":"LIGHTS","position":{"x":72,"y":48}},
          {"type":"LOAD","position":{"x":55,"y":43}},{"type":"TRAILER_ATTACHMENT","position":{"x":9,"y":46}}]
  },
  [EEquipmentModel.GREAT_DANE_FREEDOM_XP]: {
    name: 'Great Dane Freedom XP Flatbed trailer 1+1 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.GREAT_DANE,
    image: GREAT_DANE_FREEDOM_XP_IMG,
    parts: [{"type":"BRAKES","position":{"x":66,"y":54}},{"type":"SUSPENSION","position":{"x":56,"y":48}},
          {"type":"WHEELS","position":{"x":52,"y":63}},{"type":"FRAME","position":{"x":33,"y":43}},
          {"type":"SUPPORT","position":{"x":11,"y":46}},{"type":"LIGHTS","position":{"x":66,"y":44}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":37}},{"type":"LOAD","position":{"x":52,"y":40}}]
  },
  [EEquipmentModel.HEIL_STANDARD_DUTY_9500_LTD_D4]: {
    name: 'Heil Trailers Standard Duty 9500 LTD D4 Petrol Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.HEIL,
    image: HEIL_STANDARD_DUTY_9500_LTD_D4_IMG,
    parts: [{"type":"BRAKES","position":{"x":36,"y":63}},{"type":"SUSPENSION","position":{"x":35,"y":56}},
          {"type":"WHEELS","position":{"x":43,"y":64}},{"type":"BODY","position":{"x":48,"y":42}},
          {"type":"FRAME","position":{"x":54,"y":53}},{"type":"SUPPORT","position":{"x":81,"y":57}},
          {"type":"LIGHTS","position":{"x":22,"y":54}},{"type":"LOAD","position":{"x":59,"y":42}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":85,"y":50}}]
  },
  [EEquipmentModel.HEIL_STANDARD_DUTY_9300_DT_S4]: {
    name: 'Heil Trailers Standard Duty 9300 DT S4 Petrol Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.HEIL,
    image: HEIL_STANDARD_DUTY_9300_DT_S4_IMG,
    parts: [{"type":"BRAKES","position":{"x":44,"y":63}},{"type":"SUSPENSION","position":{"x":49,"y":56}},
            {"type":"WHEELS","position":{"x":52,"y":61}},{"type":"BODY","position":{"x":37,"y":43}},
            {"type":"FRAME","position":{"x":64,"y":55}},{"type":"SUPPORT","position":{"x":82,"y":57}},
            {"type":"LIGHTS","position":{"x":25,"y":59}},{"type":"LOAD","position":{"x":63,"y":41}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":89,"y":53}}]
  },
  [EEquipmentModel.HEIL_8500_E_DOUBLE_CONICAL_S1_DOT_TC407]: {
    name: 'Heil Trailers 8500 E Double Conical S1 DOT/TC407 Crude Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.HEIL,
    image: HEIL_8500_E_DOUBLE_CONICAL_S1_DOT_TC407_IMG,
    parts: [{"type":"BRAKES","position":{"x":12,"y":61}},{"type":"SUSPENSION","position":{"x":5,"y":56}},
          {"type":"WHEELS","position":{"x":4,"y":63}},{"type":"BODY","position":{"x":33,"y":53}},
          {"type":"SUPPORT","position":{"x":58,"y":65}},{"type":"FRAME","position":{"x":26,"y":57}},
          {"type":"LIGHTS","position":{"x":0,"y":57}},{"type":"LOAD","position":{"x":64,"y":47}},
          {"type":"LOAD","position":{"x":18,"y":48}},{"type":"TRAILER_ATTACHMENT","position":{"x":78,"y":58}}]
  },
  [EEquipmentModel.HEIL_ST_7000_316L_SSSR_JS1]: {
    name: 'Heil Trailers ST 7000 316L SSSR JS1 Asphalt Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.HEIL,
    image: HEIL_ST_7000_316L_SSSR_JS1_IMG,
    parts: [{"type":"BRAKES","position":{"x":32,"y":62}},{"type":"SUSPENSION","position":{"x":34,"y":55}},
            {"type":"WHEELS","position":{"x":37,"y":63}},{"type":"BODY","position":{"x":36,"y":44}},
            {"type":"FRAME","position":{"x":46,"y":52}},{"type":"SUPPORT","position":{"x":75,"y":60}},
            {"type":"LIGHTS","position":{"x":22,"y":57}},{"type":"LOAD","position":{"x":53,"y":43}},
            {"type":"TRAILER_ATTACHMENT","position":{"x":84,"y":51}}]
  },
  [EEquipmentModel.HERCURLES_CHASSIS_CONTAINER]: {
    name: 'Hercules Chassis Container Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_2_AXLES,
    brand: EBrand.HERCULES_CHASSIS,
    image: HERCURLES_CHASSIS_CONTAINER_IMG,
    parts: [{"type":"BRAKES","position":{"x":33,"y":60}},{"type":"SUSPENSION","position":{"x":37,"y":50}},
          {"type":"WHEELS","position":{"x":43,"y":62}},{"type":"FRAME","position":{"x":50,"y":42}},
          {"type":"SUPPORT","position":{"x":83,"y":44}},{"type":"LIGHTS","position":{"x":29,"y":53}},
          {"type":"LOAD","position":{"x":60,"y":37}},{"type":"TRAILER_ATTACHMENT","position":{"x":89,"y":33}}]
  },
  [EEquipmentModel.HERCULES_CHASSIS_LOWBED]: {
    name: 'Hercules Chassis Lowbed Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.HERCULES_CHASSIS,
    image: HERCULES_CHASSIS_LOWBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":35,"y":60}},{"type":"SUSPENSION","position":{"x":40,"y":47}},
            {"type":"WHEELS","position":{"x":44,"y":56}},{"type":"FRAME","position":{"x":67,"y":48}},
            {"type":"SUPPORT","position":{"x":92,"y":46}},{"type":"LIGHTS","position":{"x":33,"y":47}},
            {"type":"LOAD","position":{"x":75,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":92,"y":37}}]
  },
  [EEquipmentModel.HINO_300]: {
    name: 'Hino 300 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.HINO_MOTORS,
    image: HINO_300_IMG,
    parts: [{"type":"BRAKES","position":{"x":42,"y":68}},{"type":"SUSPENSION","position":{"x":48,"y":57}},
            {"type":"WHEELS","position":{"x":51,"y":66}},{"type":"BODY","position":{"x":24,"y":48}},
            {"type":"FRAME","position":{"x":28,"y":66}},{"type":"INTERIOR","position":{"x":36,"y":39}},
            {"type":"BATTERY","position":{"x":29,"y":55}},{"type":"ELECTRONIC","position":{"x":34,"y":48}},
            {"type":"LIGHTS","position":{"x":37,"y":57}},{"type":"LOAD","position":{"x":67,"y":55}},
            {"type":"ENGINE","position":{"x":18,"y":61}},{"type":"EXHAUST","position":{"x":57,"y":66}},
            {"type":"FUEL","position":{"x":65,"y":59}},{"type":"GEARBOX","position":{"x":22,"y":66}}]
  },
  [EEquipmentModel.HINO_500_4x2]: {
    name: 'Hino 500 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.HINO_MOTORS,
    image: HINO_500_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":41,"y":70}},{"type":"SUSPENSION","position":{"x":48,"y":61}},
            {"type":"WHEELS","position":{"x":51,"y":69}},{"type":"BODY","position":{"x":33,"y":55}},
            {"type":"FRAME","position":{"x":31,"y":71}},{"type":"INTERIOR","position":{"x":36,"y":45}},
            {"type":"BATTERY","position":{"x":37,"y":63}},{"type":"ELECTRONIC","position":{"x":40,"y":57}},
            {"type":"LIGHTS","position":{"x":34,"y":68}},{"type":"LOAD","position":{"x":69,"y":60}},
            {"type":"ENGINE","position":{"x":22,"y":65}},{"type":"EXHAUST","position":{"x":73,"y":67}},
            {"type":"FUEL","position":{"x":64,"y":62}},{"type":"GEARBOX","position":{"x":24,"y":69}}]
  },
  [EEquipmentModel.HINO_500_6x2]: {
    name: 'Hino 500 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.HINO_MOTORS,
    image: HINO_500_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":44,"y":72}},{"type":"WHEELS","position":{"x":52,"y":69}},
            {"type":"SUSPENSION","position":{"x":49,"y":57}},{"type":"BODY","position":{"x":36,"y":47}},
            {"type":"FRAME","position":{"x":28,"y":67}},{"type":"INTERIOR","position":{"x":35,"y":36}},
            {"type":"ELECTRONIC","position":{"x":38,"y":48}},{"type":"LIGHTS","position":{"x":37,"y":60}},
            {"type":"BATTERY","position":{"x":34,"y":57}},{"type":"LOAD","position":{"x":66,"y":54}},
            {"type":"ENGINE","position":{"x":21,"y":58}},{"type":"COMPRESSOR","position":{"x":11,"y":60}},
            {"type":"EXHAUST","position":{"x":59,"y":67}},{"type":"FUEL","position":{"x":67,"y":62}},
            {"type":"GEARBOX","position":{"x":22,"y":67}}]
  },
  [EEquipmentModel.HINO_600]: {
    name: 'Hino 600 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2_big,
    brand: EBrand.HINO_MOTORS,
    image: HINO_600_IMG,
    parts: [{"type":"BRAKES","position":{"x":34,"y":75}},{"type":"SUSPENSION","position":{"x":40,"y":61}},
            {"type":"WHEELS","position":{"x":45,"y":73}},{"type":"BODY","position":{"x":31,"y":51}},
            {"type":"FRAME","position":{"x":28,"y":75}},{"type":"INTERIOR","position":{"x":40,"y":41}},
            {"type":"BATTERY","position":{"x":40,"y":54}},{"type":"ELECTRONIC","position":{"x":33,"y":54}},
            {"type":"LIGHTS","position":{"x":35,"y":58}},{"type":"LOAD","position":{"x":65,"y":60}},
            {"type":"COMPRESSOR","position":{"x":10,"y":65}},{"type":"ENGINE","position":{"x":21,"y":64}},
            {"type":"EXHAUST","position":{"x":71,"y":69}},{"type":"FUEL","position":{"x":58,"y":65}},
            {"type":"GEARBOX","position":{"x":23,"y":73}}]
  },
  [EEquipmentModel.HINO_700]: {
    name: 'Hino 700 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.HINO_MOTORS,
    image: HINO_700_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":72}},{"type":"WHEELS","position":{"x":55,"y":69}},
            {"type":"SUSPENSION","position":{"x":52,"y":56}},{"type":"BODY","position":{"x":38,"y":46}},
            {"type":"INTERIOR","position":{"x":36,"y":34}},{"type":"FRAME","position":{"x":28,"y":74}},
            {"type":"BATTERY","position":{"x":42,"y":60}},{"type":"ELECTRONIC","position":{"x":45,"y":56}},
            {"type":"LIGHTS","position":{"x":37,"y":65}},{"type":"FIFTH_WHEEL","position":{"x":71,"y":57}},
            {"type":"COMPRESSOR","position":{"x":9,"y":63}},{"type":"ENGINE","position":{"x":20,"y":64}},
            {"type":"EXHAUST","position":{"x":65,"y":72}},{"type":"EXHAUST","position":{"x":73,"y":63}},
            {"type":"GEARBOX","position":{"x":23,"y":73}}]
  },
  [EEquipmentModel.HYUNDAI_H36L]: {
    name: 'Hyundai H36L Tipper',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1_TIPPER,
    brand: EBrand.HYUNDAI,
    image: HYUNDAI_H36L_IMG,
    parts: [{"type":"BRAKES","position":{"x":38,"y":69}},{"type":"SUSPENSION","position":{"x":42,"y":59}},
            {"type":"WHEELS","position":{"x":45,"y":68}},{"type":"BODY","position":{"x":33,"y":53}},
            {"type":"FRAME","position":{"x":35,"y":66}},{"type":"INTERIOR","position":{"x":35,"y":37}},
            {"type":"BATTERY","position":{"x":48,"y":56}},{"type":"ELECTRONIC","position":{"x":43,"y":52}},
            {"type":"LIGHTS","position":{"x":25,"y":57}},{"type":"LOAD","position":{"x":67,"y":54}},
            {"type":"ENGINE","position":{"x":16,"y":56}},{"type":"EXHAUST","position":{"x":55,"y":65}},
            {"type":"FUEL","position":{"x":65,"y":62}},{"type":"GEARBOX","position":{"x":20,"y":64}}]
  },
  [EEquipmentModel.HYUNDAI_H120]: {
    name: 'Hyundai H120 Tipper',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2_TIPPER,
    brand: EBrand.HYUNDAI,
    image: HYUNDAI_H120_IMG,
    parts: [{"type":"BRAKES","position":{"x":36,"y":67}},{"type":"SUSPENSION","position":{"x":42,"y":58}},
            {"type":"WHEELS","position":{"x":42,"y":65}},{"type":"BODY","position":{"x":37,"y":51}},
            {"type":"FRAME","position":{"x":32,"y":68}},{"type":"INTERIOR","position":{"x":33,"y":38}},
            {"type":"BATTERY","position":{"x":47,"y":55}},{"type":"ELECTRONIC","position":{"x":43,"y":51}},
            {"type":"LIGHTS","position":{"x":25,"y":61}},{"type":"LOAD","position":{"x":66,"y":47}},
            {"type":"ENGINE","position":{"x":16,"y":61}},{"type":"EXHAUST","position":{"x":52,"y":63}},
            {"type":"FUEL","position":{"x":66,"y":56}},{"type":"GEARBOX","position":{"x":21,"y":67}}]
  },
  [EEquipmentModel.HYUNDAI_HD35]: {
    name: 'Hyundai H35 Tipper',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1_TIPPER,
    brand: EBrand.HYUNDAI,
    image: HYUNDAI_HD35_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":68}},{"type":"WHEELS","position":{"x":57,"y":71}},
            {"type":"SUSPENSION","position":{"x":51,"y":55}},{"type":"BODY","position":{"x":10,"y":51}},
            {"type":"FRAME","position":{"x":14,"y":65}},{"type":"INTERIOR","position":{"x":25,"y":31}},
            {"type":"LIGHTS","position":{"x":40,"y":57}},{"type":"ELECTRONIC","position":{"x":56,"y":42}},
            {"type":"BATTERY","position":{"x":58,"y":52}},{"type":"LOAD","position":{"x":75,"y":42}},
            {"type":"ENGINE","position":{"x":26,"y":61}},{"type":"EXHAUST","position":{"x":63,"y":64}},
            {"type":"FUEL","position":{"x":69,"y":56}},{"type":"GEARBOX","position":{"x":30,"y":71}}]
  },
  [EEquipmentModel.HYUNDAI_HD170]: {
    name: 'Hyundai HD170 Tipper',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T4x2,
    brand: EBrand.HYUNDAI,
    image: HYUNDAI_HD170_IMG,
    parts: [{"type":"BRAKES","position":{"x":30,"y":67}},{"type":"SUSPENSION","position":{"x":32,"y":58}},
          {"type":"WHEELS","position":{"x":37,"y":65}},{"type":"BODY","position":{"x":3,"y":51}},
          {"type":"FRAME","position":{"x":5,"y":65}},{"type":"INTERIOR","position":{"x":12,"y":44}},
          {"type":"BATTERY","position":{"x":39,"y":58}},{"type":"ELECTRONIC","position":{"x":35,"y":53}},
          {"type":"LIGHTS","position":{"x":19,"y":62}},{"type":"LOAD","position":{"x":57,"y":45}},
          {"type":"ENGINE","position":{"x":11,"y":60}},{"type":"EXHAUST","position":{"x":44,"y":63}},
          {"type":"FUEL","position":{"x":54,"y":58}},{"type":"GEARBOX","position":{"x":12,"y":68}}]
  },
  [EEquipmentModel.HYUNDAI_PAVISE]: {
    name: 'Hyundai Pavise 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2_small,
    brand: EBrand.HYUNDAI,
    image: HYUNDAI_PAVISE_IMG,
    parts: [{"type":"BRAKES","position":{"x":73,"y":84}},{"type":"WHEELS","position":{"x":82,"y":86}},
          {"type":"SUSPENSION","position":{"x":78,"y":63}},{"type":"BODY","position":{"x":15,"y":53}},
          {"type":"FRAME","position":{"x":20,"y":87}},{"type":"INTERIOR","position":{"x":26,"y":29}},
          {"type":"BATTERY","position":{"x":80,"y":56}},{"type":"ELECTRONIC","position":{"x":84,"y":48}},
          {"type":"LIGHTS","position":{"x":76,"y":76}},{"type":"LOAD","position":{"x":46,"y":45}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":54,"y":45}},{"type":"ENGINE","position":{"x":48,"y":75}},
          {"type":"EXHAUST","position":{"x":68,"y":77}},{"type":"FUEL","position":{"x":70,"y":68}},
          {"type":"GEARBOX","position":{"x":53,"y":85}}]
  },
  [EEquipmentModel.HYUNDAI_XCIENT]: {
    name: 'Hyundai XCient 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.HYUNDAI,
    image: HYUNDAI_XCIENT_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":81}},{"type":"WHEELS","position":{"x":57,"y":77}},
            {"type":"SUSPENSION","position":{"x":52,"y":63}},{"type":"BODY","position":{"x":4,"y":57}},
            {"type":"FRAME","position":{"x":7,"y":78}},{"type":"INTERIOR","position":{"x":19,"y":40}},
            {"type":"BATTERY","position":{"x":41,"y":63}},{"type":"ELECTRONIC","position":{"x":33,"y":55}},
            {"type":"LIGHTS","position":{"x":40,"y":72}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":60}},
            {"type":"COMPRESSOR","position":{"x":11,"y":70}},{"type":"ENGINE","position":{"x":21,"y":72}},
            {"type":"EXHAUST","position":{"x":66,"y":74}},{"type":"FUEL","position":{"x":73,"y":67}},
            {"type":"GEARBOX","position":{"x":24,"y":81}}]
  },
  [EEquipmentModel.ISUZU_EXR]: {
    name: 'Isuzu EXR Semi Truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.ISUZU,
    image: ISUZU_EXR_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":74}},{"type":"SUSPENSION","position":{"x":61,"y":61}},
          {"type":"WHEELS","position":{"x":64,"y":74}},{"type":"BODY","position":{"x":12,"y":53}},
          {"type":"FRAME","position":{"x":16,"y":75}},{"type":"INTERIOR","position":{"x":27,"y":37}},
          {"type":"BATTERY","position":{"x":66,"y":60}},{"type":"ELECTRONIC","position":{"x":43,"y":52}},
          {"type":"LIGHTS","position":{"x":43,"y":73}},{"type":"FIFTH_WHEEL","position":{"x":74,"y":52}},
          {"type":"COMPRESSOR","position":{"x":17,"y":66}},{"type":"ENGINE","position":{"x":28,"y":68}},
          {"type":"EXHAUST","position":{"x":73,"y":70}},{"type":"FUEL","position":{"x":82,"y":59}},
          {"type":"GEARBOX","position":{"x":30,"y":77}}]
  },
  [EEquipmentModel.ISUZU_EXZ]: {
    name: 'Isuzu EXZ Semi Truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.ISUZU,
    image: ISUZU_EXZ_IMG,
    parts: [{"type":"BRAKES","position":{"x":37,"y":88}},{"type":"SUSPENSION","position":{"x":32,"y":69}},
          {"type":"WHEELS","position":{"x":25,"y":84}},{"type":"BODY","position":{"x":31,"y":51}},
          {"type":"FRAME","position":{"x":40,"y":87}},{"type":"INTERIOR","position":{"x":33,"y":32}},
          {"type":"LIGHTS","position":{"x":43,"y":75}},{"type":"BATTERY","position":{"x":23,"y":68}},
          {"type":"ELECTRONIC","position":{"x":49,"y":50}},{"type":"FIFTH_WHEEL","position":{"x":18,"y":66}},
          {"type":"COMPRESSOR","position":{"x":54,"y":77}},{"type":"ENGINE","position":{"x":67,"y":73}},
          {"type":"EXHAUST","position":{"x":16,"y":76}},{"type":"FUEL","position":{"x":18,"y":72}},
          {"type":"GEARBOX","position":{"x":63,"y":88}}]
  },
  [EEquipmentModel.ISUZU_FRR]: {
    name: 'Isuzu FRR Tandem Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.ISUZU,
    image: ISUZU_FRR_IMG,
    parts: [{"type":"BRAKES","position":{"x":66,"y":71}},{"type":"SUSPENSION","position":{"x":58,"y":58}},
          {"type":"WHEELS","position":{"x":57,"y":68}},{"type":"BODY","position":{"x":56,"y":48}},
          {"type":"INTERIOR","position":{"x":63,"y":38}},{"type":"FRAME","position":{"x":49,"y":62}},
          {"type":"LIGHTS","position":{"x":76,"y":57}},{"type":"BATTERY","position":{"x":49,"y":52}},
          {"type":"ELECTRONIC","position":{"x":78,"y":46}},{"type":"LOAD","position":{"x":32,"y":57}},
          {"type":"ENGINE","position":{"x":88,"y":58}},{"type":"EXHAUST","position":{"x":45,"y":66}},
          {"type":"FUEL","position":{"x":36,"y":60}},{"type":"GEARBOX","position":{"x":84,"y":68}}]
  },
  [EEquipmentModel.ISUZU_FSR]: {
    name: 'Isuzu FSR Tandem Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.ISUZU,
    image: ISUZU_FSR_IMG,
    parts: [{"type":"BRAKES","position":{"x":33,"y":84}},{"type":"SUSPENSION","position":{"x":24,"y":69}},
    {"type":"WHEELS","position":{"x":22,"y":82}},{"type":"BODY","position":{"x":24,"y":54}},
    {"type":"INTERIOR","position":{"x":39,"y":39}},{"type":"FRAME","position":{"x":40,"y":83}},
    {"type":"BATTERY","position":{"x":21,"y":60}},{"type":"ELECTRONIC","position":{"x":40,"y":52}},
    {"type":"LIGHTS","position":{"x":38,"y":60}},{"type":"LOAD","position":{"x":13,"y":54}},
    {"type":"ENGINE","position":{"x":63,"y":70}},{"type":"EXHAUST","position":{"x":16,"y":80}},
    {"type":"FUEL","position":{"x":15,"y":75}},{"type":"GEARBOX","position":{"x":61,"y":87}}]
  },
  [EEquipmentModel.ISUZU_FVZ]: {
    name: 'Isuzu FVZ Tandem Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TANK_T6x2_small,
    brand: EBrand.ISUZU,
    image: ISUZU_FVZ_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":73}},{"type":"SUSPENSION","position":{"x":51,"y":60}},
    {"type":"WHEELS","position":{"x":53,"y":71}},{"type":"BODY","position":{"x":50,"y":47}},
    {"type":"FRAME","position":{"x":39,"y":70}},{"type":"INTERIOR","position":{"x":33,"y":33}},
    {"type":"BATTERY","position":{"x":56,"y":54}},{"type":"ELECTRONIC","position":{"x":31,"y":44}},
    {"type":"LIGHTS","position":{"x":33,"y":64}},{"type":"LOAD","position":{"x":72,"y":54}},
    {"type":"ENGINE","position":{"x":18,"y":59}},{"type":"EXHAUST","position":{"x":61,"y":71}},
    {"type":"FUEL","position":{"x":66,"y":60}},{"type":"GEARBOX","position":{"x":21,"y":67}}]
  },
  [EEquipmentModel.ISUZU_FYH]: {
    name: 'Isuzu FYH Tandem Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.ISUZU,
    image: ISUZU_FYH_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":74}},{"type":"SUSPENSION","position":{"x":35,"y":64}},
          {"type":"WHEELS","position":{"x":38,"y":75}},{"type":"BODY","position":{"x":37,"y":48}},
          {"type":"FRAME","position":{"x":51,"y":73}},{"type":"INTERIOR","position":{"x":51,"y":35}},
          {"type":"BATTERY","position":{"x":34,"y":57}},{"type":"ELECTRONIC","position":{"x":54,"y":46}},
          {"type":"LIGHTS","position":{"x":51,"y":63}},{"type":"LOAD","position":{"x":20,"y":56}},
          {"type":"COMPRESSOR","position":{"x":58,"y":63}},{"type":"ENGINE","position":{"x":70,"y":58}},
          {"type":"EXHAUST","position":{"x":32,"y":68}},{"type":"FUEL","position":{"x":20,"y":65}},
          {"type":"GEARBOX","position":{"x":66,"y":70}}]
  },
  [EEquipmentModel.ISUZU_GXZ]: {
    name: 'Isuzu GXZ Tandem Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.ISUZU,
    image: ISUZU_GXZ_IMG,
    parts: [{"type":"BRAKES","position":{"x":25,"y":87}},{"type":"SUSPENSION","position":{"x":18,"y":78}},
          {"type":"WHEELS","position":{"x":19,"y":89}},{"type":"BODY","position":{"x":18,"y":51}},
          {"type":"FRAME","position":{"x":29,"y":84}},{"type":"INTERIOR","position":{"x":31,"y":30}},
          {"type":"BATTERY","position":{"x":17,"y":59}},{"type":"ELECTRONIC","position":{"x":26,"y":48}},
          {"type":"LIGHTS","position":{"x":21,"y":76}},{"type":"LOAD","position":{"x":49,"y":48}},
          {"type":"COMPRESSOR","position":{"x":30,"y":73}},{"type":"ENGINE","position":{"x":49,"y":67}},
          {"type":"EXHAUST","position":{"x":24,"y":83}},{"type":"FUEL","position":{"x":71,"y":73}},
          {"type":"GEARBOX","position":{"x":52,"y":84}}]
  },
  [EEquipmentModel.ISUZU_NLR]: {
    name: 'Isuzu NLR Tandem Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.ISUZU,
    image: ISUZU_NLR_IMG,
    parts: [{"type":"BRAKES","position":{"x":33,"y":81}},{"type":"SUSPENSION","position":{"x":27,"y":68}},
          {"type":"BODY","position":{"x":25,"y":61}},{"type":"FRAME","position":{"x":39,"y":81}},
          {"type":"INTERIOR","position":{"x":33,"y":34}},{"type":"BATTERY","position":{"x":23,"y":67}},
          {"type":"ELECTRONIC","position":{"x":36,"y":51}},{"type":"LIGHTS","position":{"x":37,"y":60}},
          {"type":"LOAD","position":{"x":13,"y":56}},{"type":"ENGINE","position":{"x":61,"y":67}},
          {"type":"WHEELS","position":{"x":24,"y":82}},{"type":"EXHAUST","position":{"x":18,"y":75}},
          {"type":"FUEL","position":{"x":18,"y":70}},{"type":"GEARBOX","position":{"x":59,"y":82}}]
  },
  [EEquipmentModel.ISUZU_NMR]: {
    name: 'Isuzu NMR Tandem Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.ISUZU,
    image: ISUZU_NMR_IMG,
    parts: [{"type":"BRAKES","position":{"x":66,"y":70}},{"type":"SUSPENSION","position":{"x":56,"y":60}},
            {"type":"WHEELS","position":{"x":55,"y":70}},{"type":"BODY","position":{"x":55,"y":50}},
            {"type":"INTERIOR","position":{"x":60,"y":44}},{"type":"FRAME","position":{"x":49,"y":69}},
            {"type":"BATTERY","position":{"x":51,"y":58}},{"type":"ELECTRONIC","position":{"x":76,"y":50}},
            {"type":"LIGHTS","position":{"x":73,"y":58}},{"type":"LOAD","position":{"x":23,"y":51}},
            {"type":"ENGINE","position":{"x":88,"y":61}},{"type":"EXHAUST","position":{"x":51,"y":71}},
            {"type":"FUEL","position":{"x":43,"y":65}},{"type":"GEARBOX","position":{"x":82,"y":68}}]
  },
  [EEquipmentModel.ISUZU_NPR]: {
    name: 'Isuzu NPR Tandem Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.ISUZU,
    image: ISUZU_NPR_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":74}},{"type":"WHEELS","position":{"x":42,"y":72}},
        {"type":"SUSPENSION","position":{"x":45,"y":61}},{"type":"BODY","position":{"x":45,"y":52}},
        {"type":"FRAME","position":{"x":48,"y":69}},{"type":"INTERIOR","position":{"x":50,"y":39}},
        {"type":"LIGHTS","position":{"x":59,"y":57}},{"type":"ELECTRONIC","position":{"x":62,"y":52}},
        {"type":"BATTERY","position":{"x":39,"y":58}},{"type":"LOAD","position":{"x":23,"y":56}},
        {"type":"ENGINE","position":{"x":73,"y":61}},{"type":"EXHAUST","position":{"x":38,"y":68}},
        {"type":"FUEL","position":{"x":29,"y":67}},{"type":"GEARBOX","position":{"x":71,"y":72}}]
  },
  [EEquipmentModel.ISUZU_NPS]: {
    name: 'Isuzu NPS Tandem Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.ISUZU,
    image: ISUZU_NPS_IMG,
    parts: [{"type":"BRAKES","position":{"x":32,"y":83}},{"type":"SUSPENSION","position":{"x":20,"y":70}},
          {"type":"WHEELS","position":{"x":23,"y":82}},{"type":"BODY","position":{"x":22,"y":56}},
          {"type":"FRAME","position":{"x":32,"y":77}},{"type":"INTERIOR","position":{"x":37,"y":34}},
          {"type":"BATTERY","position":{"x":20,"y":62}},{"type":"ELECTRONIC","position":{"x":36,"y":48}},
          {"type":"LIGHTS","position":{"x":35,"y":60}},{"type":"LOAD","position":{"x":14,"y":60}},
          {"type":"ENGINE","position":{"x":63,"y":66}},{"type":"EXHAUST","position":{"x":18,"y":77}},
          {"type":"FUEL","position":{"x":14,"y":72}},{"type":"GEARBOX","position":{"x":60,"y":78}}]
  },
  [EEquipmentModel.IVECO_DAILY_L3H2]: {
    name: 'Iveco Daily L3H2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L3H2,
    brand: EBrand.IVECO,
    image: IVECO_DAILY_L3H2_IMG,
    parts: [{"type":"BRAKES","position":{"x":38,"y":75}},{"type":"SUSPENSION","position":{"x":43,"y":64}},
          {"type":"WHEELS","position":{"x":48,"y":75}},{"type":"BODY","position":{"x":68,"y":60}},
          {"type":"FRAME","position":{"x":64,"y":68}},{"type":"INTERIOR","position":{"x":39,"y":44}},
          {"type":"BATTERY","position":{"x":26,"y":62}},{"type":"ELECTRONIC","position":{"x":24,"y":50}},
          {"type":"LIGHTS","position":{"x":32,"y":53}},{"type":"LOAD","position":{"x":78,"y":51}},
          {"type":"DOORS","position":{"x":69,"y":43}},{"type":"ENGINE","position":{"x":15,"y":60}},
          {"type":"EXHAUST","position":{"x":57,"y":71}},{"type":"FUEL","position":{"x":61,"y":52}},
          {"type":"GEARBOX","position":{"x":16,"y":73}}]
  },
  [EEquipmentModel.IVECO_EUROCARGO]: {
    name: 'Iveco Eurocargo Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.IVECO,
    image: IVECO_EUROCARGO_IMG,
    parts: [{"type":"BRAKES","position":{"x":42,"y":70}},{"type":"WHEELS","position":{"x":50,"y":69}},
          {"type":"SUSPENSION","position":{"x":45,"y":60}},{"type":"BODY","position":{"x":40,"y":52}},
          {"type":"FRAME","position":{"x":35,"y":70}},{"type":"INTERIOR","position":{"x":28,"y":40}},
          {"type":"BATTERY","position":{"x":53,"y":60}},{"type":"ELECTRONIC","position":{"x":29,"y":52}},
          {"type":"LIGHTS","position":{"x":31,"y":63}},{"type":"DOORS","position":{"x":85,"y":47}},
          {"type":"LOAD","position":{"x":68,"y":52}},{"type":"ENGINE","position":{"x":20,"y":61}},
          {"type":"COMPRESSOR","position":{"x":11,"y":60}},{"type":"EXHAUST","position":{"x":58,"y":69}},
          {"type":"FUEL","position":{"x":65,"y":67}},{"type":"GEARBOX","position":{"x":21,"y":70}}]
  },
  [EEquipmentModel.IVECO_S_WAY]: {
    name: 'Iveco S Way Semi Truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.IVECO,
    image: IVECO_S_WAY_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":77}},{"type":"SUSPENSION","position":{"x":62,"y":63}},
          {"type":"WHEELS","position":{"x":66,"y":75}},{"type":"BODY","position":{"x":49,"y":49}},
          {"type":"FRAME","position":{"x":48,"y":78}},{"type":"INTERIOR","position":{"x":38,"y":36}},
          {"type":"BATTERY","position":{"x":40,"y":71}},{"type":"ELECTRONIC","position":{"x":47,"y":58}},
          {"type":"LIGHTS","position":{"x":50,"y":67}},{"type":"FIFTH_WHEEL","position":{"x":77,"y":62}},
          {"type":"COMPRESSOR","position":{"x":21,"y":69}},{"type":"ENGINE","position":{"x":30,"y":72}},
          {"type":"EXHAUST","position":{"x":72,"y":79}},{"type":"FUEL","position":{"x":73,"y":69}},
          {"type":"GEARBOX","position":{"x":34,"y":82}}]
  },
  [EEquipmentModel.IVECO_S_WAY_TANDEM]: {
    name: 'Iveco S Way Tandem Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.IVECO,
    image: IVECO_S_WAY_TANDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":39,"y":63}},{"type":"SUSPENSION","position":{"x":45,"y":56}},
            {"type":"WHEELS","position":{"x":46,"y":64}},{"type":"BODY","position":{"x":28,"y":47}},
            {"type":"FRAME","position":{"x":29,"y":65}},{"type":"INTERIOR","position":{"x":25,"y":35}},
            {"type":"BATTERY","position":{"x":24,"y":54}},{"type":"ELECTRONIC","position":{"x":33,"y":52}},
            {"type":"LIGHTS","position":{"x":27,"y":58}},{"type":"LOAD","position":{"x":63,"y":46}},
            {"type":"COMPRESSOR","position":{"x":8,"y":56}},{"type":"ENGINE","position":{"x":16,"y":59}},
            {"type":"EXHAUST","position":{"x":51,"y":63}},{"type":"FUEL","position":{"x":58,"y":56}},
            {"type":"GEARBOX","position":{"x":22,"y":67}}]
  },
  [EEquipmentModel.Iveco_Stralis_4x2]: {
    name: 'Iveco Stralis 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.IVECO,
    image: Iveco_Stralis_4x2_IMG,
    parts: [{"type":"BATTERY","position":{"x":19,"y":68}},{"type":"ELECTRONIC","position":{"x":35,"y":56}},
            {"type":"LIGHTS","position":{"x":11,"y":72}},{"type":"FIFTH_WHEEL","position":{"x":69,"y":56}},
            {"type":"GEARBOX","position":{"x":48,"y":70}},{"type":"ENGINE","position":{"x":35,"y":72}},
            {"type":"EXHAUST","position":{"x":78,"y":75}},{"type":"FUEL","position":{"x":37,"y":62}},
            {"type":"COMPRESSOR","position":{"x":28,"y":72}},{"type":"INTERIOR","position":{"x":27,"y":43}},
            {"type":"BODY","position":{"x":15,"y":53}},{"type":"FRAME","position":{"x":16,"y":77}},
            {"type":"WHEELS","position":{"x":58,"y":78}},{"type":"SUSPENSION","position":{"x":57,"y":67}},
            {"type":"BRAKES","position":{"x":52,"y":77}}]
  },
  [EEquipmentModel.Iveco_Stralis_6x2]: {
    name: 'Iveco Stralis 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.IVECO,
    image: Iveco_Stralis_6x2_IMG,
    parts: [{"type":"GEARBOX","position":{"x":50,"y":68}},{"type":"ENGINE","position":{"x":36,"y":69}},
            {"type":"COMPRESSOR","position":{"x":22,"y":66}},{"type":"EXHAUST","position":{"x":70,"y":72}},
            {"type":"FUEL","position":{"x":35,"y":59}},{"type":"FIFTH_WHEEL","position":{"x":70,"y":60}},
            {"type":"WHEELS","position":{"x":54,"y":80}},{"type":"SUSPENSION","position":{"x":55,"y":66}},
            {"type":"BRAKES","position":{"x":49,"y":77}},{"type":"BODY","position":{"x":15,"y":50}},
            {"type":"INTERIOR","position":{"x":22,"y":41}},{"type":"FRAME","position":{"x":16,"y":78}},
            {"type":"BATTERY","position":{"x":12,"y":61}},{"type":"LIGHTS","position":{"x":9,"y":71}},
            {"type":"ELECTRONIC","position":{"x":26,"y":57}}]
  },
  [EEquipmentModel.Iveco_Stralis_Hiway_4x2]: {
    name: 'Iveco Stralis Hi-Way 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.IVECO,
    image: Iveco_Stralis_Hiway_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":78}},{"type":"WHEELS","position":{"x":59,"y":80}},
            {"type":"SUSPENSION","position":{"x":58,"y":67}},{"type":"BODY","position":{"x":19,"y":53}},
            {"type":"FRAME","position":{"x":17,"y":81}},{"type":"FRAME","position":{"x":23,"y":39}},
            {"type":"BATTERY","position":{"x":15,"y":61}},{"type":"ELECTRONIC","position":{"x":36,"y":57}},
            {"type":"LIGHTS","position":{"x":13,"y":72}},{"type":"FIFTH_WHEEL","position":{"x":69,"y":60}},
            {"type":"ENGINE","position":{"x":40,"y":71}},{"type":"GEARBOX","position":{"x":48,"y":69}},
            {"type":"FUEL","position":{"x":74,"y":62}},{"type":"EXHAUST","position":{"x":75,"y":77}},
            {"type":"COMPRESSOR","position":{"x":30,"y":68}}]
  },
  [EEquipmentModel.Iveco_Stralis_Hiway_6x2]: {
    name: 'Iveco Stralis Hi-Way 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.IVECO,
    image: Iveco_Stralis_Hiway_6x2_IMG,
    parts: [{"type":"WHEELS","position":{"x":57,"y":78}},{"type":"SUSPENSION","position":{"x":55,"y":67}},
            {"type":"BRAKES","position":{"x":51,"y":77}},{"type":"BODY","position":{"x":14,"y":52}},
            {"type":"FRAME","position":{"x":16,"y":80}},{"type":"INTERIOR","position":{"x":26,"y":41}},
            {"type":"BATTERY","position":{"x":18,"y":60}},{"type":"ELECTRONIC","position":{"x":35,"y":60}},
            {"type":"LIGHTS","position":{"x":12,"y":74}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":60}},
            {"type":"ENGINE","position":{"x":31,"y":73}},{"type":"EXHAUST","position":{"x":72,"y":75}},
            {"type":"GEARBOX","position":{"x":40,"y":70}},{"type":"FUEL","position":{"x":64,"y":69}},
            {"type":"COMPRESSOR","position":{"x":23,"y":72}}]
  },
  [EEquipmentModel.IVECO_TRAKKER]: {
    name: 'Iveco Trakker Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T8x4,
    brand: EBrand.IVECO,
    image: IVECO_TRAKKER_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":82}},{"type":"SUSPENSION","position":{"x":30,"y":67}},
          {"type":"WHEELS","position":{"x":27,"y":81}},{"type":"BODY","position":{"x":31,"y":47}},
          {"type":"FRAME","position":{"x":40,"y":75}},{"type":"INTERIOR","position":{"x":48,"y":29}},
          {"type":"BATTERY","position":{"x":85,"y":51}},{"type":"ELECTRONIC","position":{"x":84,"y":38}},
          {"type":"LIGHTS","position":{"x":91,"y":65}},{"type":"LOAD","position":{"x":20,"y":53}},
          {"type":"ENGINE","position":{"x":67,"y":61}},{"type":"COMPRESSOR","position":{"x":50,"y":58}},
          {"type":"EXHAUST","position":{"x":22,"y":70}},{"type":"FUEL","position":{"x":15,"y":67}},
          {"type":"GEARBOX","position":{"x":64,"y":75}}]
  },
  [EEquipmentModel.J_J_BODIES_210_LARGE_DT]: {
    name: 'J&J Bodies 210 Large DT Tipper Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_2_AXLES,
    brand: EBrand.J_J_BODIES,
    image: J_J_BODIES_210_LARGE_DT_IMG,
    parts: [{"type":"BRAKES","position":{"x":64,"y":56}},{"type":"SUSPENSION","position":{"x":58,"y":45}},
          {"type":"WHEELS","position":{"x":51,"y":57}},{"type":"FRAME","position":{"x":38,"y":49}},
          {"type":"BODY","position":{"x":32,"y":36}},{"type":"LIGHTS","position":{"x":76,"y":45}},
          {"type":"LOAD","position":{"x":65,"y":34}},{"type":"DOORS","position":{"x":87,"y":34}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":14,"y":45}}]
  },
  [EEquipmentModel.J_J_BODIES_211_LARGE_DT_FTA]: {
    name: 'J&J Bodies 211 Large DT FTA Tipper Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_2_AXLES,
    brand: EBrand.J_J_BODIES,
    image: J_J_BODIES_211_LARGE_DT_FTA_IMG,
    parts: [{"type":"BRAKES","position":{"x":81,"y":60}},{"type":"WHEELS","position":{"x":89,"y":61}},
          {"type":"SUSPENSION","position":{"x":83,"y":53}},{"type":"FRAME","position":{"x":56,"y":52}},
          {"type":"BODY","position":{"x":59,"y":41}},{"type":"LIGHTS","position":{"x":94,"y":53}},
          {"type":"LOAD","position":{"x":46,"y":40}},{"type":"DOORS","position":{"x":92,"y":41}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":25,"y":51}}]
  },
  [EEquipmentModel.J_J_BODIES_267_LARGE_DT_FL]: {
    name: 'J&J Bodies 267 Large DT FL Tipper Trailer 1+1 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_1_1_AXLES,
    brand: EBrand.J_J_BODIES,
    image: J_J_BODIES_267_LARGE_DT_FL_IMG,
    parts: [{"type":"BRAKES","position":{"x":32,"y":62}},{"type":"WHEELS","position":{"x":23,"y":66}},
        {"type":"SUSPENSION","position":{"x":21,"y":57}},{"type":"BODY","position":{"x":39,"y":45}},
        {"type":"FRAME","position":{"x":46,"y":51}},{"type":"LIGHTS","position":{"x":9,"y":65}},
        {"type":"LOAD","position":{"x":51,"y":43}},{"type":"TRAILER_ATTACHMENT","position":{"x":88,"y":66}},
        {"type":"DOORS","position":{"x":7,"y":58}},{"type":"HYDRAULIC","position":{"x":86,"y":45}}]
  },
  [EEquipmentModel.J_J_BODIES_266_LARGE_TT_LFEVO]: {
    name: 'J&J Bodies 266 Large TT LF EVO Tipper Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_2_AXLES,
    brand: EBrand.J_J_BODIES,
    image: J_J_BODIES_266_LARGE_TT_LFEVO_IMG,
    parts: [{"type":"BRAKES","position":{"x":87,"y":54}},{"type":"WHEELS","position":{"x":92,"y":55}},
          {"type":"SUSPENSION","position":{"x":87,"y":48}},{"type":"BODY","position":{"x":55,"y":40}},
          {"type":"FRAME","position":{"x":54,"y":51}},{"type":"LIGHTS","position":{"x":96,"y":48}},
          {"type":"DOORS","position":{"x":90,"y":40}},{"type":"LOAD","position":{"x":68,"y":46}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":24,"y":50}}]
  },
  [EEquipmentModel.J_J_BODIES_215_LARGE_TT_AT]: {
    name: 'J&J Bodies 215 Large TT AT Tipper Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_2_AXLES,
    brand: EBrand.J_J_BODIES,
    image: J_J_BODIES_215_LARGE_TT_AT_IMG,
    parts: [{"type":"BRAKES","position":{"x":30,"y":58}},{"type":"SUSPENSION","position":{"x":31,"y":50}},
          {"type":"WHEELS","position":{"x":38,"y":55}},{"type":"FRAME","position":{"x":52,"y":50}},
          {"type":"BODY","position":{"x":50,"y":36}},{"type":"LIGHTS","position":{"x":17,"y":52}},
          {"type":"DOORS","position":{"x":14,"y":38}},{"type":"LOAD","position":{"x":70,"y":44}},
          {"type":"TRAILER_ATTACHMENT","position":{"x":85,"y":49}}]
  },
  [EEquipmentModel.J_J_BODIES_697_MH_EVO]: {
    name: 'J&J Bodies 697 MH EVO Tandem Tipper Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T6x2,
    brand: EBrand.J_J_BODIES,
    image: J_J_BODIES_697_MH_EVO_IMG,
    parts: [{"type":"BRAKES","position":{"x":39,"y":63}},{"type":"SUSPENSION","position":{"x":45,"y":56}},
            {"type":"WHEELS","position":{"x":46,"y":64}},{"type":"BODY","position":{"x":28,"y":47}},
            {"type":"FRAME","position":{"x":29,"y":65}},{"type":"INTERIOR","position":{"x":25,"y":35}},
            {"type":"BATTERY","position":{"x":24,"y":54}},{"type":"ELECTRONIC","position":{"x":33,"y":52}},
            {"type":"LIGHTS","position":{"x":27,"y":58}},{"type":"LOAD","position":{"x":63,"y":46}},
            {"type":"COMPRESSOR","position":{"x":8,"y":56}},{"type":"ENGINE","position":{"x":16,"y":59}},
            {"type":"EXHAUST","position":{"x":51,"y":63}},{"type":"FUEL","position":{"x":58,"y":56}},
            {"type":"GEARBOX","position":{"x":22,"y":67}}]
  },
  [EEquipmentModel.KAMAZ_5490]: {
    name: 'Kamaz 5490 Semi Truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.KAMAZ,
    image: KAMAZ_5490_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":88}},{"type":"SUSPENSION","position":{"x":61,"y":72}},
        {"type":"WHEELS","position":{"x":68,"y":84}},{"type":"BODY","position":{"x":10,"y":50}},
        {"type":"FRAME","position":{"x":9,"y":81}},{"type":"INTERIOR","position":{"x":27,"y":39}},
        {"type":"BATTERY","position":{"x":37,"y":57}},{"type":"ELECTRONIC","position":{"x":47,"y":53}},
        {"type":"LIGHTS","position":{"x":45,"y":76}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":68}},
        {"type":"COMPRESSOR","position":{"x":14,"y":67}},{"type":"ENGINE","position":{"x":24,"y":74}},
        {"type":"EXHAUST","position":{"x":76,"y":79}},{"type":"FUEL","position":{"x":82,"y":71}},
        {"type":"GEARBOX","position":{"x":30,"y":86}}]
  },
  [EEquipmentModel.KASSBOHRER_BOX_DRY_K_SBT_20_12_27]: {
    name: 'Kassbohrer Box Dry Van K SBT / 20 - 12 / 27 Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_BOX_DRY_K_SBT_20_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":80}},{"type":"WHEELS","position":{"x":36,"y":81}},
    {"type":"SUSPENSION","position":{"x":43,"y":71}},{"type":"BODY","position":{"x":23,"y":50}},
    {"type":"FRAME","position":{"x":21,"y":66}},{"type":"SUPPORT","position":{"x":15,"y":73}},
    {"type":"LIGHTS","position":{"x":63,"y":75}},{"type":"DOORS","position":{"x":73,"y":55}},
    {"type":"LOAD","position":{"x":40,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":65}}]
  },
  [EEquipmentModel.KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AH_45_12_27]: {
    name: 'Kassbohrer K SHG AH / 45 - 12 / 27 Extandable Container Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AH_45_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":38,"y":53}},{"type":"WHEELS","position":{"x":30,"y":54}},
    {"type":"SUSPENSION","position":{"x":35,"y":46}},{"type":"FRAME","position":{"x":22,"y":35}},
    {"type":"SUPPORT","position":{"x":11,"y":39}},{"type":"LIGHTS","position":{"x":57,"y":68}},
    {"type":"LOAD","position":{"x":46,"y":41}},{"type":"TRAILER_ATTACHMENT","position":{"x":10,"y":26}}]
  },
  [EEquipmentModel.KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AMH_40_12_27]: {
    name: 'Kassbohrer K SHG AMH / 40 - 12 / 27 Extandable Container Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_CONTAINER_EXTENDABLE_K_SHG_AMH_40_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":57}},{"type":"WHEELS","position":{"x":40,"y":59}},
    {"type":"SUSPENSION","position":{"x":53,"y":59}},{"type":"FRAME","position":{"x":38,"y":44}},
    {"type":"SUPPORT","position":{"x":17,"y":43}},{"type":"LIGHTS","position":{"x":66,"y":62}},
    {"type":"LOAD","position":{"x":52,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":13,"y":33}}]
  },
  [EEquipmentModel.KASSBOHRER_FLATBED_LIGHT_K_SFS_X_PLUS_90_12_27]: {
    name: 'Kassbohrer K SFS X+ / 90 - 12 / 27 Light Flatbed Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_FLATBED_LIGHT_K_SFS_X_PLUS_90_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":41,"y":62}},{"type":"WHEELS","position":{"x":33,"y":57}},
    {"type":"SUSPENSION","position":{"x":40,"y":56}},{"type":"FRAME","position":{"x":21,"y":50}},
    {"type":"SUPPORT","position":{"x":12,"y":53}},{"type":"LIGHTS","position":{"x":61,"y":60}},
    {"type":"LOAD","position":{"x":52,"y":47}},{"type":"TRAILER_ATTACHMENT","position":{"x":10,"y":42}}]
  },
  [EEquipmentModel.KASSBOHRER_FLATBED_LIGHT_K_SPS_3_0N_12_27]: {
    name: 'Kassbohrer K SPS 3 0N / 12 / 27 Light Flatbed Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_FLATBED_LIGHT_K_SPS_3_0N_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":60}},{"type":"WHEELS","position":{"x":34,"y":60}},
    {"type":"SUSPENSION","position":{"x":44,"y":55}},{"type":"FRAME","position":{"x":31,"y":48}},
    {"type":"SUPPORT","position":{"x":12,"y":49}},{"type":"LIGHTS","position":{"x":65,"y":56}},
    {"type":"LOAD","position":{"x":47,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":9,"y":44}}]
  },
  [EEquipmentModel.KASSBOHRER_LIGHT_K_SCL_X_PLUS_150_12_27]: {
    name: 'Kassbohrer K SCL X+ / 150 - 12 / 27 Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_LIGHT_K_SCL_X_PLUS_150_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":73}},{"type":"SUSPENSION","position":{"x":51,"y":68}},
    {"type":"WHEELS","position":{"x":45,"y":74}},{"type":"BODY","position":{"x":32,"y":51}},
    {"type":"FRAME","position":{"x":29,"y":64}},{"type":"SUPPORT","position":{"x":15,"y":64}},
    {"type":"LIGHTS","position":{"x":76,"y":71}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":56}},
    {"type":"LOAD","position":{"x":45,"y":54}},{"type":"DOORS","position":{"x":85,"y":59}}]
  },
  [EEquipmentModel.KASSBOHRER_LOWBED_K_SLS_3_0N_12_27]: {
    name: 'Kassbohrer K SLS 3 0N / 12 / 27 Lowbed Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_LOWBED_K_SLS_3_0N_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":68}},{"type":"WHEELS","position":{"x":44,"y":69}},
    {"type":"SUSPENSION","position":{"x":48,"y":65}},{"type":"FRAME","position":{"x":33,"y":61}},
    {"type":"SUPPORT","position":{"x":15,"y":64}},{"type":"LIGHTS","position":{"x":67,"y":72}},
    {"type":"LOAD","position":{"x":49,"y":60}},{"type":"RAMP","position":{"x":72,"y":57}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":6,"y":56}}]
  },
  [EEquipmentModel.KASSBOHRER_REEFER_STANDARD_K_SRI_C_10_12_27]: {
    name: 'Kassbohrer K SRI C / 10 - 12 / 27 Reefer / Refrigerated Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_REEFER_STANDARD_K_SRI_C_10_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":80}},{"type":"SUSPENSION","position":{"x":45,"y":74}},
    {"type":"WHEELS","position":{"x":38,"y":79}},{"type":"FRAME","position":{"x":26,"y":70}},
    {"type":"BODY","position":{"x":34,"y":55}},{"type":"SUPPORT","position":{"x":16,"y":71}},
    {"type":"LIGHTS","position":{"x":58,"y":81}},{"type":"LIGHTS","position":{"x":73,"y":45}},
    {"type":"FRIGO","position":{"x":15,"y":49}},{"type":"LOAD","position":{"x":40,"y":65}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":11,"y":65}}]
  },
  [EEquipmentModel.KASSBOHRER_SILO_TIPPING_K_SSK_40_3_10_24]: {
    name: 'Kassbohrer K SSK 40 / 3 - 10 / 24 Silo Tipping / Tank Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_SILO_TIPPING_K_SSK_40_3_10_24_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":78}},{"type":"SUSPENSION","position":{"x":44,"y":72}},
    {"type":"WHEELS","position":{"x":36,"y":76}},{"type":"BODY","position":{"x":27,"y":45}},
    {"type":"FRAME","position":{"x":24,"y":64}},{"type":"SUPPORT","position":{"x":12,"y":67}},
    {"type":"LIGHTS","position":{"x":64,"y":77}},{"type":"LOAD","position":{"x":45,"y":55}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":6,"y":61}},{"type":"DOORS","position":{"x":46,"y":27}}]
  },
  [EEquipmentModel.KASSBOHRER_SILO_TIPPING_K_SSK_60_5_10_24]: {
    name: 'Kassbohrer K SSK 60 / 5 - 10 / 24 Silo Tipping / Tank Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_SILO_TIPPING_K_SSK_60_5_10_24_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":73}},{"type":"WHEELS","position":{"x":43,"y":76}},
    {"type":"SUSPENSION","position":{"x":50,"y":67}},{"type":"BODY","position":{"x":25,"y":48}},
    {"type":"FRAME","position":{"x":26,"y":63}},{"type":"SUPPORT","position":{"x":16,"y":69}},
    {"type":"LIGHTS","position":{"x":66,"y":76}},{"type":"LOAD","position":{"x":45,"y":54}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":13,"y":60}},{"type":"DOORS","position":{"x":49,"y":28}}]
  },
  [EEquipmentModel.KASSBOHRER_STANDARD_K_SCD_M_90_12_27]: {
    name: 'Kassbohrer Standard K SCD M / 90 - 12 / 27 Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_STANDARD_K_SCD_M_90_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":79}},{"type":"WHEELS","position":{"x":39,"y":79}},
    {"type":"SUSPENSION","position":{"x":42,"y":74}},{"type":"BODY","position":{"x":25,"y":57}},
    {"type":"SUPPORT","position":{"x":14,"y":72}},{"type":"FRAME","position":{"x":23,"y":70}},
    {"type":"LIGHTS","position":{"x":68,"y":80}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":66}},
    {"type":"LOAD","position":{"x":38,"y":64}},{"type":"DOORS","position":{"x":75,"y":58}}]
  },
  [EEquipmentModel.KASSBOHRER_STANDARD_K_SCX_X_125_12_27]: {
    name: 'Kassbohrer Standard K SCX X / 125 - 12 / 27 Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_STANDARD_K_SCX_X_125_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":42,"y":76}},{"type":"WHEELS","position":{"x":34,"y":75}},
    {"type":"SUSPENSION","position":{"x":45,"y":72}},{"type":"BODY","position":{"x":34,"y":46}},
    {"type":"FRAME","position":{"x":20,"y":64}},{"type":"SUPPORT","position":{"x":11,"y":64}},
    {"type":"LIGHTS","position":{"x":63,"y":80}},{"type":"DOORS","position":{"x":76,"y":52}},
    {"type":"LOAD","position":{"x":41,"y":63}},{"type":"TRAILER_ATTACHMENT","position":{"x":6,"y":59}}]
  },
  [EEquipmentModel.KASSBOHRER_TANK_DANGEROUS_K_STB_E_39_5_11_24]: {
    name: 'Kassbohrer K STBE 39 / 5 - 11 / 24 Dangerous Tank Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_TANK_DANGEROUS_K_STB_E_39_5_11_24_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":72}},{"type":"WHEELS","position":{"x":48,"y":71}},
    {"type":"SUSPENSION","position":{"x":55,"y":66}},{"type":"BODY","position":{"x":19,"y":50}},
    {"type":"FRAME","position":{"x":26,"y":58}},{"type":"SUPPORT","position":{"x":13,"y":68}},
    {"type":"LIGHTS","position":{"x":66,"y":72}},{"type":"LOAD","position":{"x":39,"y":51}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":9,"y":57}},{"type":"DOORS","position":{"x":43,"y":29}}]
  },
  [EEquipmentModel.KASSBOHRER_TANK_DANGEROUS_K_STS_32_1_10_24]: {
    name: 'Kassbohrer K STS 32 / 1 - 10 / 24 Dangerous Tank Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_TANK_DANGEROUS_K_STS_32_1_10_24_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":73}},{"type":"SUSPENSION","position":{"x":53,"y":70}},
    {"type":"WHEELS","position":{"x":41,"y":71}},{"type":"BODY","position":{"x":31,"y":49}},
    {"type":"FRAME","position":{"x":26,"y":62}},{"type":"SUPPORT","position":{"x":18,"y":69}},
    {"type":"LIGHTS","position":{"x":64,"y":69}},{"type":"LOAD","position":{"x":46,"y":56}},
    {"type":"DOORS","position":{"x":39,"y":31}},{"type":"TRAILER_ATTACHMENT","position":{"x":15,"y":58}}]
  },
  [EEquipmentModel.KASSBOHRER_TANK_FOOD_K_STL_30_3_10_24]: {
    name: 'Kassbohrer K STL30 / 3 - 10 / 24 Food Tank Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_TANK_FOOD_K_STL_30_3_10_24_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":76}},{"type":"WHEELS","position":{"x":43,"y":75}},
    {"type":"SUSPENSION","position":{"x":53,"y":72}},{"type":"BODY","position":{"x":23,"y":51}},
    {"type":"FRAME","position":{"x":17,"y":61}},{"type":"SUPPORT","position":{"x":15,"y":72}},
    {"type":"LIGHTS","position":{"x":68,"y":75}},{"type":"DOORS","position":{"x":39,"y":30}},
    {"type":"LOAD","position":{"x":40,"y":51}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":59}}]
  },
  [EEquipmentModel.KASSBOHRER_TIPPER_ALU_K_SKA_B_26_12_27]: {
    name: 'Kassbohrer Aluminium K SKA B / 26 - 12 / 27 Tipper Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_TIPPER_ALU_K_SKA_B_26_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":70}},{"type":"WHEELS","position":{"x":47,"y":68}},
    {"type":"SUSPENSION","position":{"x":58,"y":65}},{"type":"BODY","position":{"x":19,"y":43}},
    {"type":"FRAME","position":{"x":22,"y":54}},{"type":"SUPPORT","position":{"x":15,"y":58}},
    {"type":"LIGHTS","position":{"x":56,"y":59}},{"type":"TRAILER_ATTACHMENT","position":{"x":17,"y":55}},
    {"type":"DOORS","position":{"x":66,"y":41}},{"type":"LOAD","position":{"x":38,"y":50}}]
  },
  [EEquipmentModel.KASSBOHRER_TIPPER_STEEL_K_SKS_B_24_15_18]: {
    name: 'Kassbohrer Steel K SKS B / 24 - 15 / 18 Tipper Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_2_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_TIPPER_STEEL_K_SKS_B_24_15_18_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":70}},{"type":"WHEELS","position":{"x":41,"y":66}},
    {"type":"SUSPENSION","position":{"x":56,"y":66}},{"type":"BODY","position":{"x":37,"y":39}},
    {"type":"FRAME","position":{"x":36,"y":55}},{"type":"SUPPORT","position":{"x":25,"y":59}},
    {"type":"LIGHTS","position":{"x":51,"y":63}},{"type":"LOAD","position":{"x":45,"y":50}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":20,"y":54}},{"type":"DOORS","position":{"x":69,"y":32}}]
  },
  [EEquipmentModel.KASSBOHRER_TIPPER_STEEL_K_SKS_BS_24_12_27]: {
    name: 'Kassbohrer Steel K SKS BS / 24 - 12 / 27 Tipper Trailer 3 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.KASSBOHRER,
    image: KASSBOHRER_TIPPER_STEEL_K_SKS_BS_24_12_27_IMG,
    parts: [{"type":"BRAKES","position":{"x":58,"y":68}},{"type":"SUSPENSION","position":{"x":60,"y":65}},
    {"type":"WHEELS","position":{"x":45,"y":69}},{"type":"BODY","position":{"x":31,"y":42}},
    {"type":"FRAME","position":{"x":26,"y":53}},{"type":"SUPPORT","position":{"x":20,"y":58}},
    {"type":"LIGHTS","position":{"x":58,"y":59}},{"type":"LOAD","position":{"x":48,"y":48}},
    {"type":"DOORS","position":{"x":81,"y":49}},{"type":"TRAILER_ATTACHMENT","position":{"x":15,"y":51}}]
  },
  [EEquipmentModel.KENTUCKY_TRAILER_53_COMPOSITE_STRAIGHT_FLOOR]: {
    name: 'Kentucky Trailers 53" Composite Straight Floor Trailer 2 axles',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.KENTUCKY_TRAILER,
    image: KENTUCKY_TRAILER_53_COMPOSITE_STRAIGHT_FLOOR_IMG,
    parts: [{"type":"BRAKES","position":{"x":21,"y":69}},{"type":"SUSPENSION","position":{"x":21,"y":64}},
    {"type":"WHEELS","position":{"x":18,"y":66}},{"type":"BODY","position":{"x":33,"y":49}},
    {"type":"FRAME","position":{"x":33,"y":63}},{"type":"SUPPORT","position":{"x":54,"y":72}},
    {"type":"LIGHTS","position":{"x":5,"y":62}},{"type":"DOORS","position":{"x":7,"y":48}},
    {"type":"LOAD","position":{"x":27,"y":58}},{"type":"TRAILER_ATTACHMENT","position":{"x":83,"y":63}}]
  },
  [EEquipmentModel.KENTUCKY_TRAILER_BEVERAGE]: {
    name: 'Kentucky Trailers Beverage 2 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.KENTUCKY_TRAILER,
    image: KENTUCKY_TRAILER_BEVERAGE_IMG,
    parts: [{"type":"BRAKES","position":{"x":41,"y":71}},{"type":"SUSPENSION","position":{"x":41,"y":67}},
    {"type":"WHEELS","position":{"x":32,"y":68}},{"type":"BODY","position":{"x":23,"y":41}},
    {"type":"FRAME","position":{"x":19,"y":61}},{"type":"SUPPORT","position":{"x":12,"y":67}},
    {"type":"LIGHTS","position":{"x":45,"y":53}},{"type":"RAMP","position":{"x":72,"y":78}},
    {"type":"LOAD","position":{"x":47,"y":58}},{"type":"TRAILER_ATTACHMENT","position":{"x":5,"y":57}}]
  },
  [EEquipmentModel.KENTUCKY_TRAILER_MOVING]: {
    name: 'Kentucky Trailers Moving 4x2 Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_big,
    brand: EBrand.KENTUCKY_TRAILER,
    image: KENTUCKY_TRAILER_MOVING_IMG,
    parts: [{"type":"BRAKES","position":{"x":29,"y":63}},{"type":"SUSPENSION","position":{"x":28,"y":60}},
    {"type":"WHEELS","position":{"x":23,"y":64}},{"type":"BODY","position":{"x":27,"y":38}},
    {"type":"FRAME","position":{"x":46,"y":62}},{"type":"INTERIOR","position":{"x":70,"y":49}},
    {"type":"LIGHTS","position":{"x":88,"y":60}},{"type":"ELECTRONIC","position":{"x":84,"y":56}},
    {"type":"BATTERY","position":{"x":76,"y":61}},{"type":"DOORS","position":{"x":34,"y":52}},
    {"type":"LOAD","position":{"x":23,"y":55}},{"type":"COMPRESSOR","position":{"x":87,"y":64}},
    {"type":"ENGINE","position":{"x":96,"y":60}},{"type":"EXHAUST","position":{"x":64,"y":63}},
    {"type":"FUEL","position":{"x":65,"y":57}},{"type":"GEARBOX","position":{"x":92,"y":65}}]
  },
  [EEquipmentModel.KENWORTH_C500]: {
    name: 'Kenworth C500 Heavy Semi Truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.KENWORTH,
    image: KENWORTH_C500_IMG,
    parts: [{"type":"BRAKES","position":{"x":75,"y":68}},{"type":"SUSPENSION","position":{"x":80,"y":59}},
    {"type":"WHEELS","position":{"x":86,"y":68}},{"type":"BODY","position":{"x":61,"y":47}},
    {"type":"FRAME","position":{"x":65,"y":69}},{"type":"INTERIOR","position":{"x":44,"y":34}},
    {"type":"LIGHTS","position":{"x":40,"y":52}},{"type":"BATTERY","position":{"x":59,"y":57}},
    {"type":"FIFTH_WHEEL","position":{"x":76,"y":52}},{"type":"COMPRESSOR","position":{"x":14,"y":60}},
    {"type":"ENGINE","position":{"x":25,"y":49}},{"type":"EXHAUST","position":{"x":36,"y":26}},
    {"type":"FUEL","position":{"x":66,"y":59}},{"type":"GEARBOX","position":{"x":33,"y":63}}]
  },
  [EEquipmentModel.KENWORTH_K270]: {
    name: 'Kenworth K270 Tandem Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.KENWORTH,
    image: KENWORTH_K270_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":80}},{"type":"SUSPENSION","position":{"x":45,"y":68}},
    {"type":"WHEELS","position":{"x":39,"y":78}},{"type":"BODY","position":{"x":41,"y":57}},
    {"type":"FRAME","position":{"x":37,"y":67}},{"type":"INTERIOR","position":{"x":52,"y":40}},
    {"type":"BATTERY","position":{"x":86,"y":67}},{"type":"ELECTRONIC","position":{"x":90,"y":57}},
    {"type":"LIGHTS","position":{"x":93,"y":68}},{"type":"DOORS","position":{"x":11,"y":53}},
    {"type":"LOAD","position":{"x":20,"y":59}},{"type":"COMPRESSOR","position":{"x":65,"y":72}},
    {"type":"ENGINE","position":{"x":77,"y":67}},{"type":"EXHAUST","position":{"x":36,"y":72}},
    {"type":"FUEL","position":{"x":67,"y":61}},{"type":"GEARBOX","position":{"x":75,"y":75}}]
  },
  [EEquipmentModel.KENWORTH_T660]: {
    name: 'Kenworth T660 Semi Truck 6x4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.KENWORTH,
    image: KENWORTH_T660_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":84}},{"type":"SUSPENSION","position":{"x":58,"y":66}},
    {"type":"WHEELS","position":{"x":61,"y":76}},{"type":"BODY","position":{"x":57,"y":53}},
    {"type":"INTERIOR","position":{"x":53,"y":34}},{"type":"FRAME","position":{"x":70,"y":80}},
    {"type":"BATTERY","position":{"x":52,"y":68}},{"type":"ELECTRONIC","position":{"x":53,"y":53}},
    {"type":"LIGHTS","position":{"x":42,"y":66}},{"type":"FIFTH_WHEEL","position":{"x":83,"y":63}},
    {"type":"COMPRESSOR","position":{"x":10,"y":71}},{"type":"ENGINE","position":{"x":22,"y":64}},
    {"type":"EXHAUST","position":{"x":83,"y":54}},{"type":"FUEL","position":{"x":82,"y":68}},
    {"type":"GEARBOX","position":{"x":26,"y":81}}]
  },
  [EEquipmentModel.KENWORTH_T800]: {
    name: 'Kenworth T800 Semi Truck 6x4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.KENWORTH,
    image: KENWORTH_T800_IMG,
    parts: [{"type":"BRAKES","position":{"x":29,"y":74}},{"type":"SUSPENSION","position":{"x":39,"y":63}},
    {"type":"WHEELS","position":{"x":41,"y":74}},{"type":"BODY","position":{"x":35,"y":55}},
    {"type":"FRAME","position":{"x":32,"y":69}},{"type":"INTERIOR","position":{"x":43,"y":42}},
    {"type":"BATTERY","position":{"x":23,"y":64}},{"type":"LIGHTS","position":{"x":30,"y":64}},
    {"type":"FIFTH_WHEEL","position":{"x":75,"y":59}},{"type":"COMPRESSOR","position":{"x":4,"y":70}},
    {"type":"ENGINE","position":{"x":25,"y":56}},{"type":"EXHAUST","position":{"x":59,"y":37}},
    {"type":"FUEL","position":{"x":56,"y":67}},{"type":"GEARBOX","position":{"x":20,"y":72}}]
  },
  [EEquipmentModel.KENWORTH_W990]: {
    name: 'Kenworth W990 Semi Truck 6x4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.KENWORTH,
    image: KENWORTH_W990_IMG,
    parts: [{"type":"BRAKES","position":{"x":40,"y":80}},{"type":"SUSPENSION","position":{"x":45,"y":66}},
    {"type":"WHEELS","position":{"x":47,"y":78}},{"type":"BODY","position":{"x":72,"y":61}},
    {"type":"FRAME","position":{"x":61,"y":75}},{"type":"INTERIOR","position":{"x":53,"y":42}},
    {"type":"BATTERY","position":{"x":38,"y":70}},{"type":"ELECTRONIC","position":{"x":42,"y":56}},
    {"type":"LIGHTS","position":{"x":34,"y":65}},{"type":"FIFTH_WHEEL","position":{"x":81,"y":63}},
    {"type":"COMPRESSOR","position":{"x":6,"y":71}},{"type":"EXHAUST","position":{"x":64,"y":43}},
    {"type":"ENGINE","position":{"x":22,"y":62}},{"type":"FUEL","position":{"x":75,"y":70}},
    {"type":"GEARBOX","position":{"x":28,"y":77}}]
  },
  [EEquipmentModel.KENWORTH_W900]: {
    name: 'Kenworth W900 Semi Truck 6x4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.KENWORTH,
    image: KENWORTH_W900_IMG,
    parts: [{"type":"BRAKES","position":{"x":61,"y":72}},{"type":"SUSPENSION","position":{"x":58,"y":61}},
    {"type":"WHEELS","position":{"x":56,"y":71}},{"type":"BODY","position":{"x":27,"y":58}},
    {"type":"FRAME","position":{"x":29,"y":62}},{"type":"INTERIOR","position":{"x":41,"y":45}},
    {"type":"BATTERY","position":{"x":88,"y":64}},{"type":"ELECTRONIC","position":{"x":81,"y":55}},
    {"type":"LIGHTS","position":{"x":94,"y":60}},{"type":"FIFTH_WHEEL","position":{"x":20,"y":59}},
    {"type":"COMPRESSOR","position":{"x":69,"y":75}},{"type":"ENGINE","position":{"x":76,"y":60}},
    {"type":"EXHAUST","position":{"x":36,"y":53}},{"type":"FUEL","position":{"x":33,"y":68}},
    {"type":"GEARBOX","position":{"x":80,"y":75}}]
  },
  [EEquipmentModel.KENWORTH_W990_3]: {
    name: 'Kenworth W900 Semi Truck 8x4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T8x4_big,
    brand: EBrand.KENWORTH,
    image: KENWORTH_W990_3_IMG,
    parts: [{"type":"BRAKES","position":{"x":32,"y":70}},{"type":"SUSPENSION","position":{"x":40,"y":59}},
    {"type":"WHEELS","position":{"x":45,"y":70}},{"type":"BODY","position":{"x":56,"y":54}},
    {"type":"FRAME","position":{"x":52,"y":65}},{"type":"INTERIOR","position":{"x":42,"y":40}},
    {"type":"LIGHTS","position":{"x":31,"y":60}},{"type":"ELECTRONIC","position":{"x":38,"y":51}},
    {"type":"BATTERY","position":{"x":36,"y":65}},{"type":"FIFTH_WHEEL","position":{"x":75,"y":58}},
    {"type":"COMPRESSOR","position":{"x":8,"y":67}},{"type":"ENGINE","position":{"x":19,"y":57}},
    {"type":"EXHAUST","position":{"x":62,"y":50}},{"type":"FUEL","position":{"x":66,"y":63}},
    {"type":"GEARBOX","position":{"x":22,"y":70}}]
  },
  [EEquipmentModel.KOGEL_BOX]: {
    name: 'Kögel Box Reefer 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.KOGEL,
    image: KOGEL_BOX_IMG,
    parts: [{"type":"BRAKES","position":{"x":58,"y":76}},{"type":"WHEELS","position":{"x":45,"y":76}},
    {"type":"SUSPENSION","position":{"x":54,"y":68}},{"type":"BODY","position":{"x":45,"y":56}},
    {"type":"FRAME","position":{"x":20,"y":67}},{"type":"SUPPORT","position":{"x":15,"y":75}},
    {"type":"LIGHTS","position":{"x":77,"y":76}},{"type":"LOAD","position":{"x":64,"y":62}},
    {"type":"DOORS","position":{"x":82,"y":51}},{"type":"TRAILER_ATTACHMENT","position":{"x":11,"y":64}}]
  },
  [EEquipmentModel.KOGEL_FLATBED]: {
    name: 'Kögel Flatbed 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.KOGEL,
    image: KOGEL_FLATBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":33,"y":64}},{"type":"SUSPENSION","position":{"x":37,"y":60}},
    {"type":"WHEELS","position":{"x":46,"y":64}},{"type":"FRAME","position":{"x":71,"y":57}},
    {"type":"SUPPORT","position":{"x":83,"y":63}},{"type":"BODY","position":{"x":48,"y":49}},
    {"type":"LIGHTS","position":{"x":18,"y":62}},{"type":"LOAD","position":{"x":44,"y":53}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":88,"y":55}}]
  },
  [EEquipmentModel.KOGEL_TIPPER]: {
    name: 'Kögel Tipper 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.KOGEL,
    image: KOGEL_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":29,"y":71}},{"type":"WHEELS","position":{"x":20,"y":70}},
    {"type":"SUSPENSION","position":{"x":29,"y":63}},{"type":"BODY","position":{"x":39,"y":48}},
    {"type":"FRAME","position":{"x":44,"y":58}},{"type":"SUPPORT","position":{"x":52,"y":73}},
    {"type":"LIGHTS","position":{"x":6,"y":63}},{"type":"TRAILER_ATTACHMENT","position":{"x":76,"y":58}},
    {"type":"HYDRAULIC","position":{"x":70,"y":44}},{"type":"DOORS","position":{"x":9,"y":51}}]
  },
  [EEquipmentModel.KOGEL_TRAILER]: {
    name: 'Kögel 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.KOGEL,
    image: KOGEL_TRAILER_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":71}},{"type":"SUSPENSION","position":{"x":51,"y":64}},
    {"type":"WHEELS","position":{"x":42,"y":69}},{"type":"BODY","position":{"x":28,"y":46}},
    {"type":"FRAME","position":{"x":29,"y":66}},{"type":"SUPPORT","position":{"x":15,"y":67}},
    {"type":"LIGHTS","position":{"x":75,"y":70}},{"type":"LOAD","position":{"x":42,"y":58}},
    {"type":"DOORS","position":{"x":82,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":5,"y":64}}]
  },
  [EEquipmentModel.KRONE_BOX_LINER]: {
    name: 'Krone Container Box Liner 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.KRONE,
    image: KRONE_BOX_LINER_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":65}},{"type":"SUSPENSION","position":{"x":51,"y":60}},
    {"type":"WHEELS","position":{"x":46,"y":66}},{"type":"FRAME","position":{"x":35,"y":58}},
    {"type":"SUPPORT","position":{"x":23,"y":61}},{"type":"LIGHTS","position":{"x":78,"y":67}},
    {"type":"LOAD","position":{"x":41,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":52}}]
  },
  [EEquipmentModel.KRONE_COOL_LINER]: {
    name: 'Krone Reefer Cool Liner 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.KRONE,
    image: KRONE_COOL_LINER_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":71}},{"type":"SUSPENSION","position":{"x":45,"y":66}},
    {"type":"WHEELS","position":{"x":51,"y":72}},{"type":"BODY","position":{"x":63,"y":49}},
    {"type":"FRAME","position":{"x":59,"y":62}},{"type":"FRAME","position":{"x":84,"y":66}},
    {"type":"LIGHTS","position":{"x":30,"y":70}},{"type":"DOORS","position":{"x":15,"y":48}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":87,"y":59}},{"type":"LOAD","position":{"x":48,"y":59}},
    {"type":"FRIGO","position":{"x":96,"y":39}}]
  },
  [EEquipmentModel.KRONE_MEGA_LINER]: {
    name: 'Krone Box Mega Liner 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.KRONE,
    image: KRONE_MEGA_LINER_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":70}},{"type":"SUSPENSION","position":{"x":43,"y":68}},
    {"type":"WHEELS","position":{"x":54,"y":70}},{"type":"BODY","position":{"x":58,"y":50}},
    {"type":"FRAME","position":{"x":63,"y":63}},{"type":"SUPPORT","position":{"x":84,"y":61}},
    {"type":"LIGHTS","position":{"x":24,"y":71}},{"type":"DOORS","position":{"x":14,"y":61}},
    {"type":"LOAD","position":{"x":51,"y":57}},{"type":"TRAILER_ATTACHMENT","position":{"x":92,"y":56}}]
  },
  [EEquipmentModel.LAMBERET_DAF_CF_PORTEUR]: {
    name: 'Lamberet DAF CF Porteur Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].FRIGO_T6x2,
    brand: EBrand.LAMBERET,
    image: LAMBERET_DAF_CF_PORTEUR_IMG,
    parts: [{"type":"BRAKES","position":{"x":61,"y":76}},{"type":"SUSPENSION","position":{"x":50,"y":63}},
    {"type":"WHEELS","position":{"x":48,"y":74}},{"type":"BODY","position":{"x":51,"y":48}},
    {"type":"FRAME","position":{"x":40,"y":73}},{"type":"INTERIOR","position":{"x":65,"y":38}},
    {"type":"BATTERY","position":{"x":65,"y":60}},{"type":"ELECTRONIC","position":{"x":59,"y":52}},
    {"type":"LIGHTS","position":{"x":66,"y":67}},{"type":"DOORS","position":{"x":15,"y":53}},
    {"type":"FRIGO","position":{"x":59,"y":23}},{"type":"LOAD","position":{"x":24,"y":57}},
    {"type":"COMPRESSOR","position":{"x":70,"y":70}},{"type":"ENGINE","position":{"x":77,"y":67}},
    {"type":"EXHAUST","position":{"x":28,"y":67}},{"type":"FUEL","position":{"x":36,"y":65}},
    {"type":"GEARBOX","position":{"x":77,"y":72}}]
  },
  [EEquipmentModel.LAMBERET_FRIGOLINE_CITY]: {
    name: 'Lamberet Frigoline City Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].FRIGO_T4x2,
    brand: EBrand.LAMBERET,
    image: LAMBERET_FRIGOLINE_CITY_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":76}},{"type":"WHEELS","position":{"x":63,"y":75}},
    {"type":"SUSPENSION","position":{"x":53,"y":67}},{"type":"BODY","position":{"x":66,"y":55}},
    {"type":"FRAME","position":{"x":74,"y":69}},{"type":"INTERIOR","position":{"x":90,"y":49}},
    {"type":"BATTERY","position":{"x":79,"y":59}},{"type":"ELECTRONIC","position":{"x":76,"y":46}},
    {"type":"LIGHTS","position":{"x":92,"y":61}},{"type":"DOORS","position":{"x":34,"y":54}},
    {"type":"FRIGO","position":{"x":85,"y":39}},{"type":"LOAD","position":{"x":49,"y":56}},
    {"type":"GEARBOX","position":{"x":82,"y":70}},{"type":"FUEL","position":{"x":75,"y":64}},
    {"type":"EXHAUST","position":{"x":69,"y":73}},{"type":"ENGINE","position":{"x":82,"y":62}},
    {"type":"COMPRESSOR","position":{"x":89,"y":67}}]
  },
  [EEquipmentModel.LAMBERET_RENAULT_DCab_Frigoline_City]: {
    name: 'Lamberet Renault Day Cab Frigoline City Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].FRIGO_T4x2,
    brand: EBrand.LAMBERET,
    image: LAMBERET_RENAULT_DCab_Frigoline_City_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":77}},{"type":"WHEELS","position":{"x":43,"y":78}},
    {"type":"SUSPENSION","position":{"x":43,"y":67}},{"type":"BODY","position":{"x":52,"y":62}},
    {"type":"FRAME","position":{"x":57,"y":80}},{"type":"INTERIOR","position":{"x":60,"y":46}},
    {"type":"BATTERY","position":{"x":63,"y":59}},{"type":"ELECTRONIC","position":{"x":69,"y":53}},
    {"type":"LIGHTS","position":{"x":69,"y":75}},{"type":"DOORS","position":{"x":10,"y":43}},
    {"type":"FRIGO","position":{"x":62,"y":19}},{"type":"LOAD","position":{"x":25,"y":55}},
    {"type":"GEARBOX","position":{"x":74,"y":82}},{"type":"FUEL","position":{"x":34,"y":72}},
    {"type":"EXHAUST","position":{"x":27,"y":73}},{"type":"ENGINE","position":{"x":83,"y":65}},
    {"type":"COMPRESSOR","position":{"x":70,"y":64}}]
  },
  [EEquipmentModel.LAMBERET_SR2_green_liner]: {
    name: 'Lamberet SR2 Green Liner Reefer 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.LAMBERET,
    image: LAMBERET_SR2_green_liner_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":75}},{"type":"SUSPENSION","position":{"x":49,"y":67}},
    {"type":"WHEELS","position":{"x":57,"y":72}},{"type":"BODY","position":{"x":65,"y":48}},
    {"type":"FRAME","position":{"x":74,"y":62}},{"type":"SUPPORT","position":{"x":82,"y":73}},
    {"type":"LIGHTS","position":{"x":35,"y":69}},{"type":"DOORS","position":{"x":22,"y":52}},
    {"type":"FRIGO","position":{"x":94,"y":55}},{"type":"LOAD","position":{"x":59,"y":59}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":87,"y":62}}]
  },
  [EEquipmentModel.LAMBERET_SR2_HD]: {
    name: 'Lamberet SR2 HD Reefer 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.LAMBERET,
    image: LAMBERET_SR2_HD_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":74}},{"type":"SUSPENSION","position":{"x":53,"y":65}},
    {"type":"WHEELS","position":{"x":55,"y":78}},{"type":"BODY","position":{"x":68,"y":42}},
    {"type":"FRAME","position":{"x":67,"y":64}},{"type":"SUPPORT","position":{"x":78,"y":77}},
    {"type":"LIGHTS","position":{"x":36,"y":72}},{"type":"DOORS","position":{"x":24,"y":50}},
    {"type":"FRIGO","position":{"x":93,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":88,"y":62}},
    {"type":"LOAD","position":{"x":18,"y":47}}]
  },
  [EEquipmentModel.LAMBERET_SR2_super_duplex]: {
    name: 'Lamberet SR2 Super Duplex Reefer 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.LAMBERET,
    image: LAMBERET_SR2_super_duplex_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":74}},{"type":"SUSPENSION","position":{"x":47,"y":67}},
    {"type":"WHEELS","position":{"x":59,"y":67}},{"type":"BODY","position":{"x":74,"y":45}},
    {"type":"FRAME","position":{"x":72,"y":60}},{"type":"SUPPORT","position":{"x":83,"y":69}},
    {"type":"LIGHTS","position":{"x":28,"y":70}},{"type":"DOORS","position":{"x":19,"y":54}},
    {"type":"FRIGO","position":{"x":90,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":92,"y":57}},
    {"type":"LOAD","position":{"x":55,"y":52}}]
  },
  [EEquipmentModel.LANDOLL_LOWBED]: {
    name: 'Landoll Lowbed 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.LANDOLL,
    image: LANDOLL_LOWBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":83,"y":51}},{"type":"SUSPENSION","position":{"x":86,"y":49}},
    {"type":"WHEELS","position":{"x":86,"y":53}},{"type":"FRAME","position":{"x":47,"y":55}},
    {"type":"SUPPORT","position":{"x":33,"y":56}},{"type":"LIGHTS","position":{"x":96,"y":51}},
    {"type":"LOAD","position":{"x":58,"y":53}},{"type":"TRAILER_ATTACHMENT","position":{"x":11,"y":47}}]
  },
  [EEquipmentModel.LAWRENCE_DAVID_BOX_TRAILER]: {
    name: 'Lawrence David Curtain Box 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.LAWRENCE_DAVID,
    image: LAWRENCE_DAVID_BOX_TRAILER_IMG,
    parts: [{"type":"BRAKES","position":{"x":59,"y":61}},{"type":"SUSPENSION","position":{"x":64,"y":60}},
    {"type":"WHEELS","position":{"x":61,"y":64}},{"type":"BODY","position":{"x":33,"y":46}},
    {"type":"FRAME","position":{"x":32,"y":59}},{"type":"SUPPORT","position":{"x":31,"y":66}},
    {"type":"LIGHTS","position":{"x":95,"y":59}},{"type":"DOORS","position":{"x":98,"y":45}},
    {"type":"LOAD","position":{"x":49,"y":55}},{"type":"TRAILER_ATTACHMENT","position":{"x":6,"y":58}}]
  },
  [EEquipmentModel.LAWRENCE_DAVID_CURTAIN_TANDEM]: {
    name: 'Lawrence David Curtain Box Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.LAWRENCE_DAVID,
    image: LAWRENCE_DAVID_CURTAIN_TANDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":61,"y":62}},{"type":"SUSPENSION","position":{"x":70,"y":60}},
    {"type":"WHEELS","position":{"x":69,"y":67}},{"type":"BODY","position":{"x":43,"y":50}},
    {"type":"FRAME","position":{"x":42,"y":61}},{"type":"INTERIOR","position":{"x":13,"y":50}},
    {"type":"BATTERY","position":{"x":15,"y":56}},{"type":"ELECTRONIC","position":{"x":7,"y":52}},
    {"type":"LIGHTS","position":{"x":2,"y":59}},{"type":"LOAD","position":{"x":58,"y":54}},
    {"type":"RAMP","position":{"x":98,"y":47}},{"type":"COMPRESSOR","position":{"x":1,"y":52}},
    {"type":"ENGINE","position":{"x":8,"y":58}},{"type":"EXHAUST","position":{"x":21,"y":63}},
    {"type":"FUEL","position":{"x":31,"y":61}},{"type":"GEARBOX","position":{"x":6,"y":64}}]
  },
  [EEquipmentModel.LAWRENCE_DAVID_CURTAIN_TANDEM_2]: {
    name: 'Lawrence David Curtain Box Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.LAWRENCE_DAVID,
    image: LAWRENCE_DAVID_CURTAIN_TANDEM_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":69,"y":60}},{"type":"SUSPENSION","position":{"x":75,"y":59}},
    {"type":"WHEELS","position":{"x":72,"y":63}},{"type":"BODY","position":{"x":38,"y":51}},
    {"type":"FRAME","position":{"x":27,"y":59}},{"type":"INTERIOR","position":{"x":12,"y":46}},
    {"type":"BATTERY","position":{"x":21,"y":54}},{"type":"ELECTRONIC","position":{"x":15,"y":50}},
    {"type":"LIGHTS","position":{"x":5,"y":58}},{"type":"DOORS","position":{"x":94,"y":48}},
    {"type":"LOAD","position":{"x":56,"y":54}},{"type":"COMPRESSOR","position":{"x":5,"y":52}},
    {"type":"ENGINE","position":{"x":10,"y":55}},{"type":"EXHAUST","position":{"x":21,"y":61}},
    {"type":"FUEL","position":{"x":32,"y":59}},{"type":"GEARBOX","position":{"x":9,"y":62}}]
  },
  [EEquipmentModel.LAWRENCE_DAVID_CURTAIN_TRAILER]: {
    name: 'Lawrence David Curtain Box 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.LAWRENCE_DAVID,
    image: LAWRENCE_DAVID_CURTAIN_TRAILER_IMG,
    parts: [{"type":"BRAKES","position":{"x":62,"y":63}},{"type":"SUSPENSION","position":{"x":57,"y":59}},
    {"type":"WHEELS","position":{"x":56,"y":65}},{"type":"BODY","position":{"x":34,"y":48}},
    {"type":"FRAME","position":{"x":37,"y":60}},{"type":"SUPPORT","position":{"x":28,"y":65}},
    {"type":"LIGHTS","position":{"x":96,"y":59}},{"type":"LOAD","position":{"x":50,"y":54}},
    {"type":"RAMP","position":{"x":89,"y":60}},{"type":"TRAILER_ATTACHMENT","position":{"x":15,"y":56}},
    {"type":"DOORS","position":{"x":96,"y":49}}]
  },
  [EEquipmentModel.LAWRENCE_DAVID_FLATBED_TRAILER]: {
    name: 'Lawrence David Flatbed 3 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.LAWRENCE_DAVID,
    image: LAWRENCE_DAVID_FLATBED_TRAILER_IMG,
    parts: [{"type":"BRAKES","position":{"x":64,"y":61}},{"type":"WHEELS","position":{"x":60,"y":64}},
    {"type":"SUSPENSION","position":{"x":54,"y":59}},{"type":"FRAME","position":{"x":40,"y":59}},
    {"type":"SUPPORT","position":{"x":28,"y":63}},{"type":"LIGHTS","position":{"x":94,"y":60}},
    {"type":"LOAD","position":{"x":44,"y":56}},{"type":"TRAILER_ATTACHMENT","position":{"x":12,"y":58}}]
  },
  [EEquipmentModel.LAWRENCE_DAVID_RIGID_BOX_VAN]: {
    name: 'Lawrence David Rigid / Curtain Box Van',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2_BOX,
    brand: EBrand.LAWRENCE_DAVID,
    image: LAWRENCE_DAVID_RIGID_BOX_VAN_IMG,
    parts: [{"type":"BRAKES","position":{"x":77,"y":66}},{"type":"SUSPENSION","position":{"x":66,"y":66}},
    {"type":"WHEELS","position":{"x":74,"y":73}},{"type":"BODY","position":{"x":45,"y":53}},
    {"type":"FRAME","position":{"x":41,"y":67}},{"type":"INTERIOR","position":{"x":26,"y":44}},
    {"type":"LIGHTS","position":{"x":2,"y":60}},{"type":"ELECTRONIC","position":{"x":11,"y":53}},
    {"type":"BATTERY","position":{"x":9,"y":60}},{"type":"DOORS","position":{"x":96,"y":52}},
    {"type":"LOAD","position":{"x":62,"y":55}},{"type":"ENGINE","position":{"x":16,"y":60}},
    {"type":"EXHAUST","position":{"x":33,"y":68}},{"type":"FUEL","position":{"x":34,"y":56}},
    {"type":"GEARBOX","position":{"x":14,"y":69}}]
  },
  [EEquipmentModel.MAC_TRAILER_TANK]: {
    name: 'Mac Trailer Tank 2 axle Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.MAC_TRAILER,
    image: MAC_TRAILER_TANK_IMG,
    parts: [{"type":"BRAKES","position":{"x":12,"y":63}},{"type":"SUSPENSION","position":{"x":6,"y":58}},
    {"type":"WHEELS","position":{"x":5,"y":65}},{"type":"BODY","position":{"x":41,"y":45}},
    {"type":"FRAME","position":{"x":40,"y":56}},{"type":"SUPPORT","position":{"x":60,"y":67}},
    {"type":"LIGHTS","position":{"x":1,"y":58}},{"type":"DOORS","position":{"x":40,"y":35}},
    {"type":"LOAD","position":{"x":34,"y":51}},{"type":"TRAILER_ATTACHMENT","position":{"x":75,"y":55}}]
  },
  [EEquipmentModel.MACK_ANTHEM_48_SLEEPER]: {
    name: 'Mack Anthem 48" Sleeper Cab 6x2 Semi Truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.MACK,
    image: MACK_ANTHEM_48_SLEEPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":57,"y":79}},{"type":"WHEELS","position":{"x":49,"y":81}},
          {"type":"SUSPENSION","position":{"x":50,"y":66}},{"type":"BODY","position":{"x":32,"y":60}},
          {"type":"FRAME","position":{"x":36,"y":70}},{"type":"INTERIOR","position":{"x":42,"y":46}},
          {"type":"LIGHTS","position":{"x":65,"y":66}},{"type":"BATTERY","position":{"x":45,"y":62}},
          {"type":"ELECTRONIC","position":{"x":49,"y":56}},{"type":"FIFTH_WHEEL","position":{"x":22,"y":66}},
          {"type":"COMPRESSOR","position":{"x":63,"y":74}},{"type":"ENGINE","position":{"x":85,"y":66}},
          {"type":"EXHAUST","position":{"x":31,"y":34}},{"type":"FUEL","position":{"x":30,"y":74}},
          {"type":"GEARBOX","position":{"x":81,"y":82}}]
  },
  [EEquipmentModel.MACK_ANTHEM_70_SLEEPER]: {
    name: 'Mack Anthem 70" Sleeper Cab 6x2 Semi Truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.MACK,
    image: MACK_ANTHEM_70_SLEEPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":81}},{"type":"SUSPENSION","position":{"x":49,"y":67}},
    {"type":"WHEELS","position":{"x":50,"y":76}},{"type":"BODY","position":{"x":26,"y":60}},
    {"type":"INTERIOR","position":{"x":41,"y":43}},{"type":"FRAME","position":{"x":27,"y":68}},
    {"type":"BATTERY","position":{"x":46,"y":61}},{"type":"ELECTRONIC","position":{"x":50,"y":53}},
    {"type":"LIGHTS","position":{"x":64,"y":63}},{"type":"FIFTH_WHEEL","position":{"x":22,"y":68}},
    {"type":"COMPRESSOR","position":{"x":62,"y":78}},{"type":"ENGINE","position":{"x":86,"y":62}},
    {"type":"EXHAUST","position":{"x":26,"y":29}},{"type":"FUEL","position":{"x":27,"y":75}},
    {"type":"GEARBOX","position":{"x":80,"y":82}}]
  },
  [EEquipmentModel.MACK_ANTHEM_DAYCAB]: {
    name: 'Mack Anthem Day Cab 6x2 Semi Truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.MACK,
    image: MACK_ANTHEM_DAYCAB_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":78}},{"type":"SUSPENSION","position":{"x":46,"y":67}},
    {"type":"WHEELS","position":{"x":44,"y":83}},{"type":"BODY","position":{"x":38,"y":61}},
    {"type":"INTERIOR","position":{"x":40,"y":45}},{"type":"FRAME","position":{"x":37,"y":67}},
    {"type":"LIGHTS","position":{"x":65,"y":65}},{"type":"BATTERY","position":{"x":45,"y":63}},
    {"type":"ELECTRONIC","position":{"x":50,"y":54}},{"type":"FIFTH_WHEEL","position":{"x":26,"y":67}},
    {"type":"COMPRESSOR","position":{"x":63,"y":75}},{"type":"ENGINE","position":{"x":84,"y":65}},
    {"type":"EXHAUST","position":{"x":31,"y":51}},{"type":"FUEL","position":{"x":26,"y":74}},
    {"type":"GEARBOX","position":{"x":80,"y":83}}]
  },
  [EEquipmentModel.MACK_GRANITE_SEMI_6x4]: {
    name: 'Mack Granite 6x2 Semi Truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.MACK,
    image: MACK_GRANITE_SEMI_6x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":65,"y":67}},{"type":"SUSPENSION","position":{"x":61,"y":57}},
    {"type":"WHEELS","position":{"x":59,"y":67}},{"type":"BODY","position":{"x":45,"y":54}},
    {"type":"FRAME","position":{"x":43,"y":60}},{"type":"INTERIOR","position":{"x":47,"y":43}},
    {"type":"BATTERY","position":{"x":50,"y":53}},{"type":"ELECTRONIC","position":{"x":56,"y":46}},
    {"type":"LIGHTS","position":{"x":70,"y":57}},{"type":"FIFTH_WHEEL","position":{"x":27,"y":58}},
    {"type":"COMPRESSOR","position":{"x":70,"y":63}},{"type":"ENGINE","position":{"x":80,"y":56}},
    {"type":"EXHAUST","position":{"x":38,"y":56}},{"type":"FUEL","position":{"x":49,"y":67}},
    {"type":"GEARBOX","position":{"x":77,"y":67}}]
  },
  [EEquipmentModel.MACK_GRANITE_TIPPER_6x4]: {
    name: 'Mack Granite 6x2 Tipper Truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T6x2_big,
    brand: EBrand.MACK,
    image: MACK_GRANITE_TIPPER_6x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":67,"y":71}},{"type":"SUSPENSION","position":{"x":62,"y":60}},
    {"type":"WHEELS","position":{"x":59,"y":70}},{"type":"BODY","position":{"x":45,"y":56}},
    {"type":"INTERIOR","position":{"x":51,"y":44}},{"type":"FRAME","position":{"x":47,"y":67}},
    {"type":"BATTERY","position":{"x":54,"y":57}},{"type":"ELECTRONIC","position":{"x":57,"y":50}},
    {"type":"LIGHTS","position":{"x":70,"y":58}},{"type":"LOAD","position":{"x":19,"y":57}},
    {"type":"DOORS","position":{"x":8,"y":50}},{"type":"HYDRAULIC","position":{"x":38,"y":55}},
    {"type":"COMPRESSOR","position":{"x":75,"y":63}},{"type":"ENGINE","position":{"x":82,"y":58}},
    {"type":"EXHAUST","position":{"x":43,"y":47}},{"type":"FUEL","position":{"x":72,"y":67}},
    {"type":"GEARBOX","position":{"x":80,"y":70}}]
  },
  [EEquipmentModel.MAN_TGE_CAB_TIPPER]: {
    name: 'MAN TGE Crewcab Tipper',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1_CREW_TIPPER,
    brand: EBrand.MAN,
    image: MAN_TGE_CAB_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":69}},{"type":"SUSPENSION","position":{"x":51,"y":58}},
    {"type":"WHEELS","position":{"x":56,"y":68}},{"type":"BODY","position":{"x":65,"y":54}},
    {"type":"FRAME","position":{"x":64,"y":67}},{"type":"INTERIOR","position":{"x":56,"y":36}},
    {"type":"BATTERY","position":{"x":44,"y":47}},{"type":"ELECTRONIC","position":{"x":36,"y":47}},
    {"type":"LIGHTS","position":{"x":43,"y":54}},{"type":"LOAD","position":{"x":84,"y":46}},
    {"type":"ENGINE","position":{"x":24,"y":53}},{"type":"EXHAUST","position":{"x":68,"y":68}},
    {"type":"FUEL","position":{"x":75,"y":54}},{"type":"GEARBOX","position":{"x":25,"y":65}}]
  },
  [EEquipmentModel.MAN_TGE_L2H2]: {
    name: 'MAN TGE L2H2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2H2,
    brand: EBrand.MAN,
    image: MAN_TGE_L2H2_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":69}},{"type":"SUSPENSION","position":{"x":53,"y":55}},
    {"type":"WHEELS","position":{"x":58,"y":66}},{"type":"BODY","position":{"x":64,"y":50}},
    {"type":"FRAME","position":{"x":66,"y":68}},{"type":"INTERIOR","position":{"x":46,"y":37}},
    {"type":"BATTERY","position":{"x":42,"y":45}},{"type":"ELECTRONIC","position":{"x":48,"y":45}},
    {"type":"LIGHTS","position":{"x":43,"y":53}},{"type":"DOORS","position":{"x":73,"y":46}},
    {"type":"LOAD","position":{"x":76,"y":59}},{"type":"ENGINE","position":{"x":25,"y":48}},
    {"type":"EXHAUST","position":{"x":61,"y":70}},{"type":"FUEL","position":{"x":70,"y":53}},
    {"type":"GEARBOX","position":{"x":23,"y":68}}]
  },
  [EEquipmentModel.MAN_TGE_TIPPER]: {
    name: 'MAN TGE Tipper',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1_TIPPER,
    brand: EBrand.MAN,
    image: MAN_TGE_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":68}},{"type":"SUSPENSION","position":{"x":54,"y":56}},
    {"type":"WHEELS","position":{"x":58,"y":66}},{"type":"BODY","position":{"x":59,"y":48}},
    {"type":"FRAME","position":{"x":61,"y":69}},{"type":"INTERIOR","position":{"x":47,"y":35}},
    {"type":"BATTERY","position":{"x":40,"y":45}},{"type":"ELECTRONIC","position":{"x":46,"y":43}},
    {"type":"LIGHTS","position":{"x":44,"y":52}},{"type":"LOAD","position":{"x":75,"y":49}},
    {"type":"ENGINE","position":{"x":26,"y":48}},{"type":"EXHAUST","position":{"x":68,"y":66}},
    {"type":"FUEL","position":{"x":69,"y":53}},{"type":"GEARBOX","position":{"x":25,"y":63}}]
  },
  [EEquipmentModel.MAN_TGL_TANDEM_4x2]: {
    name: 'MAN TGL Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.MAN,
    image: MAN_TGL_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":79}},{"type":"SUSPENSION","position":{"x":43,"y":67}},
    {"type":"WHEELS","position":{"x":41,"y":80}},{"type":"BODY","position":{"x":31,"y":59}},
    {"type":"FRAME","position":{"x":28,"y":70}},{"type":"INTERIOR","position":{"x":47,"y":46}},
    {"type":"BATTERY","position":{"x":83,"y":65}},{"type":"ELECTRONIC","position":{"x":87,"y":59}},
    {"type":"LIGHTS","position":{"x":92,"y":73}},{"type":"DOORS","position":{"x":6,"y":44}},
    {"type":"LOAD","position":{"x":21,"y":55}},{"type":"COMPRESSOR","position":{"x":66,"y":73}},
    {"type":"ENGINE","position":{"x":78,"y":68}},{"type":"EXHAUST","position":{"x":34,"y":76}},
    {"type":"FUEL","position":{"x":19,"y":66}},{"type":"GEARBOX","position":{"x":75,"y":80}}]
  },
  [EEquipmentModel.MAN_TGS_4x2]: {
    name: 'MAN TGS 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MAN,
    image: MAN_TGS_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":78}},{"type":"WHEELS","position":{"x":63,"y":79}},
    {"type":"SUSPENSION","position":{"x":60,"y":65}},{"type":"BODY","position":{"x":48,"y":60}},
    {"type":"FRAME","position":{"x":50,"y":86}},{"type":"INTERIOR","position":{"x":42,"y":41}},
    {"type":"BATTERY","position":{"x":31,"y":57}},{"type":"ELECTRONIC","position":{"x":35,"y":54}},
    {"type":"LIGHTS","position":{"x":40,"y":74}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":61}},
    {"type":"COMPRESSOR","position":{"x":13,"y":71}},{"type":"ENGINE","position":{"x":25,"y":73}},
    {"type":"EXHAUST","position":{"x":74,"y":76}},{"type":"FUEL","position":{"x":75,"y":66}},
    {"type":"GEARBOX","position":{"x":28,"y":82}}]
  },
  [EEquipmentModel.MAN_TGS_4x2_TALL]: {
    name: 'MAN TGS Offroad 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MAN,
    image: MAN_TGS_4x2_TALL_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":79}},{"type":"SUSPENSION","position":{"x":58,"y":67}},
    {"type":"WHEELS","position":{"x":62,"y":77}},{"type":"BODY","position":{"x":42,"y":58}},
    {"type":"FRAME","position":{"x":45,"y":78}},{"type":"INTERIOR","position":{"x":38,"y":36}},
    {"type":"BATTERY","position":{"x":30,"y":57}},{"type":"ELECTRONIC","position":{"x":34,"y":54}},
    {"type":"LIGHTS","position":{"x":37,"y":71}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":63}},
    {"type":"COMPRESSOR","position":{"x":14,"y":69}},{"type":"ENGINE","position":{"x":22,"y":68}},
    {"type":"EXHAUST","position":{"x":69,"y":75}},{"type":"FUEL","position":{"x":75,"y":70}},
    {"type":"GEARBOX","position":{"x":27,"y":77}}]
  },
  [EEquipmentModel.MAN_TGS_TANDEM_4x2]: {
    name: 'MAN TGS Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.MAN,
    image: MAN_TGS_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":40,"y":71}},{"type":"SUSPENSION","position":{"x":44,"y":62}},
    {"type":"WHEELS","position":{"x":46,"y":68}},{"type":"BODY","position":{"x":31,"y":57}},
    {"type":"FRAME","position":{"x":35,"y":74}},{"type":"INTERIOR","position":{"x":21,"y":41}},
    {"type":"BATTERY","position":{"x":22,"y":58}},{"type":"ELECTRONIC","position":{"x":27,"y":56}},
    {"type":"LIGHTS","position":{"x":27,"y":68}},{"type":"LOAD","position":{"x":66,"y":58}},
    {"type":"COMPRESSOR","position":{"x":9,"y":69}},{"type":"ENGINE","position":{"x":19,"y":67}},
    {"type":"EXHAUST","position":{"x":52,"y":72}},{"type":"FUEL","position":{"x":56,"y":64}},
    {"type":"GEARBOX","position":{"x":20,"y":75}}]
  },
  [EEquipmentModel.MAN_TGS_TANDEM_4x2_TALL]: {
    name: 'MAN TGS Tandem Offroad 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.MAN,
    image: MAN_TGS_TANDEM_4x2_TALL_IMG,
    parts: [{"type":"BRAKES","position":{"x":44,"y":77}},{"type":"SUSPENSION","position":{"x":48,"y":67}},
    {"type":"WHEELS","position":{"x":53,"y":73}},{"type":"BODY","position":{"x":46,"y":42}},
    {"type":"INTERIOR","position":{"x":28,"y":39}},{"type":"FRAME","position":{"x":62,"y":73}},
    {"type":"BATTERY","position":{"x":28,"y":56}},{"type":"ELECTRONIC","position":{"x":32,"y":52}},
    {"type":"LIGHTS","position":{"x":33,"y":66}},{"type":"LOAD","position":{"x":69,"y":59}},
    {"type":"COMPRESSOR","position":{"x":11,"y":67}},{"type":"ENGINE","position":{"x":22,"y":64}},
    {"type":"EXHAUST","position":{"x":60,"y":78}},{"type":"FUEL","position":{"x":66,"y":65}},
    {"type":"GEARBOX","position":{"x":25,"y":73}}]
  },
  [EEquipmentModel.MAN_TGS_TANDEM_6x4]: {
    name: 'MAN TGS Tandem 6x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.MAN,
    image: MAN_TGS_TANDEM_6x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":76}},{"type":"SUSPENSION","position":{"x":49,"y":67}},
    {"type":"WHEELS","position":{"x":51,"y":72}},{"type":"BODY","position":{"x":46,"y":55}},
    {"type":"FRAME","position":{"x":60,"y":73}},{"type":"INTERIOR","position":{"x":27,"y":41}},
    {"type":"BATTERY","position":{"x":28,"y":62}},{"type":"ELECTRONIC","position":{"x":30,"y":56}},
    {"type":"LIGHTS","position":{"x":32,"y":70}},{"type":"LOAD","position":{"x":65,"y":60}},
    {"type":"COMPRESSOR","position":{"x":12,"y":72}},{"type":"ENGINE","position":{"x":22,"y":67}},
    {"type":"EXHAUST","position":{"x":56,"y":78}},{"type":"FUEL","position":{"x":62,"y":68}},
    {"type":"GEARBOX","position":{"x":24,"y":77}}]
  },
  [EEquipmentModel.MAN_TGS_TANDEM_6x4_TALL]: {
    name: 'MAN TGS Tandem Offroad 6x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.MAN,
    image: MAN_TGS_TANDEM_6x4_TALL_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":74}},{"type":"SUSPENSION","position":{"x":46,"y":63}},
    {"type":"WHEELS","position":{"x":49,"y":74}},{"type":"BODY","position":{"x":45,"y":48}},
    {"type":"FRAME","position":{"x":56,"y":72}},{"type":"INTERIOR","position":{"x":24,"y":39}},
    {"type":"LIGHTS","position":{"x":30,"y":68}},{"type":"ELECTRONIC","position":{"x":32,"y":51}},
    {"type":"BATTERY","position":{"x":28,"y":54}},{"type":"LOAD","position":{"x":68,"y":58}},
    {"type":"COMPRESSOR","position":{"x":12,"y":66}},{"type":"ENGINE","position":{"x":18,"y":62}},
    {"type":"EXHAUST","position":{"x":60,"y":74}},{"type":"FUEL","position":{"x":62,"y":62}},
    {"type":"GEARBOX","position":{"x":24,"y":71}}]
  },
  [EEquipmentModel.MAN_TGS_TANDEM_8x4]: {
    name: 'MAN TGS Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.MAN,
    image: MAN_TGS_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":75}},{"type":"SUSPENSION","position":{"x":50,"y":64}},
    {"type":"WHEELS","position":{"x":52,"y":75}},{"type":"BODY","position":{"x":44,"y":58}},
    {"type":"FRAME","position":{"x":41,"y":79}},{"type":"INTERIOR","position":{"x":30,"y":45}},
    {"type":"BATTERY","position":{"x":27,"y":58}},{"type":"ELECTRONIC","position":{"x":30,"y":55}},
    {"type":"LIGHTS","position":{"x":30,"y":68}},{"type":"LOAD","position":{"x":72,"y":60}},
    {"type":"COMPRESSOR","position":{"x":6,"y":73}},{"type":"ENGINE","position":{"x":19,"y":70}},
    {"type":"EXHAUST","position":{"x":58,"y":76}},{"type":"FUEL","position":{"x":76,"y":64}},
    {"type":"GEARBOX","position":{"x":23,"y":81}}]
  },
  [EEquipmentModel.MAN_TGX_1_4x2]: {
    name: 'MAN TGX Mk1 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MAN,
    image: MAN_TGX_1_4x2_IMG,
    parts: [{"type":"ENGINE","position":{"x":30,"y":73}},{"type":"EXHAUST","position":{"x":67,"y":78}},
            {"type":"FUEL","position":{"x":70,"y":64}},{"type":"GEARBOX","position":{"x":34,"y":68}},
            {"type":"COMPRESSOR","position":{"x":20,"y":73}},{"type":"FIFTH_WHEEL","position":{"x":71,"y":58}},
            {"type":"LIGHTS","position":{"x":9,"y":68}},{"type":"BATTERY","position":{"x":18,"y":66}},
            {"type":"ELECTRONIC","position":{"x":31,"y":63}},{"type":"INTERIOR","position":{"x":15,"y":43}},
            {"type":"FRAME","position":{"x":13,"y":81}},{"type":"BODY","position":{"x":9,"y":54}},
            {"type":"WHEELS","position":{"x":59,"y":81}},{"type":"SUSPENSION","position":{"x":55,"y":67}},
            {"type":"BRAKES","position":{"x":49,"y":78}}]
  },
  [EEquipmentModel.MAN_TGX_1_6x2]: {
    name: 'MAN TGX Mk1 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.MAN,
    image: MAN_TGX_1_6x2_IMG,
    parts: [{"type":"EXHAUST","position":{"x":67,"y":73}},{"type":"FUEL","position":{"x":61,"y":60}},
    {"type":"GEARBOX","position":{"x":36,"y":66}},{"type":"ENGINE","position":{"x":28,"y":72}},
    {"type":"COMPRESSOR","position":{"x":21,"y":71}},{"type":"FIFTH_WHEEL","position":{"x":70,"y":56}},
    {"type":"LIGHTS","position":{"x":10,"y":68}},{"type":"ELECTRONIC","position":{"x":26,"y":58}},
    {"type":"BATTERY","position":{"x":13,"y":61}},{"type":"INTERIOR","position":{"x":13,"y":38}},
    {"type":"FRAME","position":{"x":10,"y":78}},{"type":"BODY","position":{"x":9,"y":52}},
    {"type":"WHEELS","position":{"x":57,"y":79}},{"type":"SUSPENSION","position":{"x":52,"y":67}},
    {"type":"BRAKES","position":{"x":48,"y":78}}]
  },
  [EEquipmentModel.MAN_TGX_2_4x2]: {
    name: 'MAN TGX Mk2 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MAN,
    image: MAN_TGX_2_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":78}},{"type":"WHEELS","position":{"x":57,"y":81}},
            {"type":"SUSPENSION","position":{"x":54,"y":69}},{"type":"BODY","position":{"x":18,"y":52}},
            {"type":"FRAME","position":{"x":19,"y":81}},{"type":"INTERIOR","position":{"x":28,"y":41}},
            {"type":"BATTERY","position":{"x":16,"y":62}},{"type":"ELECTRONIC","position":{"x":31,"y":58}},
            {"type":"LIGHTS","position":{"x":13,"y":69}},{"type":"FIFTH_WHEEL","position":{"x":70,"y":61}},
            {"type":"COMPRESSOR","position":{"x":24,"y":73}},{"type":"ENGINE","position":{"x":28,"y":75}},
            {"type":"EXHAUST","position":{"x":69,"y":73}},{"type":"FUEL","position":{"x":75,"y":65}},
            {"type":"GEARBOX","position":{"x":37,"y":70}}]
  },
  [EEquipmentModel.MAN_TGX_2_6x2]: {
    name: 'MAN TGX Mk2 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.MAN,
    image: MAN_TGX_2_6x2_IMG,
    parts: [{"type":"COMPRESSOR","position":{"x":16,"y":68}},{"type":"ENGINE","position":{"x":25,"y":74}},
            {"type":"EXHAUST","position":{"x":69,"y":73}},{"type":"GEARBOX","position":{"x":39,"y":69}},
            {"type":"FUEL","position":{"x":35,"y":63}},{"type":"FIFTH_WHEEL","position":{"x":71,"y":58}},
            {"type":"LIGHTS","position":{"x":8,"y":67}},{"type":"ELECTRONIC","position":{"x":28,"y":60}},
            {"type":"BATTERY","position":{"x":11,"y":57}},{"type":"BODY","position":{"x":10,"y":50}},
            {"type":"FRAME","position":{"x":13,"y":78}},{"type":"INTERIOR","position":{"x":22,"y":40}},
            {"type":"SUSPENSION","position":{"x":52,"y":67}},{"type":"WHEELS","position":{"x":57,"y":79}},
            {"type":"BRAKES","position":{"x":48,"y":77}}]
  },
  [EEquipmentModel.MAN_TGX_3_4x2]: {
    name: 'MAN TGX Mk3 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MAN,
    image: MAN_TGX_3_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":81}},{"type":"SUSPENSION","position":{"x":61,"y":70}},
    {"type":"WHEELS","position":{"x":64,"y":78}},{"type":"BODY","position":{"x":57,"y":56}},
    {"type":"FRAME","position":{"x":51,"y":84}},{"type":"INTERIOR","position":{"x":43,"y":37}},
    {"type":"BATTERY","position":{"x":33,"y":61}},{"type":"ELECTRONIC","position":{"x":40,"y":53}},
    {"type":"LIGHTS","position":{"x":41,"y":73}},{"type":"FIFTH_WHEEL","position":{"x":75,"y":63}},
    {"type":"COMPRESSOR","position":{"x":12,"y":76}},{"type":"ENGINE","position":{"x":24,"y":73}},
    {"type":"EXHAUST","position":{"x":73,"y":77}},{"type":"FUEL","position":{"x":76,"y":70}},
    {"type":"GEARBOX","position":{"x":28,"y":85}}]
  },
  [EEquipmentModel.MAN_TGX_3_4x2_TALL]: {
    name: 'MAN TGX Mk3 Offroad 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MAN,
    image: MAN_TGX_3_4x2_TALL_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":87}},{"type":"SUSPENSION","position":{"x":61,"y":72}},
    {"type":"WHEELS","position":{"x":63,"y":85}},{"type":"BODY","position":{"x":47,"y":56}},
    {"type":"FRAME","position":{"x":42,"y":87}},{"type":"INTERIOR","position":{"x":27,"y":38}},
    {"type":"BATTERY","position":{"x":34,"y":65}},{"type":"ELECTRONIC","position":{"x":39,"y":59}},
    {"type":"LIGHTS","position":{"x":46,"y":78}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":67}},
    {"type":"COMPRESSOR","position":{"x":12,"y":76}},{"type":"ENGINE","position":{"x":25,"y":74}},
    {"type":"EXHAUST","position":{"x":71,"y":85}},{"type":"FUEL","position":{"x":78,"y":77}},
    {"type":"GEARBOX","position":{"x":28,"y":85}}]
  },
  [EEquipmentModel.MAN_TGX_TANDEM_4x2]: {
    name: 'MAN TGX Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.MAN,
    image: MAN_TGX_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":39,"y":74}},{"type":"SUSPENSION","position":{"x":40,"y":65}},
    {"type":"WHEELS","position":{"x":44,"y":74}},{"type":"BODY","position":{"x":48,"y":56}},
    {"type":"FRAME","position":{"x":55,"y":72}},{"type":"INTERIOR","position":{"x":20,"y":48}},
    {"type":"BATTERY","position":{"x":23,"y":58}},{"type":"ELECTRONIC","position":{"x":26,"y":55}},
    {"type":"LIGHTS","position":{"x":28,"y":68}},{"type":"LOAD","position":{"x":67,"y":63}},
    {"type":"COMPRESSOR","position":{"x":11,"y":68}},{"type":"ENGINE","position":{"x":17,"y":68}},
    {"type":"EXHAUST","position":{"x":51,"y":75}},{"type":"FUEL","position":{"x":56,"y":65}},
    {"type":"GEARBOX","position":{"x":22,"y":75}}]
  },
  [EEquipmentModel.MAN_TGX_TANDEM_6x4]: {
    name: 'MAN TGX Tandem 6x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.MAN,
    image: MAN_TGX_TANDEM_6x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":74}},{"type":"SUSPENSION","position":{"x":51,"y":64}},
    {"type":"WHEELS","position":{"x":56,"y":72}},{"type":"BODY","position":{"x":51,"y":47}},
    {"type":"FRAME","position":{"x":64,"y":74}},{"type":"INTERIOR","position":{"x":31,"y":41}},
    {"type":"LIGHTS","position":{"x":33,"y":71}},{"type":"ELECTRONIC","position":{"x":32,"y":56}},
    {"type":"BATTERY","position":{"x":26,"y":59}},{"type":"LOAD","position":{"x":71,"y":63}},
    {"type":"COMPRESSOR","position":{"x":11,"y":69}},{"type":"ENGINE","position":{"x":23,"y":68}},
    {"type":"EXHAUST","position":{"x":58,"y":75}},{"type":"FUEL","position":{"x":63,"y":66}},
    {"type":"GEARBOX","position":{"x":26,"y":80}}]
  },
  [EEquipmentModel.MAN_TGX_TANDEM_6x4_TALL]: {
    name: 'MAN TGX Tandem Offroad 6x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.MAN,
    image: MAN_TGX_TANDEM_6x4_TALL_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":81}},{"type":"SUSPENSION","position":{"x":53,"y":68}},
    {"type":"WHEELS","position":{"x":60,"y":79}},{"type":"BODY","position":{"x":54,"y":54}},
    {"type":"FRAME","position":{"x":67,"y":76}},{"type":"INTERIOR","position":{"x":29,"y":36}},
    {"type":"BATTERY","position":{"x":28,"y":59}},{"type":"ELECTRONIC","position":{"x":32,"y":56}},
    {"type":"LIGHTS","position":{"x":39,"y":72}},{"type":"LOAD","position":{"x":70,"y":63}},
    {"type":"COMPRESSOR","position":{"x":12,"y":68}},{"type":"ENGINE","position":{"x":25,"y":68}},
    {"type":"EXHAUST","position":{"x":65,"y":79}},{"type":"FUEL","position":{"x":71,"y":68}},
    {"type":"GEARBOX","position":{"x":27,"y":78}}]
  },
  [EEquipmentModel.MAN_TGX_TANDEM_8x4]: {
    name: 'MAN TGX Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.MAN,
    image: MAN_TGX_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":74}},{"type":"SUSPENSION","position":{"x":47,"y":64}},
    {"type":"WHEELS","position":{"x":50,"y":74}},{"type":"BODY","position":{"x":47,"y":49}},
    {"type":"FRAME","position":{"x":54,"y":75}},{"type":"INTERIOR","position":{"x":21,"y":41}},
    {"type":"LIGHTS","position":{"x":33,"y":70}},{"type":"ELECTRONIC","position":{"x":31,"y":55}},
    {"type":"BATTERY","position":{"x":24,"y":58}},{"type":"LOAD","position":{"x":67,"y":62}},
    {"type":"COMPRESSOR","position":{"x":9,"y":71}},{"type":"ENGINE","position":{"x":18,"y":66}},
    {"type":"FUEL","position":{"x":60,"y":65}},{"type":"EXHAUST","position":{"x":60,"y":72}},
    {"type":"GEARBOX","position":{"x":23,"y":77}}]
  },
  [EEquipmentModel.MANAC_ALU_TIPPER]: {
    name: 'MANAC Aluminium Tipper / Grain Hauler',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.MANAC,
    image: MANAC_ALU_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":39,"y":61}},{"type":"SUSPENSION","position":{"x":42,"y":55}},
    {"type":"WHEELS","position":{"x":48,"y":61}},{"type":"BODY","position":{"x":77,"y":47}},
    {"type":"FRAME","position":{"x":64,"y":55}},{"type":"SUPPORT","position":{"x":78,"y":56}},
    {"type":"LIGHTS","position":{"x":14,"y":58}},{"type":"DOORS","position":{"x":10,"y":42}},
    {"type":"LOAD","position":{"x":49,"y":47}},{"type":"TRAILER_ATTACHMENT","position":{"x":85,"y":55}}]
  },
  [EEquipmentModel.MANAC_BOX]: {
    name: 'MANAC Box / Drop Van',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.MANAC,
    image: MANAC_BOX_IMG,
    parts: [{"type":"BRAKES","position":{"x":38,"y":69}},{"type":"SUSPENSION","position":{"x":47,"y":65}},
    {"type":"WHEELS","position":{"x":46,"y":75}},{"type":"BODY","position":{"x":63,"y":51}},
    {"type":"FRAME","position":{"x":61,"y":64}},{"type":"SUPPORT","position":{"x":82,"y":67}},
    {"type":"LIGHTS","position":{"x":27,"y":66}},{"type":"DOORS","position":{"x":18,"y":51}},
    {"type":"LOAD","position":{"x":64,"y":62}},{"type":"TRAILER_ATTACHMENT","position":{"x":87,"y":63}}]
  },
  [EEquipmentModel.MANAC_BOX_2]: {
    name: 'MANAC Box / Drop Van',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.MANAC,
    image: MANAC_BOX_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":37,"y":66}},{"type":"SUSPENSION","position":{"x":42,"y":63}},
    {"type":"WHEELS","position":{"x":40,"y":71}},{"type":"BODY","position":{"x":58,"y":49}},
    {"type":"FRAME","position":{"x":52,"y":62}},{"type":"SUPPORT","position":{"x":80,"y":63}},
    {"type":"LIGHTS","position":{"x":22,"y":65}},{"type":"DOORS","position":{"x":23,"y":46}},
    {"type":"LOAD","position":{"x":45,"y":55}},{"type":"TRAILER_ATTACHMENT","position":{"x":89,"y":56}}]
  },
  [EEquipmentModel.MANAC_FLATBED]: {
    name: 'MANAC Flatbed CFB',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.MANAC,
    image: MANAC_FLATBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":63,"y":54}},{"type":"WHEELS","position":{"x":74,"y":54}},
    {"type":"SUSPENSION","position":{"x":69,"y":45}},{"type":"BODY","position":{"x":60,"y":39}},
    {"type":"FRAME","position":{"x":79,"y":43}},{"type":"SUPPORT","position":{"x":86,"y":47}},
    {"type":"LIGHTS","position":{"x":45,"y":44}},{"type":"LOAD","position":{"x":51,"y":38}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":91,"y":39}}]
  },
  [EEquipmentModel.MANAC_FLATBED_2]: {
    name: 'MANAC Flatbed Steel Welded',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.MANAC,
    image: MANAC_FLATBED_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":56}},{"type":"SUSPENSION","position":{"x":47,"y":48}},
    {"type":"WHEELS","position":{"x":63,"y":52}},{"type":"BODY","position":{"x":53,"y":41}},
    {"type":"FRAME","position":{"x":65,"y":44}},{"type":"SUPPORT","position":{"x":81,"y":46}},
    {"type":"LIGHTS","position":{"x":34,"y":48}},{"type":"LOAD","position":{"x":45,"y":39}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":89,"y":37}}]
  },
  [EEquipmentModel.MANAC_FLATBED_3]: {
    name: 'MANAC Flatbed Modular Steel',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.MANAC,
    image: MANAC_FLATBED_3_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":61}},{"type":"SUSPENSION","position":{"x":53,"y":51}},
    {"type":"WHEELS","position":{"x":62,"y":56}},{"type":"BODY","position":{"x":63,"y":44}},
    {"type":"FRAME","position":{"x":70,"y":48}},{"type":"SUPPORT","position":{"x":87,"y":46}},
    {"type":"LIGHTS","position":{"x":30,"y":52}},{"type":"LOAD","position":{"x":42,"y":45}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":90,"y":40}}]
  },
  [EEquipmentModel.MANAC_LOWBED]: {
    name: 'MANAC Lowbed 50T',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.MANAC,
    image: MANAC_LOWBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":83,"y":47}},{"type":"SUSPENSION","position":{"x":89,"y":44}},
    {"type":"WHEELS","position":{"x":88,"y":50}},{"type":"FRAME","position":{"x":52,"y":56}},
    {"type":"SUPPORT","position":{"x":44,"y":58}},{"type":"LIGHTS","position":{"x":96,"y":45}},
    {"type":"LOAD","position":{"x":63,"y":51}},{"type":"TRAILER_ATTACHMENT","position":{"x":22,"y":48}}]
  },
  [EEquipmentModel.MANAC_LOWBED_2]: {
    name: 'MANAC Lowbed Detachable',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.MANAC,
    image: MANAC_LOWBED_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":33,"y":53}},{"type":"SUSPENSION","position":{"x":40,"y":48}},
    {"type":"WHEELS","position":{"x":42,"y":55}},{"type":"FRAME","position":{"x":57,"y":53}},
    {"type":"SUPPORT","position":{"x":88,"y":50}},{"type":"LIGHTS","position":{"x":18,"y":47}},
    {"type":"LOAD","position":{"x":68,"y":49}},{"type":"TRAILER_ATTACHMENT","position":{"x":88,"y":44}}]
  },
  [EEquipmentModel.MANAC_REEFER]: {
    name: 'MANAC Reefer Van',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.MANAC,
    image: MANAC_REEFER_IMG,
    parts: [{"type":"BRAKES","position":{"x":81,"y":69}},{"type":"SUSPENSION","position":{"x":83,"y":63}},
    {"type":"WHEELS","position":{"x":86,"y":69}},{"type":"BODY","position":{"x":47,"y":57}},
    {"type":"FRAME","position":{"x":66,"y":69}},{"type":"SUPPORT","position":{"x":66,"y":78}},
    {"type":"LIGHTS","position":{"x":92,"y":64}},{"type":"DOORS","position":{"x":90,"y":57}},
    {"type":"FRIGO","position":{"x":23,"y":45}},{"type":"LOAD","position":{"x":65,"y":63}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":31,"y":74}}]
  },
  [EEquipmentModel.MANAC_STEEL_TIPPER]: {
    name: 'MANAC Steel Tipper Demolition / End Dump',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_2_AXLES,
    brand: EBrand.MANAC,
    image: MANAC_STEEL_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":40,"y":70}},{"type":"SUSPENSION","position":{"x":43,"y":63}},
    {"type":"WHEELS","position":{"x":47,"y":71}},{"type":"BODY","position":{"x":55,"y":47}},
    {"type":"FRAME","position":{"x":59,"y":60}},{"type":"SUPPORT","position":{"x":87,"y":63}},
    {"type":"LIGHTS","position":{"x":20,"y":64}},{"type":"DOORS","position":{"x":14,"y":42}},
    {"type":"LOAD","position":{"x":45,"y":50}},{"type":"TRAILER_ATTACHMENT","position":{"x":89,"y":60}}]
  },
  [EEquipmentModel.MAXI_TRANS_Freighter_SafeTliner]: {
    name: 'MaxiTrans Freighter Safe T Liner',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.MAXITRANS,
    image: MAXI_TRANS_Freighter_SafeTliner_IMG,
    parts: [{"type":"SUSPENSION","position":{"x":33,"y":58}},{"type":"BRAKES","position":{"x":31,"y":64}},
    {"type":"WHEELS","position":{"x":38,"y":61}},{"type":"BODY","position":{"x":60,"y":48}},
    {"type":"FRAME","position":{"x":59,"y":56}},{"type":"SUPPORT","position":{"x":75,"y":60}},
    {"type":"LIGHTS","position":{"x":2,"y":57}},{"type":"DOORS","position":{"x":4,"y":47}},
    {"type":"LOAD","position":{"x":44,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":91,"y":56}}]
  },
  [EEquipmentModel.MAXI_TRANS_Freighter_skel_2]: {
    name: 'MaxiTrans Freighter Skeletal',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.MAXITRANS,
    image: MAXI_TRANS_Freighter_skel_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":37,"y":51}},{"type":"WHEELS","position":{"x":30,"y":52}},
    {"type":"SUSPENSION","position":{"x":35,"y":41}},{"type":"FRAME","position":{"x":27,"y":35}},
    {"type":"SUPPORT","position":{"x":12,"y":41}},{"type":"LIGHTS","position":{"x":67,"y":39}},
    {"type":"LOAD","position":{"x":51,"y":34}},{"type":"TRAILER_ATTACHMENT","position":{"x":9,"y":33}}]
  },
  [EEquipmentModel.MAXI_TRANS_Freighter_Ultra_Lo_Skel]: {
    name: 'MaxiTrans Freighter Ultra Low Skeletal',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.MAXITRANS,
    image: MAXI_TRANS_Freighter_Ultra_Lo_Skel_IMG,
    parts: [{"type":"BRAKES","position":{"x":76,"y":49}},{"type":"SUSPENSION","position":{"x":80,"y":47}},
    {"type":"WHEELS","position":{"x":81,"y":50}},{"type":"FRAME","position":{"x":50,"y":44}},
    {"type":"SUPPORT","position":{"x":43,"y":54}},{"type":"LIGHTS","position":{"x":94,"y":45}},
    {"type":"LOAD","position":{"x":58,"y":43}},{"type":"TRAILER_ATTACHMENT","position":{"x":21,"y":43}}]
  },
  [EEquipmentModel.MAXI_TRANS_HxW_semi_tipper]: {
    name: 'MaxiTrans Hamelex White Semi Tipper',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.MAXITRANS,
    image: MAXI_TRANS_HxW_semi_tipper_IMG,
    parts: [{"type":"BRAKES","position":{"x":37,"y":75}},{"type":"SUSPENSION","position":{"x":45,"y":71}},
    {"type":"WHEELS","position":{"x":42,"y":80}},{"type":"BODY","position":{"x":42,"y":50}},
    {"type":"FRAME","position":{"x":67,"y":70}},{"type":"SUPPORT","position":{"x":65,"y":80}},
    {"type":"LIGHTS","position":{"x":10,"y":75}},{"type":"DOORS","position":{"x":9,"y":63}},
    {"type":"HYDRAULIC","position":{"x":85,"y":57}},{"type":"LOAD","position":{"x":48,"y":39}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":93,"y":68}}]
  },
  [EEquipmentModel.MAXI_TRANS_Maxi_CUBE_Classic_2]: {
    name: 'MaxiTrans MaxiCube Hi-Cube Classic',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.MAXITRANS,
    image: MAXI_TRANS_Maxi_CUBE_Classic_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":16,"y":75}},{"type":"SUSPENSION","position":{"x":11,"y":68}},
    {"type":"WHEELS","position":{"x":9,"y":74}},{"type":"BODY","position":{"x":33,"y":53}},
    {"type":"FRAME","position":{"x":37,"y":68}},{"type":"SUPPORT","position":{"x":42,"y":76}},
    {"type":"LIGHTS","position":{"x":2,"y":67}},{"type":"DOORS","position":{"x":8,"y":53}},
    {"type":"FRIGO","position":{"x":82,"y":45}},{"type":"LOAD","position":{"x":42,"y":64}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":70,"y":70}}]
  },
  [EEquipmentModel.MAXI_TRANS_Maxi_CUBE_DryFreight_3]: {
    name: 'MaxiTrans MaxiCube Dry Freight Van',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.MAXITRANS,
    image: MAXI_TRANS_Maxi_CUBE_DryFreight_3_IMG,
    parts: [{"type":"BRAKES","position":{"x":71,"y":62}},{"type":"SUSPENSION","position":{"x":75,"y":58}},
    {"type":"WHEELS","position":{"x":76,"y":64}},{"type":"BODY","position":{"x":39,"y":47}},
    {"type":"FRAME","position":{"x":48,"y":58}},{"type":"SUPPORT","position":{"x":41,"y":63}},
    {"type":"LIGHTS","position":{"x":92,"y":58}},{"type":"DOORS","position":{"x":95,"y":47}},
    {"type":"LOAD","position":{"x":60,"y":53}},{"type":"TRAILER_ATTACHMENT","position":{"x":14,"y":57}}]
  },
  [EEquipmentModel.MAZ_5440C]: {
    name: 'MAZ 5440C 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MAZ,
    image: MAZ_5440C_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":81}},{"type":"SUSPENSION","position":{"x":56,"y":66}},
    {"type":"WHEELS","position":{"x":59,"y":77}},{"type":"BODY","position":{"x":34,"y":59}},
    {"type":"FRAME","position":{"x":40,"y":84}},{"type":"INTERIOR","position":{"x":35,"y":28}},
    {"type":"BATTERY","position":{"x":48,"y":59}},{"type":"ELECTRONIC","position":{"x":24,"y":48}},
    {"type":"LIGHTS","position":{"x":26,"y":73}},{"type":"FIFTH_WHEEL","position":{"x":75,"y":63}},
    {"type":"COMPRESSOR","position":{"x":9,"y":69}},{"type":"ENGINE","position":{"x":16,"y":65}},
    {"type":"EXHAUST","position":{"x":78,"y":75}},{"type":"FUEL","position":{"x":69,"y":65}},
    {"type":"GEARBOX","position":{"x":20,"y":80}}]
  },
  [EEquipmentModel.MAZ_5440E]: {
    name: 'MAZ 5440E 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MAZ,
    image: MAZ_5440E_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":89}},{"type":"SUSPENSION","position":{"x":64,"y":70}},
    {"type":"WHEELS","position":{"x":70,"y":82}},{"type":"BODY","position":{"x":54,"y":62}},
    {"type":"FRAME","position":{"x":48,"y":86}},{"type":"INTERIOR","position":{"x":44,"y":39}},
    {"type":"BATTERY","position":{"x":62,"y":58}},{"type":"ELECTRONIC","position":{"x":39,"y":55}},
    {"type":"LIGHTS","position":{"x":42,"y":76}},{"type":"FIFTH_WHEEL","position":{"x":74,"y":65}},
    {"type":"COMPRESSOR","position":{"x":10,"y":73}},{"type":"ENGINE","position":{"x":26,"y":66}},
    {"type":"EXHAUST","position":{"x":82,"y":81}},{"type":"FUEL","position":{"x":80,"y":70}},
    {"type":"GEARBOX","position":{"x":31,"y":85}}]
  },
  [EEquipmentModel.MAZ_6430C]: {
    name: 'MAZ 6430C 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.MAZ,
    image: MAZ_6430C_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":79}},{"type":"SUSPENSION","position":{"x":41,"y":64}},
    {"type":"WHEELS","position":{"x":38,"y":78}},{"type":"BODY","position":{"x":48,"y":53}},
    {"type":"FRAME","position":{"x":60,"y":78}},{"type":"INTERIOR","position":{"x":50,"y":35}},
    {"type":"BATTERY","position":{"x":57,"y":57}},{"type":"ELECTRONIC","position":{"x":91,"y":44}},
    {"type":"LIGHTS","position":{"x":62,"y":69}},{"type":"FIFTH_WHEEL","position":{"x":25,"y":57}},
    {"type":"COMPRESSOR","position":{"x":73,"y":67}},{"type":"ENGINE","position":{"x":83,"y":62}},
    {"type":"EXHAUST","position":{"x":29,"y":67}},{"type":"FUEL","position":{"x":22,"y":78}},
    {"type":"GEARBOX","position":{"x":80,"y":78}}]
  },
  [EEquipmentModel.MERCEDES_ACTROS_MP3_4x2]: {
    name: 'MERCEDES ACTROS MP3 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MERCEDES,
    image: MERCEDES_ACTROS_MP3_4x2_IMG,
    parts: [{"type":"WHEELS","position":{"x":62,"y":78}},{"type":"SUSPENSION","position":{"x":55,"y":66}},
            {"type":"BRAKES","position":{"x":50,"y":76}},{"type":"BODY","position":{"x":16,"y":49}},
            {"type":"FRAME","position":{"x":18,"y":79}},{"type":"INTERIOR","position":{"x":27,"y":36}},
            {"type":"BATTERY","position":{"x":19,"y":56}},{"type":"ELECTRONIC","position":{"x":36,"y":57}},
            {"type":"LIGHTS","position":{"x":13,"y":69}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":60}},
            {"type":"ENGINE","position":{"x":36,"y":71}},{"type":"EXHAUST","position":{"x":38,"y":67}},
            {"type":"GEARBOX","position":{"x":46,"y":67}},{"type":"COMPRESSOR","position":{"x":25,"y":70}},
            {"type":"FUEL","position":{"x":68,"y":67}}]
  },
  [EEquipmentModel.MERCEDES_ACTROS_MP3_6x2]: {
    name: 'MERCEDES ACTROS MP3 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.MERCEDES,
    image: MERCEDES_ACTROS_MP3_6x2_IMG,
    parts: [{"type":"GEARBOX","position":{"x":40,"y":68}},{"type":"FUEL","position":{"x":71,"y":62}},
            {"type":"EXHAUST","position":{"x":62,"y":68}},{"type":"ENGINE","position":{"x":21,"y":71}},
            {"type":"COMPRESSOR","position":{"x":14,"y":70}},{"type":"FIFTH_WHEEL","position":{"x":70,"y":57}},
            {"type":"LIGHTS","position":{"x":7,"y":70}},{"type":"ELECTRONIC","position":{"x":26,"y":60}},
            {"type":"BATTERY","position":{"x":15,"y":62}},{"type":"FRAME","position":{"x":13,"y":81}},
            {"type":"BODY","position":{"x":10,"y":55}},{"type":"INTERIOR","position":{"x":23,"y":39}},
            {"type":"WHEELS","position":{"x":56,"y":78}},{"type":"SUSPENSION","position":{"x":51,"y":66}},
            {"type":"BRAKES","position":{"x":46,"y":77}}]
  },
  [EEquipmentModel.MERCEDES_ACTROS_MP4_4x2]: {
    name: 'MERCEDES ACTROS MP4 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MERCEDES,
    image: MERCEDES_ACTROS_MP4_4x2_IMG,
    parts: [{"type":"BODY","position":{"x":15,"y":54}},{"type":"FRAME","position":{"x":20,"y":79}},
            {"type":"INTERIOR","position":{"x":24,"y":39}},{"type":"WHEELS","position":{"x":56,"y":78}},
            {"type":"SUSPENSION","position":{"x":51,"y":66}},{"type":"BRAKES","position":{"x":49,"y":76}},
            {"type":"BATTERY","position":{"x":14,"y":60}},{"type":"ELECTRONIC","position":{"x":31,"y":56}},
            {"type":"LIGHTS","position":{"x":9,"y":68}},{"type":"FIFTH_WHEEL","position":{"x":68,"y":59}},
            {"type":"COMPRESSOR","position":{"x":16,"y":70}},{"type":"ENGINE","position":{"x":25,"y":72}},
            {"type":"EXHAUST","position":{"x":70,"y":75}},{"type":"FUEL","position":{"x":70,"y":64}},
            {"type":"GEARBOX","position":{"x":35,"y":65}}]
  },
  [EEquipmentModel.MERCEDES_ACTROS_MP4_6x2]: {
    name: 'MERCEDES ACTROS MP4 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.MERCEDES,
    image: MERCEDES_ACTROS_MP4_6x2_IMG,
    parts: [{"type":"FUEL","position":{"x":69,"y":69}},{"type":"GEARBOX","position":{"x":44,"y":68}},
            {"type":"EXHAUST","position":{"x":61,"y":70}},{"type":"ENGINE","position":{"x":27,"y":74}},
            {"type":"COMPRESSOR","position":{"x":19,"y":70}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":59}},
            {"type":"LIGHTS","position":{"x":8,"y":71}},{"type":"ELECTRONIC","position":{"x":30,"y":61}},
            {"type":"BATTERY","position":{"x":24,"y":63}},{"type":"FRAME","position":{"x":18,"y":81}},
            {"type":"BODY","position":{"x":8,"y":51}},{"type":"INTERIOR","position":{"x":26,"y":40}},
            {"type":"WHEELS","position":{"x":56,"y":82}},{"type":"SUSPENSION","position":{"x":49,"y":67}},
            {"type":"BRAKES","position":{"x":46,"y":80}}]
  },
  [EEquipmentModel.MERCEDES_ACTROS_MP5_4x2]: {
    name: 'MERCEDES ACTROS MP5 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MERCEDES,
    image: MERCEDES_ACTROS_MP5_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":61,"y":91}},{"type":"SUSPENSION","position":{"x":67,"y":77}},
    {"type":"WHEELS","position":{"x":71,"y":85}},{"type":"BODY","position":{"x":59,"y":60}},
    {"type":"FRAME","position":{"x":54,"y":93}},{"type":"INTERIOR","position":{"x":49,"y":30}},
    {"type":"BATTERY","position":{"x":71,"y":68}},{"type":"ELECTRONIC","position":{"x":47,"y":52}},
    {"type":"LIGHTS","position":{"x":52,"y":74}},{"type":"FIFTH_WHEEL","position":{"x":74,"y":73}},
    {"type":"COMPRESSOR","position":{"x":14,"y":73}},{"type":"ENGINE","position":{"x":32,"y":70}},
    {"type":"EXHAUST","position":{"x":78,"y":88}},{"type":"FUEL","position":{"x":79,"y":76}},
    {"type":"GEARBOX","position":{"x":31,"y":86}}]
  },
  [EEquipmentModel.MERCEDES_ACTROS_MP5_SLT]: {
    name: 'MERCEDES ACTROS MP5 SLT 8x4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T8x4,
    brand: EBrand.MERCEDES,
    image: MERCEDES_ACTROS_MP5_SLT_IMG,
    parts: [{"type":"BRAKES","position":{"x":41,"y":88}},{"type":"SUSPENSION","position":{"x":34,"y":72}},
    {"type":"WHEELS","position":{"x":33,"y":84}},{"type":"BODY","position":{"x":38,"y":61}},
    {"type":"FRAME","position":{"x":46,"y":92}},{"type":"INTERIOR","position":{"x":48,"y":35}},
    {"type":"BATTERY","position":{"x":26,"y":65}},{"type":"ELECTRONIC","position":{"x":85,"y":53}},
    {"type":"LIGHTS","position":{"x":49,"y":75}},{"type":"FIFTH_WHEEL","position":{"x":21,"y":68}},
    {"type":"COMPRESSOR","position":{"x":51,"y":69}},{"type":"ENGINE","position":{"x":68,"y":68}},
    {"type":"GEARBOX","position":{"x":72,"y":86}},{"type":"FUEL","position":{"x":24,"y":77}},
    {"type":"EXHAUST","position":{"x":75,"y":78}}]
  },
  [EEquipmentModel.MERCEDES_ACTROS_TANDEM_6x2]: {
    name: 'MERCEDES ACTROS 6x2 Tandem',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.MERCEDES,
    image: MERCEDES_ACTROS_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":54,"y":83}},{"type":"SUSPENSION","position":{"x":58,"y":69}},
    {"type":"WHEELS","position":{"x":61,"y":79}},{"type":"BODY","position":{"x":75,"y":46}},
    {"type":"FRAME","position":{"x":72,"y":77}},{"type":"INTERIOR","position":{"x":49,"y":41}},
    {"type":"BATTERY","position":{"x":59,"y":59}},{"type":"ELECTRONIC","position":{"x":45,"y":60}},
    {"type":"LIGHTS","position":{"x":47,"y":71}},{"type":"DOORS","position":{"x":87,"y":43}},
    {"type":"LOAD","position":{"x":80,"y":61}},{"type":"COMPRESSOR","position":{"x":14,"y":72}},
    {"type":"ENGINE","position":{"x":27,"y":68}},{"type":"EXHAUST","position":{"x":66,"y":83}},
    {"type":"FUEL","position":{"x":68,"y":71}},{"type":"GEARBOX","position":{"x":30,"y":81}}]
  },
  [EEquipmentModel.MERCEDES_AROCS_4x2]: {
    name: 'MERCEDES Arocs 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.MERCEDES,
    image: MERCEDES_AROCS_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":36,"y":87}},{"type":"SUSPENSION","position":{"x":28,"y":68}},
    {"type":"WHEELS","position":{"x":22,"y":83}},{"type":"BODY","position":{"x":27,"y":52}},
    {"type":"FRAME","position":{"x":43,"y":87}},{"type":"INTERIOR","position":{"x":55,"y":24}},
    {"type":"BATTERY","position":{"x":25,"y":60}},{"type":"ELECTRONIC","position":{"x":53,"y":50}},
    {"type":"LIGHTS","position":{"x":46,"y":74}},{"type":"FIFTH_WHEEL","position":{"x":16,"y":73}},
    {"type":"COMPRESSOR","position":{"x":47,"y":66}},{"type":"ENGINE","position":{"x":71,"y":67}},
    {"type":"EXHAUST","position":{"x":65,"y":86}},{"type":"FUEL","position":{"x":15,"y":81}},
    {"type":"GEARBOX","position":{"x":72,"y":83}}]
  },
  [EEquipmentModel.MERCEDES_AROCS_8x4]: {
    name: 'MERCEDES Arocs 8x4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T8x4,
    brand: EBrand.MERCEDES,
    image: MERCEDES_AROCS_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":41,"y":87}},{"type":"SUSPENSION","position":{"x":33,"y":66}},
    {"type":"WHEELS","position":{"x":29,"y":84}},{"type":"BODY","position":{"x":31,"y":52}},
    {"type":"FRAME","position":{"x":38,"y":82}},{"type":"INTERIOR","position":{"x":54,"y":31}},
    {"type":"BATTERY","position":{"x":26,"y":64}},{"type":"ELECTRONIC","position":{"x":48,"y":49}},
    {"type":"LIGHTS","position":{"x":48,"y":78}},{"type":"FIFTH_WHEEL","position":{"x":21,"y":65}},
    {"type":"COMPRESSOR","position":{"x":24,"y":37}},{"type":"ENGINE","position":{"x":71,"y":66}},
    {"type":"EXHAUST","position":{"x":24,"y":71}},{"type":"FUEL","position":{"x":22,"y":80}},
    {"type":"GEARBOX","position":{"x":66,"y":84}}]
  },
  [EEquipmentModel.MERCEDES_ATEGO_TANDEM_4x2]: {
    name: 'MERCEDES Atego 4x2 Tandem',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.MERCEDES,
    image: MERCEDES_ATEGO_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":80}},{"type":"SUSPENSION","position":{"x":59,"y":66}},
    {"type":"WHEELS","position":{"x":60,"y":75}},{"type":"BODY","position":{"x":53,"y":51}},
    {"type":"FRAME","position":{"x":48,"y":78}},{"type":"INTERIOR","position":{"x":36,"y":45}},
    {"type":"BATTERY","position":{"x":61,"y":59}},{"type":"ELECTRONIC","position":{"x":43,"y":57}},
    {"type":"LIGHTS","position":{"x":43,"y":71}},{"type":"DOORS","position":{"x":94,"y":50}},
    {"type":"LOAD","position":{"x":79,"y":61}},{"type":"COMPRESSOR","position":{"x":11,"y":68}},
    {"type":"ENGINE","position":{"x":23,"y":68}},{"type":"EXHAUST","position":{"x":68,"y":77}},
    {"type":"FUEL","position":{"x":70,"y":67}},{"type":"GEARBOX","position":{"x":25,"y":76}}]
  },
  [EEquipmentModel.MERCEDES_SPRINTER_FRAME]: {
    name: 'MERCEDES Sprinter Frame',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1BODY,
    brand: EBrand.MERCEDES,
    image: MERCEDES_SPRINTER_FRAME_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":74}},{"type":"SUSPENSION","position":{"x":51,"y":62}},
    {"type":"WHEELS","position":{"x":46,"y":72}},{"type":"BODY","position":{"x":42,"y":57}},
    {"type":"FRAME","position":{"x":36,"y":71}},{"type":"INTERIOR","position":{"x":56,"y":36}},
    {"type":"BATTERY","position":{"x":63,"y":50}},{"type":"ELECTRONIC","position":{"x":54,"y":47}},
    {"type":"LIGHTS","position":{"x":57,"y":56}},{"type":"LOAD","position":{"x":23,"y":64}},
    {"type":"ENGINE","position":{"x":80,"y":58}},{"type":"EXHAUST","position":{"x":28,"y":68}},
    {"type":"FUEL","position":{"x":84,"y":47}},{"type":"GEARBOX","position":{"x":77,"y":67}}]
  },
  [EEquipmentModel.MERCEDES_SPRINTER_L3H2]: {
    name: 'MERCEDES Sprinter L3H2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L3H2,
    brand: EBrand.MERCEDES,
    image: MERCEDES_SPRINTER_L3H2_IMG,
    parts: [{"type":"BRAKES","position":{"x":58,"y":73}},{"type":"SUSPENSION","position":{"x":52,"y":58}},
    {"type":"WHEELS","position":{"x":49,"y":72}},{"type":"BODY","position":{"x":39,"y":53}},
    {"type":"FRAME","position":{"x":41,"y":71}},{"type":"INTERIOR","position":{"x":56,"y":37}},
    {"type":"LIGHTS","position":{"x":66,"y":58}},{"type":"ELECTRONIC","position":{"x":60,"y":48}},
    {"type":"BATTERY","position":{"x":56,"y":55}},{"type":"DOORS","position":{"x":27,"y":60}},
    {"type":"LOAD","position":{"x":18,"y":65}},{"type":"ENGINE","position":{"x":79,"y":54}},
    {"type":"EXHAUST","position":{"x":34,"y":70}},{"type":"FUEL","position":{"x":82,"y":48}},
    {"type":"GEARBOX","position":{"x":81,"y":72}}]
  },
  [EEquipmentModel.MERCEDES_SPRINTER_TIPPER]: {
    name: 'MERCEDES Sprinter Tipper',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2_TIPPER,
    brand: EBrand.MERCEDES,
    image: MERCEDES_SPRINTER_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":60,"y":72}},{"type":"SUSPENSION","position":{"x":52,"y":60}},
    {"type":"WHEELS","position":{"x":50,"y":70}},{"type":"BODY","position":{"x":36,"y":60}},
    {"type":"FRAME","position":{"x":41,"y":69}},{"type":"INTERIOR","position":{"x":59,"y":37}},
    {"type":"BATTERY","position":{"x":57,"y":48}},{"type":"ELECTRONIC","position":{"x":65,"y":46}},
    {"type":"LIGHTS","position":{"x":64,"y":52}},{"type":"LOAD","position":{"x":20,"y":51}},
    {"type":"ENGINE","position":{"x":82,"y":51}},{"type":"EXHAUST","position":{"x":33,"y":69}},
    {"type":"FUEL","position":{"x":86,"y":43}},{"type":"GEARBOX","position":{"x":85,"y":67}}]
  },
  [EEquipmentModel.MERCEDES_VITO_L1H1]: {
    name: 'MERCEDES Vito L1H1',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1H1,
    brand: EBrand.MERCEDES,
    image: MERCEDES_VITO_L1H1_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":75}},{"type":"SUSPENSION","position":{"x":48,"y":56}},
    {"type":"WHEELS","position":{"x":46,"y":66}},{"type":"BODY","position":{"x":35,"y":53}},
    {"type":"FRAME","position":{"x":34,"y":71}},{"type":"INTERIOR","position":{"x":55,"y":35}},
    {"type":"BATTERY","position":{"x":55,"y":43}},{"type":"ELECTRONIC","position":{"x":64,"y":43}},
    {"type":"LIGHTS","position":{"x":59,"y":53}},{"type":"DOORS","position":{"x":21,"y":45}},
    {"type":"LOAD","position":{"x":21,"y":60}},{"type":"ENGINE","position":{"x":78,"y":48}},
    {"type":"EXHAUST","position":{"x":39,"y":72}},{"type":"FUEL","position":{"x":79,"y":39}},
    {"type":"GEARBOX","position":{"x":79,"y":67}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_DURASTAR_BOX]: {
    name: 'Navistar International Trucks Durastar Box',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_DURASTAR_BOX_IMG,
    parts: [{"type":"BRAKES","position":{"x":36,"y":69}},{"type":"SUSPENSION","position":{"x":29,"y":60}},
    {"type":"WHEELS","position":{"x":27,"y":71}},{"type":"BODY","position":{"x":44,"y":55}},
    {"type":"FRAME","position":{"x":43,"y":65}},{"type":"INTERIOR","position":{"x":31,"y":48}},
    {"type":"BATTERY","position":{"x":31,"y":54}},{"type":"ELECTRONIC","position":{"x":25,"y":54}},
    {"type":"LIGHTS","position":{"x":18,"y":60}},{"type":"DOORS","position":{"x":90,"y":48}},
    {"type":"LOAD","position":{"x":70,"y":55}},{"type":"COMPRESSOR","position":{"x":3,"y":58}},
    {"type":"ENGINE","position":{"x":12,"y":54}},{"type":"EXHAUST","position":{"x":40,"y":65}},
    {"type":"FUEL","position":{"x":14,"y":49}},{"type":"GEARBOX","position":{"x":8,"y":65}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_DURASTAR_SEMI]: {
    name: 'Navistar International Trucks Durastar Semi 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_DURASTAR_SEMI_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":67}},{"type":"SUSPENSION","position":{"x":37,"y":58}},
    {"type":"WHEELS","position":{"x":34,"y":65}},{"type":"BODY","position":{"x":59,"y":53}},
    {"type":"FRAME","position":{"x":58,"y":62}},{"type":"INTERIOR","position":{"x":43,"y":38}},
    {"type":"BATTERY","position":{"x":43,"y":51}},{"type":"ELECTRONIC","position":{"x":33,"y":48}},
    {"type":"LIGHTS","position":{"x":21,"y":55}},{"type":"FIFTH_WHEEL","position":{"x":74,"y":53}},
    {"type":"COMPRESSOR","position":{"x":6,"y":53}},{"type":"ENGINE","position":{"x":14,"y":48}},
    {"type":"EXHAUST","position":{"x":48,"y":61}},{"type":"FUEL","position":{"x":18,"y":43}},
    {"type":"GEARBOX","position":{"x":16,"y":61}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_HV_SEMI]: {
    name: 'Navistar International Trucks HV Semi 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_HV_SEMI_IMG,
    parts: [{"type":"BRAKES","position":{"x":29,"y":65}},{"type":"SUSPENSION","position":{"x":34,"y":58}},
    {"type":"WHEELS","position":{"x":42,"y":68}},{"type":"BODY","position":{"x":54,"y":48}},
    {"type":"FRAME","position":{"x":62,"y":65}},{"type":"INTERIOR","position":{"x":39,"y":34}},
    {"type":"BATTERY","position":{"x":42,"y":44}},{"type":"ELECTRONIC","position":{"x":35,"y":42}},
    {"type":"LIGHTS","position":{"x":27,"y":49}},{"type":"FIFTH_WHEEL","position":{"x":71,"y":51}},
    {"type":"COMPRESSOR","position":{"x":6,"y":53}},{"type":"ENGINE","position":{"x":15,"y":45}},
    {"type":"EXHAUST","position":{"x":10,"y":41}},{"type":"FUEL","position":{"x":53,"y":62}},
    {"type":"GEARBOX","position":{"x":18,"y":61}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_HV_TIPPER]: {
    name: 'Navistar International Trucks HV Tipper 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T4x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_HV_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":28,"y":67}},{"type":"SUSPENSION","position":{"x":33,"y":58}},
    {"type":"WHEELS","position":{"x":36,"y":65}},{"type":"BODY","position":{"x":49,"y":51}},
    {"type":"FRAME","position":{"x":57,"y":63}},{"type":"INTERIOR","position":{"x":37,"y":38}},
    {"type":"BATTERY","position":{"x":38,"y":48}},{"type":"ELECTRONIC","position":{"x":32,"y":45}},
    {"type":"LIGHTS","position":{"x":25,"y":53}},{"type":"DOORS","position":{"x":87,"y":45}},
    {"type":"LOAD","position":{"x":69,"y":51}},{"type":"COMPRESSOR","position":{"x":7,"y":53}},
    {"type":"ENGINE","position":{"x":14,"y":47}},{"type":"EXHAUST","position":{"x":15,"y":42}},
    {"type":"FUEL","position":{"x":48,"y":62}},{"type":"GEARBOX","position":{"x":16,"y":60}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_HX_SEMI]: {
    name: 'Navistar International Trucks HX Semi 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_HX_SEMI_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":71}},{"type":"SUSPENSION","position":{"x":33,"y":59}},
    {"type":"WHEELS","position":{"x":36,"y":70}},{"type":"BODY","position":{"x":42,"y":52}},
    {"type":"FRAME","position":{"x":44,"y":61}},{"type":"INTERIOR","position":{"x":31,"y":38}},
    {"type":"BATTERY","position":{"x":36,"y":50}},{"type":"ELECTRONIC","position":{"x":29,"y":47}},
    {"type":"LIGHTS","position":{"x":23,"y":56}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":56}},
    {"type":"COMPRESSOR","position":{"x":4,"y":57}},{"type":"ENGINE","position":{"x":11,"y":56}},
    {"type":"EXHAUST","position":{"x":53,"y":56}},{"type":"FUEL","position":{"x":51,"y":64}},
    {"type":"GEARBOX","position":{"x":14,"y":65}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_HX_TIPPER]: {
    name: 'Navistar International Trucks HX Tipper 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_HX_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":70}},{"type":"SUSPENSION","position":{"x":30,"y":61}},
    {"type":"WHEELS","position":{"x":31,"y":68}},{"type":"BODY","position":{"x":42,"y":54}},
    {"type":"FRAME","position":{"x":56,"y":60}},{"type":"INTERIOR","position":{"x":30,"y":40}},
    {"type":"BATTERY","position":{"x":35,"y":52}},{"type":"ELECTRONIC","position":{"x":30,"y":46}},
    {"type":"LIGHTS","position":{"x":20,"y":57}},{"type":"DOORS","position":{"x":91,"y":45}},
    {"type":"LOAD","position":{"x":76,"y":52}},{"type":"COMPRESSOR","position":{"x":3,"y":58}},
    {"type":"ENGINE","position":{"x":11,"y":54}},{"type":"EXHAUST","position":{"x":51,"y":56}},
    {"type":"FUEL","position":{"x":46,"y":63}},{"type":"GEARBOX","position":{"x":12,"y":64}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_LONESTAR_DAYCAB]: {
    name: 'Navistar International Trucks Lonestar Daycab 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_LONESTAR_DAYCAB_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":73}},{"type":"SUSPENSION","position":{"x":28,"y":64}},
    {"type":"WHEELS","position":{"x":34,"y":70}},{"type":"BODY","position":{"x":51,"y":58}},
    {"type":"FRAME","position":{"x":51,"y":61}},{"type":"INTERIOR","position":{"x":36,"y":40}},
    {"type":"BATTERY","position":{"x":36,"y":57}},{"type":"ELECTRONIC","position":{"x":33,"y":52}},
    {"type":"LIGHTS","position":{"x":23,"y":60}},{"type":"FIFTH_WHEEL","position":{"x":78,"y":58}},
    {"type":"COMPRESSOR","position":{"x":4,"y":66}},{"type":"ENGINE","position":{"x":14,"y":61}},
    {"type":"EXHAUST","position":{"x":56,"y":64}},{"type":"FUEL","position":{"x":65,"y":68}},
    {"type":"GEARBOX","position":{"x":19,"y":71}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_LONESTAR_HIGH_SLEEPER]: {
    name: 'Navistar International Trucks Lonestar High Sleeper 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_LONESTAR_HIGH_SLEEPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":26,"y":70}},{"type":"SUSPENSION","position":{"x":28,"y":62}},
    {"type":"WHEELS","position":{"x":32,"y":68}},{"type":"BODY","position":{"x":58,"y":59}},
    {"type":"FRAME","position":{"x":69,"y":63}},{"type":"INTERIOR","position":{"x":34,"y":45}},
    {"type":"LIGHTS","position":{"x":22,"y":59}},{"type":"BATTERY","position":{"x":32,"y":57}},
    {"type":"ELECTRONIC","position":{"x":33,"y":52}},{"type":"FIFTH_WHEEL","position":{"x":76,"y":58}},
    {"type":"COMPRESSOR","position":{"x":7,"y":64}},{"type":"ENGINE","position":{"x":13,"y":58}},
    {"type":"EXHAUST","position":{"x":51,"y":60}},{"type":"FUEL","position":{"x":58,"y":65}},
    {"type":"GEARBOX","position":{"x":12,"y":68}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_LONESTAR_LOW_SLEEPER]: {
    name: 'Navistar International Trucks Lonestar Low Sleeper 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_LONESTAR_LOW_SLEEPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":26,"y":70}},{"type":"SUSPENSION","position":{"x":28,"y":62}},
    {"type":"BODY","position":{"x":58,"y":59}},{"type":"FRAME","position":{"x":69,"y":63}},
    {"type":"INTERIOR","position":{"x":34,"y":45}},{"type":"LIGHTS","position":{"x":22,"y":59}},
    {"type":"BATTERY","position":{"x":32,"y":57}},{"type":"ELECTRONIC","position":{"x":33,"y":52}},
    {"type":"FIFTH_WHEEL","position":{"x":76,"y":58}},{"type":"COMPRESSOR","position":{"x":7,"y":64}},
    {"type":"ENGINE","position":{"x":13,"y":58}},{"type":"EXHAUST","position":{"x":51,"y":60}},
    {"type":"FUEL","position":{"x":58,"y":65}},{"type":"GEARBOX","position":{"x":12,"y":68}},
    {"type":"WHEELS","position":{"x":30,"y":72}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_LT_DAYCAB]: {
    name: 'Navistar International Trucks LT Daycab 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_LT_DAYCAB_IMG,
    parts: [{"type":"INTERIOR","position":{"x":34,"y":45}},{"type":"ELECTRONIC","position":{"x":33,"y":52}},
    {"type":"FIFTH_WHEEL","position":{"x":76,"y":58}},{"type":"COMPRESSOR","position":{"x":7,"y":64}},
    {"type":"ENGINE","position":{"x":13,"y":58}},{"type":"GEARBOX","position":{"x":12,"y":68}},
    {"type":"EXHAUST","position":{"x":59,"y":61}},{"type":"FUEL","position":{"x":64,"y":68}},
    {"type":"LIGHTS","position":{"x":21,"y":62}},{"type":"BATTERY","position":{"x":38,"y":57}},
    {"type":"BRAKES","position":{"x":28,"y":74}},{"type":"SUSPENSION","position":{"x":33,"y":63}},
    {"type":"WHEELS","position":{"x":35,"y":73}},{"type":"BODY","position":{"x":48,"y":55}},
    {"type":"FRAME","position":{"x":49,"y":63}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_LT_HIGH_SLEEPER]: {
    name: 'Navistar International Trucks LT High Sleeper 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_LT_HIGH_SLEEPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":73}},{"type":"SUSPENSION","position":{"x":30,"y":63}},
    {"type":"WHEELS","position":{"x":34,"y":71}},{"type":"BODY","position":{"x":48,"y":57}},
    {"type":"FRAME","position":{"x":44,"y":66}},{"type":"INTERIOR","position":{"x":35,"y":44}},
    {"type":"BATTERY","position":{"x":34,"y":54}},{"type":"ELECTRONIC","position":{"x":30,"y":51}},
    {"type":"LIGHTS","position":{"x":22,"y":63}},{"type":"FIFTH_WHEEL","position":{"x":77,"y":58}},
    {"type":"COMPRESSOR","position":{"x":2,"y":64}},{"type":"ENGINE","position":{"x":8,"y":59}},
    {"type":"EXHAUST","position":{"x":53,"y":59}},{"type":"FUEL","position":{"x":60,"y":67}},
    {"type":"GEARBOX","position":{"x":13,"y":71}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_LT_LOW_SLEEPER]: {
    name: 'Navistar International Trucks LT Low Sleeper 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_LT_LOW_SLEEPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":73}},{"type":"SUSPENSION","position":{"x":30,"y":63}},
    {"type":"WHEELS","position":{"x":34,"y":71}},{"type":"BODY","position":{"x":48,"y":57}},
    {"type":"FRAME","position":{"x":44,"y":66}},{"type":"INTERIOR","position":{"x":35,"y":44}},
    {"type":"BATTERY","position":{"x":34,"y":54}},{"type":"ELECTRONIC","position":{"x":30,"y":51}},
    {"type":"LIGHTS","position":{"x":22,"y":63}},{"type":"FIFTH_WHEEL","position":{"x":77,"y":58}},
    {"type":"COMPRESSOR","position":{"x":2,"y":64}},{"type":"ENGINE","position":{"x":8,"y":59}},
    {"type":"EXHAUST","position":{"x":53,"y":59}},{"type":"FUEL","position":{"x":60,"y":67}},
    {"type":"GEARBOX","position":{"x":13,"y":71}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_MV_BOX]: {
    name: 'Navistar International Trucks MV Tandem Box 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_MV_BOX_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":73}},{"type":"SUSPENSION","position":{"x":30,"y":63}},
    {"type":"WHEELS","position":{"x":34,"y":71}},{"type":"INTERIOR","position":{"x":35,"y":44}},
    {"type":"BATTERY","position":{"x":34,"y":54}},{"type":"ELECTRONIC","position":{"x":30,"y":51}},
    {"type":"COMPRESSOR","position":{"x":2,"y":64}},{"type":"ENGINE","position":{"x":8,"y":59}},
    {"type":"GEARBOX","position":{"x":13,"y":71}},{"type":"FRAME","position":{"x":19,"y":70}},
    {"type":"LIGHTS","position":{"x":18,"y":61}},{"type":"FUEL","position":{"x":41,"y":67}},
    {"type":"BODY","position":{"x":21,"y":55}},{"type":"EXHAUST","position":{"x":52,"y":66}},
    {"type":"LOAD","position":{"x":64,"y":58}},{"type":"DOORS","position":{"x":91,"y":46}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_MV_SEMI]: {
    name: 'Navistar International Trucks MV Semi 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_MV_SEMI_IMG,
    parts: [{"type":"BRAKES","position":{"x":26,"y":66}},{"type":"SUSPENSION","position":{"x":35,"y":56}},
    {"type":"WHEELS","position":{"x":40,"y":64}},{"type":"BODY","position":{"x":55,"y":43}},
    {"type":"FRAME","position":{"x":57,"y":55}},{"type":"INTERIOR","position":{"x":37,"y":38}},
    {"type":"BATTERY","position":{"x":42,"y":47}},{"type":"ELECTRONIC","position":{"x":36,"y":45}},
    {"type":"LIGHTS","position":{"x":23,"y":53}},{"type":"FIFTH_WHEEL","position":{"x":71,"y":50}},
    {"type":"COMPRESSOR","position":{"x":4,"y":57}},{"type":"ENGINE","position":{"x":15,"y":50}},
    {"type":"EXHAUST","position":{"x":62,"y":63}},{"type":"FUEL","position":{"x":52,"y":64}},
    {"type":"GEARBOX","position":{"x":17,"y":62}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_MV_TIPPER]: {
    name: 'Navistar International Trucks MV Tandem Tipper 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T4x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_MV_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":26,"y":66}},{"type":"SUSPENSION","position":{"x":35,"y":56}},
    {"type":"FRAME","position":{"x":57,"y":55}},{"type":"INTERIOR","position":{"x":37,"y":38}},
    {"type":"COMPRESSOR","position":{"x":4,"y":57}},{"type":"ENGINE","position":{"x":15,"y":50}},
    {"type":"EXHAUST","position":{"x":62,"y":63}},{"type":"FUEL","position":{"x":52,"y":64}},
    {"type":"GEARBOX","position":{"x":17,"y":62}},{"type":"WHEELS","position":{"x":32,"y":66}},
    {"type":"BODY","position":{"x":45,"y":51}},{"type":"ELECTRONIC","position":{"x":29,"y":47}},
    {"type":"LIGHTS","position":{"x":22,"y":57}},{"type":"BATTERY","position":{"x":35,"y":51}},
    {"type":"LOAD","position":{"x":67,"y":44}},{"type":"DOORS","position":{"x":87,"y":48}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_PROSTAR_DAYCAB]: {
    name: 'Navistar International Trucks ProStar Daycab 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_PROSTAR_DAYCAB_IMG,
    parts: [{"type":"BRAKES","position":{"x":26,"y":77}},{"type":"SUSPENSION","position":{"x":34,"y":63}},
    {"type":"WHEELS","position":{"x":35,"y":75}},{"type":"BODY","position":{"x":55,"y":58}},
    {"type":"FRAME","position":{"x":53,"y":66}},{"type":"INTERIOR","position":{"x":44,"y":40}},
    {"type":"BATTERY","position":{"x":41,"y":51}},{"type":"ELECTRONIC","position":{"x":34,"y":49}},
    {"type":"LIGHTS","position":{"x":19,"y":64}},{"type":"FIFTH_WHEEL","position":{"x":77,"y":59}},
    {"type":"COMPRESSOR","position":{"x":2,"y":65}},{"type":"ENGINE","position":{"x":8,"y":58}},
    {"type":"EXHAUST","position":{"x":59,"y":61}},{"type":"FUEL","position":{"x":71,"y":68}},
    {"type":"GEARBOX","position":{"x":12,"y":75}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_PROSTAR_HIGH_SLEEPER]: {
    name: 'Navistar International Trucks ProStar High Sleeper 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_PROSTAR_HIGH_SLEEPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":25,"y":68}},{"type":"SUSPENSION","position":{"x":32,"y":58}},
    {"type":"WHEELS","position":{"x":33,"y":67}},{"type":"BODY","position":{"x":57,"y":50}},
    {"type":"FRAME","position":{"x":56,"y":58}},{"type":"INTERIOR","position":{"x":38,"y":38}},
    {"type":"LIGHTS","position":{"x":14,"y":59}},{"type":"ELECTRONIC","position":{"x":30,"y":48}},
    {"type":"BATTERY","position":{"x":37,"y":50}},{"type":"FIFTH_WHEEL","position":{"x":84,"y":55}},
    {"type":"COMPRESSOR","position":{"x":2,"y":60}},{"type":"ENGINE","position":{"x":8,"y":53}},
    {"type":"EXHAUST","position":{"x":60,"y":60}},{"type":"FUEL","position":{"x":75,"y":60}},
    {"type":"GEARBOX","position":{"x":7,"y":66}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_PROSTAR_LOW_SLEEPER]: {
    name: 'Navistar International Trucks ProStar Low Sleeper 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_PROSTAR_LOW_SLEEPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":25,"y":66}},{"type":"SUSPENSION","position":{"x":35,"y":57}},
    {"type":"WHEELS","position":{"x":37,"y":64}},{"type":"BODY","position":{"x":57,"y":48}},
    {"type":"FRAME","position":{"x":59,"y":55}},{"type":"INTERIOR","position":{"x":39,"y":38}},
    {"type":"LIGHTS","position":{"x":17,"y":56}},{"type":"ELECTRONIC","position":{"x":30,"y":45}},
    {"type":"BATTERY","position":{"x":38,"y":49}},{"type":"FIFTH_WHEEL","position":{"x":79,"y":52}},
    {"type":"COMPRESSOR","position":{"x":3,"y":59}},{"type":"ENGINE","position":{"x":8,"y":53}},
    {"type":"FUEL","position":{"x":68,"y":63}},{"type":"EXHAUST","position":{"x":53,"y":63}},
    {"type":"GEARBOX","position":{"x":12,"y":65}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_RH_DAYCAB]: {
    name: 'Navistar International Trucks RH Daycab 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_RH_DAYCAB_IMG,
    parts: [{"type":"BRAKES","position":{"x":30,"y":73}},{"type":"SUSPENSION","position":{"x":38,"y":61}},
    {"type":"WHEELS","position":{"x":36,"y":72}},{"type":"BODY","position":{"x":46,"y":53}},
    {"type":"FRAME","position":{"x":49,"y":61}},{"type":"INTERIOR","position":{"x":33,"y":41}},
    {"type":"BATTERY","position":{"x":37,"y":52}},{"type":"ELECTRONIC","position":{"x":31,"y":49}},
    {"type":"LIGHTS","position":{"x":23,"y":61}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":58}},
    {"type":"COMPRESSOR","position":{"x":3,"y":64}},{"type":"ENGINE","position":{"x":11,"y":58}},
    {"type":"EXHAUST","position":{"x":52,"y":61}},{"type":"FUEL","position":{"x":67,"y":68}},
    {"type":"GEARBOX","position":{"x":14,"y":73}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_RH_HIGH_SLEEPER]: {
    name: 'Navistar International Trucks RH High Sleeper 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_RH_HIGH_SLEEPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":30,"y":73}},{"type":"SUSPENSION","position":{"x":38,"y":61}},
    {"type":"WHEELS","position":{"x":36,"y":72}},{"type":"BODY","position":{"x":46,"y":53}},
    {"type":"FRAME","position":{"x":49,"y":61}},{"type":"INTERIOR","position":{"x":33,"y":41}},
    {"type":"BATTERY","position":{"x":37,"y":52}},{"type":"ELECTRONIC","position":{"x":31,"y":49}},
    {"type":"LIGHTS","position":{"x":23,"y":61}},{"type":"ENGINE","position":{"x":11,"y":58}},
    {"type":"EXHAUST","position":{"x":52,"y":61}},{"type":"GEARBOX","position":{"x":13,"y":71}},
    {"type":"COMPRESSOR","position":{"x":4,"y":61}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":55}},
    {"type":"FUEL","position":{"x":64,"y":63}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_RH_LOW_SLEEPER]: {
    name: 'Navistar International Trucks RH Low Sleeper 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_RH_LOW_SLEEPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":30,"y":73}},{"type":"SUSPENSION","position":{"x":38,"y":61}},
    {"type":"BODY","position":{"x":46,"y":53}},{"type":"BATTERY","position":{"x":37,"y":52}},
    {"type":"ELECTRONIC","position":{"x":31,"y":49}},{"type":"ENGINE","position":{"x":11,"y":58}},
    {"type":"EXHAUST","position":{"x":52,"y":61}},{"type":"COMPRESSOR","position":{"x":4,"y":61}},
    {"type":"FUEL","position":{"x":64,"y":63}},{"type":"GEARBOX","position":{"x":12,"y":68}},
    {"type":"LIGHTS","position":{"x":23,"y":56}},{"type":"WHEELS","position":{"x":39,"y":66}},
    {"type":"FRAME","position":{"x":48,"y":57}},{"type":"INTERIOR","position":{"x":35,"y":38}},
    {"type":"FIFTH_WHEEL","position":{"x":73,"y":53}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_WORKSTAR_4x2]: {
    name: 'Navistar International Trucks WorkStar Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_WORKSTAR_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":22,"y":65}},{"type":"SUSPENSION","position":{"x":32,"y":54}},
    {"type":"WHEELS","position":{"x":33,"y":63}},{"type":"BODY","position":{"x":50,"y":47}},
    {"type":"FRAME","position":{"x":54,"y":57}},{"type":"INTERIOR","position":{"x":34,"y":35}},
    {"type":"BATTERY","position":{"x":38,"y":45}},{"type":"ELECTRONIC","position":{"x":33,"y":43}},
    {"type":"LIGHTS","position":{"x":21,"y":50}},{"type":"LOAD","position":{"x":64,"y":53}},
    {"type":"COMPRESSOR","position":{"x":4,"y":57}},{"type":"ENGINE","position":{"x":8,"y":49}},
    {"type":"EXHAUST","position":{"x":12,"y":43}},{"type":"FUEL","position":{"x":48,"y":60}},
    {"type":"GEARBOX","position":{"x":12,"y":60}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_WORKSTAR_6x4]: {
    name: 'Navistar International Trucks WorkStar Tandem 6x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_WORKSTAR_6x4_IMG,
    parts: [{"type":"WHEELS","position":{"x":33,"y":63}},{"type":"BODY","position":{"x":50,"y":47}},
    {"type":"INTERIOR","position":{"x":34,"y":35}},{"type":"BATTERY","position":{"x":38,"y":45}},
    {"type":"ELECTRONIC","position":{"x":33,"y":43}},{"type":"LIGHTS","position":{"x":21,"y":50}},
    {"type":"LOAD","position":{"x":64,"y":53}},{"type":"EXHAUST","position":{"x":12,"y":43}},
    {"type":"FUEL","position":{"x":48,"y":60}},{"type":"GEARBOX","position":{"x":12,"y":60}},
    {"type":"BRAKES","position":{"x":23,"y":65}},{"type":"FRAME","position":{"x":53,"y":54}},
    {"type":"SUSPENSION","position":{"x":34,"y":53}},{"type":"COMPRESSOR","position":{"x":6,"y":53}},
    {"type":"ENGINE","position":{"x":13,"y":50}}]
  },
  [EEquipmentModel.NAVISTAR_INTERNATIONAL_WORKSTAR_8x6]: {
    name: 'Navistar International Trucks WorkStar Tandem 8x6',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4_big,
    brand: EBrand.NAVISTAR,
    image: NAVISTAR_INTERNATIONAL_WORKSTAR_8x6_IMG,
    parts: [{"type":"WHEELS","position":{"x":33,"y":63}},{"type":"BODY","position":{"x":50,"y":47}},
    {"type":"INTERIOR","position":{"x":34,"y":35}},{"type":"BATTERY","position":{"x":38,"y":45}},
    {"type":"ELECTRONIC","position":{"x":33,"y":43}},{"type":"LIGHTS","position":{"x":21,"y":50}},
    {"type":"LOAD","position":{"x":64,"y":53}},{"type":"EXHAUST","position":{"x":12,"y":43}},
    {"type":"FUEL","position":{"x":48,"y":60}},{"type":"GEARBOX","position":{"x":12,"y":60}},
    {"type":"BRAKES","position":{"x":23,"y":65}},{"type":"FRAME","position":{"x":53,"y":54}},
    {"type":"SUSPENSION","position":{"x":34,"y":53}},{"type":"COMPRESSOR","position":{"x":6,"y":53}},
    {"type":"ENGINE","position":{"x":13,"y":50}}]
  },
  [EEquipmentModel.NIKOLA_ONE]: {
    name: 'Nikola One 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NIKOLA,
    image: NIKOLA_ONE_IMG,
    parts: [{"type":"BRAKES","position":{"x":22,"y":64}},{"type":"SUSPENSION","position":{"x":26,"y":58}},
    {"type":"WHEELS","position":{"x":28,"y":65}},{"type":"BODY","position":{"x":45,"y":52}},
    {"type":"FRAME","position":{"x":47,"y":58}},{"type":"INTERIOR","position":{"x":31,"y":42}},
    {"type":"BATTERY","position":{"x":19,"y":56}},{"type":"ELECTRONIC","position":{"x":14,"y":55}},
    {"type":"LIGHTS","position":{"x":15,"y":60}},{"type":"FIFTH_WHEEL","position":{"x":77,"y":54}},
    {"type":"COMPRESSOR","position":{"x":8,"y":61}},{"type":"ENGINE","position":{"x":10,"y":57}},
    {"type":"FUEL","position":{"x":54,"y":62}},{"type":"GEARBOX","position":{"x":13,"y":65}}]
  },
  [EEquipmentModel.NIKOLA_TRE]: {
    name: 'Nikola Tre 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2_big,
    brand: EBrand.NIKOLA,
    image: NIKOLA_TRE_IMG,
    parts: [{"type":"BRAKES","position":{"x":28,"y":70}},{"type":"SUSPENSION","position":{"x":35,"y":62}},
    {"type":"WHEELS","position":{"x":38,"y":71}},{"type":"BODY","position":{"x":44,"y":56}},
    {"type":"FRAME","position":{"x":48,"y":70}},{"type":"INTERIOR","position":{"x":27,"y":38}},
    {"type":"BATTERY","position":{"x":52,"y":57}},{"type":"ELECTRONIC","position":{"x":19,"y":49}},
    {"type":"LIGHTS","position":{"x":20,"y":69}},{"type":"FIFTH_WHEEL","position":{"x":67,"y":58}},
    {"type":"COMPRESSOR","position":{"x":14,"y":62}},{"type":"ENGINE","position":{"x":18,"y":56}},
    {"type":"FUEL","position":{"x":61,"y":61}},{"type":"GEARBOX","position":{"x":15,"y":72}}]
  },
  [EEquipmentModel.NIKOLA_TWO]: {
    name: 'Nikola Two 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.NIKOLA,
    image: NIKOLA_TWO_IMG,
    parts: [{"type":"BRAKES","position":{"x":21,"y":65}},{"type":"SUSPENSION","position":{"x":26,"y":60}},
    {"type":"WHEELS","position":{"x":28,"y":66}},{"type":"BODY","position":{"x":45,"y":54}},
    {"type":"FRAME","position":{"x":47,"y":59}},{"type":"INTERIOR","position":{"x":31,"y":44}},
    {"type":"BATTERY","position":{"x":56,"y":59}},{"type":"ELECTRONIC","position":{"x":18,"y":54}},
    {"type":"LIGHTS","position":{"x":16,"y":61}},{"type":"FIFTH_WHEEL","position":{"x":74,"y":57}},
    {"type":"COMPRESSOR","position":{"x":9,"y":60}},{"type":"ENGINE","position":{"x":12,"y":56}},
    {"type":"GEARBOX","position":{"x":13,"y":65}},{"type":"FUEL","position":{"x":54,"y":65}}]
  },
  [EEquipmentModel.NISSAN_CABSTAR_BOX]: {
    name: 'Nissan NT400 Cabstar Box 4x2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1_BOX,
    brand: EBrand.NISSAN,
    image: NISSAN_CABSTAR_BOX_IMG,
    parts: [{"type":"BRAKES","position":{"x":57,"y":80}},{"type":"SUSPENSION","position":{"x":49,"y":68}},
    {"type":"WHEELS","position":{"x":48,"y":78}},{"type":"BODY","position":{"x":42,"y":58}},
    {"type":"FRAME","position":{"x":41,"y":71}},{"type":"INTERIOR","position":{"x":57,"y":45}},
    {"type":"BATTERY","position":{"x":45,"y":63}},{"type":"ELECTRONIC","position":{"x":59,"y":59}},
    {"type":"LIGHTS","position":{"x":63,"y":63}},{"type":"LOAD","position":{"x":25,"y":61}},
    {"type":"DOORS","position":{"x":10,"y":50}},{"type":"ENGINE","position":{"x":79,"y":68}},
    {"type":"EXHAUST","position":{"x":39,"y":78}},{"type":"FUEL","position":{"x":26,"y":68}},
    {"type":"GEARBOX","position":{"x":73,"y":77}}]
  },
  [EEquipmentModel.NISSAN_CABSTAR_TIPPER]: {
    name: 'Nissan NT400 Cabstar Tipper 4x2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1_TIPPER,
    brand: EBrand.NISSAN,
    image: NISSAN_CABSTAR_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":72}},{"type":"SUSPENSION","position":{"x":45,"y":62}},
    {"type":"WHEELS","position":{"x":50,"y":74}},{"type":"BODY","position":{"x":41,"y":56}},
    {"type":"FRAME","position":{"x":38,"y":63}},{"type":"INTERIOR","position":{"x":62,"y":41}},
    {"type":"BATTERY","position":{"x":37,"y":58}},{"type":"ELECTRONIC","position":{"x":57,"y":48}},
    {"type":"LIGHTS","position":{"x":63,"y":58}},{"type":"LOAD","position":{"x":31,"y":53}},
    {"type":"ENGINE","position":{"x":79,"y":61}},{"type":"EXHAUST","position":{"x":36,"y":70}},
    {"type":"FUEL","position":{"x":28,"y":66}},{"type":"GEARBOX","position":{"x":77,"y":72}}]
  },
  [EEquipmentModel.NISSAN_NV300_L1H1]: {
    name: 'Nissan NV300 Van L1H1 4x2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1H1,
    brand: EBrand.NISSAN,
    image: NISSAN_NV300_L1H1_IMG,
    parts: [{"type":"BRAKES","position":{"x":41,"y":69}},{"type":"SUSPENSION","position":{"x":44,"y":60}},
    {"type":"WHEELS","position":{"x":48,"y":69}},{"type":"BODY","position":{"x":33,"y":56}},
    {"type":"FRAME","position":{"x":36,"y":64}},{"type":"INTERIOR","position":{"x":44,"y":37}},
    {"type":"BATTERY","position":{"x":56,"y":45}},{"type":"ELECTRONIC","position":{"x":63,"y":44}},
    {"type":"LIGHTS","position":{"x":58,"y":51}},{"type":"DOORS","position":{"x":24,"y":51}},
    {"type":"LOAD","position":{"x":22,"y":60}},{"type":"ENGINE","position":{"x":74,"y":48}},
    {"type":"EXHAUST","position":{"x":33,"y":69}},{"type":"FUEL","position":{"x":80,"y":41}},
    {"type":"GEARBOX","position":{"x":70,"y":59}}]
  },
  [EEquipmentModel.NISSAN_NV400_L3H3]: {
    name: 'Nissan NV400 Van L3H3 4x2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L3H3,
    brand: EBrand.NISSAN,
    image: NISSAN_NV400_L3H3_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":75}},{"type":"SUSPENSION","position":{"x":52,"y":65}},
    {"type":"WHEELS","position":{"x":50,"y":71}},{"type":"BODY","position":{"x":44,"y":58}},
    {"type":"FRAME","position":{"x":40,"y":71}},{"type":"INTERIOR","position":{"x":53,"y":36}},
    {"type":"BATTERY","position":{"x":57,"y":50}},{"type":"ELECTRONIC","position":{"x":62,"y":50}},
    {"type":"LIGHTS","position":{"x":63,"y":59}},{"type":"DOORS","position":{"x":31,"y":52}},
    {"type":"LOAD","position":{"x":27,"y":64}},{"type":"ENGINE","position":{"x":78,"y":54}},
    {"type":"EXHAUST","position":{"x":34,"y":70}},{"type":"FUEL","position":{"x":80,"y":49}},
    {"type":"GEARBOX","position":{"x":79,"y":66}}]
  },
  [EEquipmentModel.OPEL_MOVANO_L1_CAB_TIPPER]: {
    name: 'Opel Movano Tipper Crew Cab L1',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1_CREW_TIPPER,
    brand: EBrand.OPEL,
    image: OPEL_MOVANO_L1_CAB_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":66,"y":66}},{"type":"SUSPENSION","position":{"x":58,"y":57}},
    {"type":"WHEELS","position":{"x":57,"y":66}},{"type":"BODY","position":{"x":46,"y":51}},
    {"type":"FRAME","position":{"x":45,"y":66}},{"type":"INTERIOR","position":{"x":49,"y":40}},
    {"type":"BATTERY","position":{"x":65,"y":46}},{"type":"ELECTRONIC","position":{"x":71,"y":41}},
    {"type":"LIGHTS","position":{"x":70,"y":51}},{"type":"LOAD","position":{"x":21,"y":52}},
    {"type":"ENGINE","position":{"x":80,"y":47}},{"type":"EXHAUST","position":{"x":38,"y":63}},
    {"type":"FUEL","position":{"x":81,"y":38}},{"type":"GEARBOX","position":{"x":81,"y":62}}]
  },
  [EEquipmentModel.OPEL_MOVANO_L1_FRAME]: {
    name: 'Opel Movano Frame L1',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1BODY,
    brand: EBrand.OPEL,
    image: OPEL_MOVANO_L1_FRAME_IMG,
    parts: [{"type":"BRAKES","position":{"x":78,"y":67}},{"type":"WHEELS","position":{"x":84,"y":65}},
    {"type":"SUSPENSION","position":{"x":81,"y":60}},{"type":"BODY","position":{"x":61,"y":59}},
    {"type":"FRAME","position":{"x":59,"y":66}},{"type":"INTERIOR","position":{"x":67,"y":47}},
    {"type":"BATTERY","position":{"x":85,"y":50}},{"type":"ELECTRONIC","position":{"x":81,"y":45}},
    {"type":"LIGHTS","position":{"x":92,"y":54}},{"type":"LOAD","position":{"x":31,"y":61}},
    {"type":"ENGINE","position":{"x":87,"y":55}},{"type":"EXHAUST","position":{"x":45,"y":66}},
    {"type":"FUEL","position":{"x":56,"y":54}},{"type":"GEARBOX","position":{"x":92,"y":63}}]
  },
  [EEquipmentModel.OPEL_MOVANO_L2H2]: {
    name: 'Opel Movano L2H2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2H2,
    brand: EBrand.OPEL,
    image: OPEL_MOVANO_L2H2_IMG,
    parts: [{"type":"BRAKES","position":{"x":76,"y":66}},{"type":"SUSPENSION","position":{"x":84,"y":59}},
    {"type":"WHEELS","position":{"x":86,"y":66}},{"type":"BODY","position":{"x":66,"y":55}},
    {"type":"FRAME","position":{"x":64,"y":67}},{"type":"INTERIOR","position":{"x":67,"y":43}},
    {"type":"BATTERY","position":{"x":84,"y":47}},{"type":"ELECTRONIC","position":{"x":87,"y":49}},
    {"type":"LIGHTS","position":{"x":96,"y":54}},{"type":"DOORS","position":{"x":47,"y":59}},
    {"type":"LOAD","position":{"x":35,"y":65}},{"type":"ENGINE","position":{"x":91,"y":55}},
    {"type":"EXHAUST","position":{"x":53,"y":69}},{"type":"FUEL","position":{"x":59,"y":55}},
    {"type":"GEARBOX","position":{"x":94,"y":64}}]
  },
  [EEquipmentModel.OPEL_MOVANO_L4H2]: {
    name: 'Opel Movano L4H2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L4H2,
    brand: EBrand.OPEL,
    image: OPEL_MOVANO_L4H2_IMG,
    parts: [{"type":"BODY","position":{"x":66,"y":55}},{"type":"FRAME","position":{"x":64,"y":67}},
    {"type":"INTERIOR","position":{"x":67,"y":43}},{"type":"BATTERY","position":{"x":84,"y":47}},
    {"type":"ELECTRONIC","position":{"x":87,"y":49}},{"type":"LIGHTS","position":{"x":96,"y":54}},
    {"type":"DOORS","position":{"x":47,"y":59}},{"type":"ENGINE","position":{"x":91,"y":55}},
    {"type":"GEARBOX","position":{"x":94,"y":64}},{"type":"FUEL","position":{"x":64,"y":50}},
    {"type":"EXHAUST","position":{"x":68,"y":68}},{"type":"LOAD","position":{"x":42,"y":65}},
    {"type":"WHEELS","position":{"x":88,"y":67}},{"type":"SUSPENSION","position":{"x":87,"y":60}},
    {"type":"BRAKES","position":{"x":82,"y":68}}]
  },
  [EEquipmentModel.OPEL_VIVARO]: {
    name: 'Opel Vivaro',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1H1,
    brand: EBrand.OPEL,
    image: OPEL_VIVARO_IMG,
    parts: [{"type":"BRAKES","position":{"x":60,"y":69}},{"type":"SUSPENSION","position":{"x":54,"y":58}},
    {"type":"WHEELS","position":{"x":53,"y":67}},{"type":"BODY","position":{"x":68,"y":49}},
    {"type":"FRAME","position":{"x":66,"y":66}},{"type":"INTERIOR","position":{"x":48,"y":33}},
    {"type":"BATTERY","position":{"x":45,"y":40}},{"type":"ELECTRONIC","position":{"x":39,"y":40}},
    {"type":"LIGHTS","position":{"x":41,"y":46}},{"type":"DOORS","position":{"x":82,"y":46}},
    {"type":"LOAD","position":{"x":80,"y":60}},{"type":"ENGINE","position":{"x":22,"y":45}},
    {"type":"EXHAUST","position":{"x":69,"y":65}},{"type":"FUEL","position":{"x":92,"y":44}},
    {"type":"GEARBOX","position":{"x":26,"y":64}}]
  },
  [EEquipmentModel.PETERBILT_220]: {
    name: 'Peterbilt 220 Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.PETERBILT,
    image: PETERBILT_220_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":79}},{"type":"SUSPENSION","position":{"x":59,"y":63}},
    {"type":"WHEELS","position":{"x":60,"y":75}},{"type":"BODY","position":{"x":56,"y":54}},
    {"type":"FRAME","position":{"x":51,"y":71}},{"type":"INTERIOR","position":{"x":37,"y":35}},
    {"type":"BATTERY","position":{"x":61,"y":55}},{"type":"ELECTRONIC","position":{"x":42,"y":51}},
    {"type":"LIGHTS","position":{"x":42,"y":66}},{"type":"DOORS","position":{"x":93,"y":56}},
    {"type":"LOAD","position":{"x":75,"y":66}},{"type":"COMPRESSOR","position":{"x":10,"y":62}},
    {"type":"ENGINE","position":{"x":22,"y":58}},{"type":"EXHAUST","position":{"x":33,"y":76}},
    {"type":"FUEL","position":{"x":70,"y":73}},{"type":"GEARBOX","position":{"x":23,"y":74}}]
  },
  [EEquipmentModel.PETERBILT_325]: {
    name: 'Peterbilt 325 Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_big,
    brand: EBrand.PETERBILT,
    image: PETERBILT_325_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":73}},{"type":"SUSPENSION","position":{"x":41,"y":59}},
    {"type":"WHEELS","position":{"x":38,"y":71}},{"type":"BODY","position":{"x":40,"y":49}},
    {"type":"FRAME","position":{"x":35,"y":56}},{"type":"INTERIOR","position":{"x":53,"y":33}},
    {"type":"BATTERY","position":{"x":77,"y":39}},{"type":"ELECTRONIC","position":{"x":73,"y":42}},
    {"type":"LIGHTS","position":{"x":92,"y":55}},{"type":"LOAD","position":{"x":30,"y":51}},
    {"type":"COMPRESSOR","position":{"x":57,"y":62}},{"type":"ENGINE","position":{"x":70,"y":57}},
    {"type":"EXHAUST","position":{"x":33,"y":59}},{"type":"GEARBOX","position":{"x":68,"y":64}},
    {"type":"FUEL","position":{"x":62,"y":46}}]
  },
  [EEquipmentModel.PETERBILT_330]: {
    name: 'Peterbilt 330 Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_big,
    brand: EBrand.PETERBILT,
    image: PETERBILT_330_IMG,
    parts: [{"type":"BRAKES","position":{"x":54,"y":81}},{"type":"SUSPENSION","position":{"x":46,"y":69}},
    {"type":"WHEELS","position":{"x":47,"y":77}},{"type":"BODY","position":{"x":41,"y":63}},
    {"type":"FRAME","position":{"x":37,"y":65}},{"type":"INTERIOR","position":{"x":51,"y":46}},
    {"type":"BATTERY","position":{"x":80,"y":49}},{"type":"ELECTRONIC","position":{"x":75,"y":49}},
    {"type":"LIGHTS","position":{"x":95,"y":67}},{"type":"DOORS","position":{"x":11,"y":43}},
    {"type":"LOAD","position":{"x":20,"y":56}},{"type":"COMPRESSOR","position":{"x":64,"y":66}},
    {"type":"ENGINE","position":{"x":77,"y":64}},{"type":"EXHAUST","position":{"x":36,"y":72}},
    {"type":"FUEL","position":{"x":72,"y":58}},{"type":"GEARBOX","position":{"x":74,"y":75}}]
  },
  [EEquipmentModel.PETERBILT_337]: {
    name: 'Peterbilt 337 Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_big,
    brand: EBrand.PETERBILT,
    image: PETERBILT_337_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":85}},{"type":"SUSPENSION","position":{"x":59,"y":67}},
    {"type":"WHEELS","position":{"x":63,"y":80}},{"type":"BODY","position":{"x":69,"y":56}},
    {"type":"FRAME","position":{"x":72,"y":65}},{"type":"INTERIOR","position":{"x":55,"y":36}},
    {"type":"BATTERY","position":{"x":55,"y":47}},{"type":"ELECTRONIC","position":{"x":47,"y":45}},
    {"type":"LIGHTS","position":{"x":50,"y":67}},{"type":"DOORS","position":{"x":91,"y":43}},
    {"type":"LOAD","position":{"x":84,"y":56}},{"type":"COMPRESSOR","position":{"x":11,"y":68}},
    {"type":"ENGINE","position":{"x":27,"y":67}},{"type":"EXHAUST","position":{"x":28,"y":80}},
    {"type":"FUEL","position":{"x":74,"y":69}},{"type":"GEARBOX","position":{"x":37,"y":77}}]
  },
  [EEquipmentModel.PETERBILT_348]: {
    name: 'Peterbilt 348 Tipper 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T6x2_big,
    brand: EBrand.PETERBILT,
    image: PETERBILT_348_IMG,
    parts: [{"type":"BRAKES","position":{"x":42,"y":74}},{"type":"SUSPENSION","position":{"x":55,"y":55}},
    {"type":"WHEELS","position":{"x":54,"y":70}},{"type":"BODY","position":{"x":62,"y":47}},
    {"type":"FRAME","position":{"x":64,"y":60}},{"type":"INTERIOR","position":{"x":45,"y":34}},
    {"type":"LIGHTS","position":{"x":47,"y":56}},{"type":"ELECTRONIC","position":{"x":45,"y":41}},
    {"type":"BATTERY","position":{"x":51,"y":44}},{"type":"DOORS","position":{"x":91,"y":50}},
    {"type":"LOAD","position":{"x":79,"y":52}},{"type":"COMPRESSOR","position":{"x":9,"y":58}},
    {"type":"ENGINE","position":{"x":20,"y":52}},{"type":"EXHAUST","position":{"x":67,"y":69}},
    {"type":"FUEL","position":{"x":71,"y":62}},{"type":"GEARBOX","position":{"x":25,"y":67}}]
  },
  [EEquipmentModel.PETERBILT_365]: {
    name: 'Peterbilt 365 Mixer 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2_big,
    brand: EBrand.PETERBILT,
    image: PETERBILT_365_IMG,
    parts: [{"type":"BRAKES","position":{"x":42,"y":74}},{"type":"SUSPENSION","position":{"x":53,"y":62}},
    {"type":"WHEELS","position":{"x":51,"y":71}},{"type":"BODY","position":{"x":56,"y":51}},
    {"type":"FRAME","position":{"x":60,"y":61}},{"type":"INTERIOR","position":{"x":40,"y":38}},
    {"type":"BATTERY","position":{"x":46,"y":49}},{"type":"ELECTRONIC","position":{"x":40,"y":46}},
    {"type":"LIGHTS","position":{"x":40,"y":60}},{"type":"LOAD","position":{"x":69,"y":54}},
    {"type":"COMPRESSOR","position":{"x":13,"y":62}},{"type":"ENGINE","position":{"x":23,"y":59}},
    {"type":"EXHAUST","position":{"x":37,"y":22}},{"type":"FUEL","position":{"x":71,"y":64}},
    {"type":"GEARBOX","position":{"x":30,"y":70}}]
  },
  [EEquipmentModel.PETERBILT_367]: {
    name: 'Peterbilt 367 Tipper 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T6x2_big,
    brand: EBrand.PETERBILT,
    image: PETERBILT_367_IMG,
    parts: [{"type":"BRAKES","position":{"x":54,"y":77}},{"type":"SUSPENSION","position":{"x":64,"y":63}},
    {"type":"WHEELS","position":{"x":66,"y":75}},{"type":"BODY","position":{"x":70,"y":53}},
    {"type":"INTERIOR","position":{"x":54,"y":36}},{"type":"FRAME","position":{"x":67,"y":60}},
    {"type":"BATTERY","position":{"x":61,"y":45}},{"type":"ELECTRONIC","position":{"x":54,"y":43}},
    {"type":"LIGHTS","position":{"x":54,"y":57}},{"type":"DOORS","position":{"x":92,"y":46}},
    {"type":"LOAD","position":{"x":82,"y":54}},{"type":"COMPRESSOR","position":{"x":22,"y":64}},
    {"type":"ENGINE","position":{"x":36,"y":61}},{"type":"EXHAUST","position":{"x":31,"y":19}},
    {"type":"FUEL","position":{"x":74,"y":66}},{"type":"GEARBOX","position":{"x":38,"y":73}}]
  },
  [EEquipmentModel.PETERBILT_389]: {
    name: 'Peterbilt 389 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.PETERBILT,
    image: PETERBILT_389_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":73}},{"type":"SUSPENSION","position":{"x":47,"y":61}},
    {"type":"WHEELS","position":{"x":49,"y":68}},{"type":"BODY","position":{"x":58,"y":55}},
    {"type":"FRAME","position":{"x":57,"y":63}},{"type":"INTERIOR","position":{"x":45,"y":44}},
    {"type":"BATTERY","position":{"x":49,"y":51}},{"type":"ELECTRONIC","position":{"x":44,"y":48}},
    {"type":"LIGHTS","position":{"x":41,"y":62}},{"type":"FIFTH_WHEEL","position":{"x":79,"y":58}},
    {"type":"COMPRESSOR","position":{"x":17,"y":66}},{"type":"ENGINE","position":{"x":25,"y":60}},
    {"type":"EXHAUST","position":{"x":64,"y":58}},{"type":"FUEL","position":{"x":67,"y":69}},
    {"type":"GEARBOX","position":{"x":27,"y":72}}]
  },
  [EEquipmentModel.PETERBILT_567]: {
    name: 'Peterbilt 567 Tipper 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T6x2_big,
    brand: EBrand.PETERBILT,
    image: PETERBILT_567_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":71}},{"type":"SUSPENSION","position":{"x":51,"y":58}},
    {"type":"WHEELS","position":{"x":54,"y":69}},{"type":"BODY","position":{"x":60,"y":52}},
    {"type":"FRAME","position":{"x":63,"y":57}},{"type":"INTERIOR","position":{"x":52,"y":34}},
    {"type":"BATTERY","position":{"x":53,"y":46}},{"type":"ELECTRONIC","position":{"x":47,"y":42}},
    {"type":"LIGHTS","position":{"x":41,"y":62}},{"type":"DOORS","position":{"x":91,"y":48}},
    {"type":"LOAD","position":{"x":76,"y":53}},{"type":"COMPRESSOR","position":{"x":14,"y":64}},
    {"type":"ENGINE","position":{"x":24,"y":58}},{"type":"EXHAUST","position":{"x":60,"y":60}},
    {"type":"FUEL","position":{"x":68,"y":62}},{"type":"GEARBOX","position":{"x":28,"y":69}}]
  },
  [EEquipmentModel.PETERBILT_579]: {
    name: 'Peterbilt 579 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.PETERBILT,
    image: PETERBILT_579_IMG,
    parts: [{"type":"BRAKES","position":{"x":32,"y":73}},{"type":"SUSPENSION","position":{"x":40,"y":58}},
    {"type":"WHEELS","position":{"x":39,"y":68}},{"type":"BODY","position":{"x":53,"y":55}},
    {"type":"FRAME","position":{"x":55,"y":60}},{"type":"INTERIOR","position":{"x":41,"y":41}},
    {"type":"BATTERY","position":{"x":40,"y":50}},{"type":"ELECTRONIC","position":{"x":34,"y":48}},
    {"type":"LIGHTS","position":{"x":26,"y":64}},{"type":"FIFTH_WHEEL","position":{"x":83,"y":59}},
    {"type":"COMPRESSOR","position":{"x":5,"y":64}},{"type":"ENGINE","position":{"x":15,"y":59}},
    {"type":"EXHAUST","position":{"x":59,"y":72}},{"type":"FUEL","position":{"x":66,"y":63}},
    {"type":"GEARBOX","position":{"x":13,"y":69}}]
  },
  [EEquipmentModel.PEUGEOT_BOXER_L1H1]: {
    name: 'Peugeot Boxer L1H1',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1H1,
    brand: EBrand.PEUGEOT,
    image: PEUGEOT_BOXER_L1H1_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":81}},{"type":"SUSPENSION","position":{"x":44,"y":64}},
    {"type":"WHEELS","position":{"x":47,"y":78}},{"type":"BODY","position":{"x":32,"y":60}},
    {"type":"INTERIOR","position":{"x":44,"y":41}},{"type":"FRAME","position":{"x":33,"y":72}},
    {"type":"LIGHTS","position":{"x":56,"y":57}},{"type":"BATTERY","position":{"x":65,"y":55}},
    {"type":"ELECTRONIC","position":{"x":58,"y":53}},{"type":"DOORS","position":{"x":19,"y":54}},
    {"type":"LOAD","position":{"x":24,"y":64}},{"type":"ENGINE","position":{"x":80,"y":66}},
    {"type":"EXHAUST","position":{"x":39,"y":73}},{"type":"FUEL","position":{"x":28,"y":54}},
    {"type":"GEARBOX","position":{"x":78,"y":78}}]
  },
  [EEquipmentModel.PEUGEOT_BOXER_L2H2]: {
    name: 'Peugeot Boxer L2H2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2H2,
    brand: EBrand.PEUGEOT,
    image: PEUGEOT_BOXER_L2H2_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":77}},{"type":"SUSPENSION","position":{"x":47,"y":62}},
    {"type":"WHEELS","position":{"x":46,"y":74}},{"type":"BODY","position":{"x":34,"y":60}},
    {"type":"FRAME","position":{"x":35,"y":70}},{"type":"INTERIOR","position":{"x":52,"y":41}},
    {"type":"BATTERY","position":{"x":56,"y":50}},{"type":"ELECTRONIC","position":{"x":61,"y":52}},
    {"type":"LIGHTS","position":{"x":58,"y":57}},{"type":"DOORS","position":{"x":29,"y":52}},
    {"type":"LOAD","position":{"x":20,"y":60}},{"type":"ENGINE","position":{"x":82,"y":62}},
    {"type":"EXHAUST","position":{"x":40,"y":71}},{"type":"FUEL","position":{"x":32,"y":54}},
    {"type":"GEARBOX","position":{"x":79,"y":73}}]
  },
  [EEquipmentModel.PEUGEOT_EXPERT]: {
    name: 'Peugeot Expert',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1H1,
    brand: EBrand.PEUGEOT,
    image: PEUGEOT_EXPERT_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":72}},{"type":"SUSPENSION","position":{"x":46,"y":59}},
    {"type":"WHEELS","position":{"x":42,"y":70}},{"type":"BODY","position":{"x":31,"y":57}},
    {"type":"FRAME","position":{"x":32,"y":67}},{"type":"INTERIOR","position":{"x":51,"y":35}},
    {"type":"BATTERY","position":{"x":56,"y":44}},{"type":"ELECTRONIC","position":{"x":50,"y":42}},
    {"type":"LIGHTS","position":{"x":55,"y":48}},{"type":"DOORS","position":{"x":20,"y":49}},
    {"type":"LOAD","position":{"x":23,"y":62}},{"type":"ENGINE","position":{"x":78,"y":48}},
    {"type":"EXHAUST","position":{"x":36,"y":70}},{"type":"FUEL","position":{"x":23,"y":43}},
    {"type":"GEARBOX","position":{"x":71,"y":71}}]
  },
  [EEquipmentModel.PITTS_FLATBED_LB35]: {
    name: 'Pitts Flatbed LB35',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.PITTS,
    image: PITTS_FLATBED_LB35_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":59}},{"type":"WHEELS","position":{"x":49,"y":58}},
    {"type":"SUSPENSION","position":{"x":54,"y":53}},{"type":"FRAME","position":{"x":34,"y":51}},
    {"type":"SUPPORT","position":{"x":14,"y":50}},{"type":"LIGHTS","position":{"x":86,"y":61}},
    {"type":"LOAD","position":{"x":47,"y":50}},{"type":"RAMP","position":{"x":83,"y":53}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":10,"y":40}}]
  },
  [EEquipmentModel.PITTS_LOWBED_LB35_DC]: {
    name: 'Pitts Lowbed LB35 DC',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.PITTS,
    image: PITTS_LOWBED_LB35_DC_IMG,
    parts: [{"type":"BRAKES","position":{"x":88,"y":49}},{"type":"SUSPENSION","position":{"x":91,"y":45}},
    {"type":"WHEELS","position":{"x":92,"y":49}},{"type":"FRAME","position":{"x":72,"y":51}},
    {"type":"SUPPORT","position":{"x":49,"y":60}},{"type":"LIGHTS","position":{"x":95,"y":46}},
    {"type":"LOAD","position":{"x":63,"y":51}},{"type":"TRAILER_ATTACHMENT","position":{"x":13,"y":49}}]
  },
  [EEquipmentModel.PITTS_LOWBED_LB51_DC]: {
    name: 'Pitts Lowbed LB51 DC',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.PITTS,
    image: PITTS_LOWBED_LB51_DC_IMG,
    parts: [{"type":"BRAKES","position":{"x":87,"y":44}},{"type":"SUSPENSION","position":{"x":91,"y":41}},
    {"type":"WHEELS","position":{"x":92,"y":47}},{"type":"FRAME","position":{"x":58,"y":54}},
    {"type":"SUPPORT","position":{"x":44,"y":58}},{"type":"LIGHTS","position":{"x":96,"y":42}},
    {"type":"LOAD","position":{"x":65,"y":48}},{"type":"TRAILER_ATTACHMENT","position":{"x":16,"y":49}}]
  },
  [EEquipmentModel.PITTS_LOWBED_LB55_DC]: {
    name: 'Pitts Lowbed LB55 DC',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.PITTS,
    image: PITTS_LOWBED_LB55_DC_IMG,
    parts: [{"type":"BRAKES","position":{"x":89,"y":48}},{"type":"SUSPENSION","position":{"x":92,"y":44}},
    {"type":"WHEELS","position":{"x":93,"y":50}},{"type":"FRAME","position":{"x":67,"y":56}},
    {"type":"SUPPORT","position":{"x":58,"y":62}},{"type":"LIGHTS","position":{"x":98,"y":47}},
    {"type":"LOAD","position":{"x":71,"y":51}},{"type":"TRAILER_ATTACHMENT","position":{"x":22,"y":50}}]
  },
  [EEquipmentModel.POLAR_TANK_CHEMICAL]: {
    name: 'Polar Tank Chemical',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.POLAR_TANK,
    image: POLAR_TANK_CHEMICAL_IMG,
    parts: [{"type":"BRAKES","position":{"x":34,"y":64}},{"type":"SUSPENSION","position":{"x":40,"y":55}},
    {"type":"WHEELS","position":{"x":41,"y":61}},{"type":"BODY","position":{"x":45,"y":39}},
    {"type":"FRAME","position":{"x":57,"y":52}},{"type":"SUPPORT","position":{"x":82,"y":60}},
    {"type":"LIGHTS","position":{"x":17,"y":57}},{"type":"LOAD","position":{"x":58,"y":41}},
    {"type":"DOORS","position":{"x":64,"y":33}},{"type":"TRAILER_ATTACHMENT","position":{"x":93,"y":50}}]
  },
  [EEquipmentModel.POLAR_TANK_DEEP_DROP]: {
    name: 'Polar Tank Deep Drop',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.POLAR_TANK,
    image: POLAR_TANK_DEEP_DROP_IMG,
    parts: [{"type":"BRAKES","position":{"x":34,"y":60}},{"type":"SUSPENSION","position":{"x":37,"y":53}},
    {"type":"WHEELS","position":{"x":42,"y":59}},{"type":"BODY","position":{"x":50,"y":38}},
    {"type":"FRAME","position":{"x":55,"y":49}},{"type":"SUPPORT","position":{"x":81,"y":58}},
    {"type":"LIGHTS","position":{"x":17,"y":53}},{"type":"DOORS","position":{"x":59,"y":33}},
    {"type":"LOAD","position":{"x":60,"y":49}},{"type":"TRAILER_ATTACHMENT","position":{"x":91,"y":47}}]
  },
  [EEquipmentModel.POLAR_TANK_ENERGY]: {
    name: 'Polar Tank Energy',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.POLAR_TANK,
    image: POLAR_TANK_ENERGY_IMG,
    parts: [{"type":"BRAKES","position":{"x":31,"y":64}},{"type":"SUSPENSION","position":{"x":36,"y":55}},
    {"type":"WHEELS","position":{"x":40,"y":61}},{"type":"BODY","position":{"x":48,"y":41}},
    {"type":"FRAME","position":{"x":56,"y":50}},{"type":"SUPPORT","position":{"x":81,"y":59}},
    {"type":"LIGHTS","position":{"x":18,"y":55}},{"type":"DOORS","position":{"x":67,"y":35}},
    {"type":"LOAD","position":{"x":65,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":90,"y":48}}]
  },
  [EEquipmentModel.POLAR_TANK_FOOD]: {
    name: 'Polar Tank Food',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.POLAR_TANK,
    image: POLAR_TANK_FOOD_IMG,
    parts: [{"type":"BRAKES","position":{"x":36,"y":62}},{"type":"SUSPENSION","position":{"x":39,"y":54}},
    {"type":"WHEELS","position":{"x":42,"y":60}},{"type":"BODY","position":{"x":51,"y":41}},
    {"type":"FRAME","position":{"x":60,"y":52}},{"type":"SUPPORT","position":{"x":82,"y":57}},
    {"type":"LIGHTS","position":{"x":17,"y":54}},{"type":"LOAD","position":{"x":46,"y":48}},
    {"type":"DOORS","position":{"x":65,"y":33}},{"type":"TRAILER_ATTACHMENT","position":{"x":91,"y":49}}]
  },
  [EEquipmentModel.POLAR_TANK_HOT]: {
    name: 'Polar Tank Hot',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.POLAR_TANK,
    image: POLAR_TANK_HOT_IMG,
    parts: [{"type":"BRAKES","position":{"x":34,"y":61}},{"type":"SUSPENSION","position":{"x":42,"y":55}},
    {"type":"WHEELS","position":{"x":41,"y":62}},{"type":"BODY","position":{"x":45,"y":43}},
    {"type":"FRAME","position":{"x":53,"y":51}},{"type":"SUPPORT","position":{"x":82,"y":57}},
    {"type":"DOORS","position":{"x":65,"y":29}},{"type":"FRIGO","position":{"x":60,"y":30}},
    {"type":"LOAD","position":{"x":63,"y":46}},{"type":"TRAILER_ATTACHMENT","position":{"x":89,"y":51}},
    {"type":"LIGHTS","position":{"x":16,"y":55}}]
  },
  [EEquipmentModel.POLAR_TANK_PETROLEUM]: {
    name: 'Polar Tank Petroleum',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.POLAR_TANK,
    image: POLAR_TANK_PETROLEUM_IMG,
    parts: [{"type":"BRAKES","position":{"x":31,"y":62}},{"type":"WHEELS","position":{"x":43,"y":61}},
    {"type":"SUSPENSION","position":{"x":34,"y":55}},{"type":"BODY","position":{"x":56,"y":43}},
    {"type":"FRAME","position":{"x":54,"y":48}},{"type":"SUPPORT","position":{"x":82,"y":59}},
    {"type":"LIGHTS","position":{"x":16,"y":55}},{"type":"DOORS","position":{"x":58,"y":34}},
    {"type":"LOAD","position":{"x":65,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":94,"y":48}}]
  },
  [EEquipmentModel.PRATT_CONTAINER_CC242]: {
    name: 'Pratt Container CC242',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_2_AXLES,
    brand: EBrand.PRATT,
    image: PRATT_CONTAINER_CC242_IMG,
    parts: [{"type":"BRAKES","position":{"x":63,"y":60}},{"type":"SUSPENSION","position":{"x":57,"y":48}},
    {"type":"WHEELS","position":{"x":52,"y":58}},{"type":"FRAME","position":{"x":42,"y":44}},
    {"type":"SUPPORT","position":{"x":25,"y":58}},{"type":"LIGHTS","position":{"x":88,"y":49}},
    {"type":"LOAD","position":{"x":50,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":10,"y":44}}]
  },
  [EEquipmentModel.PRATT_CONTAINER_CC243]: {
    name: 'Pratt Container CC243',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.PRATT,
    image: PRATT_CONTAINER_CC243_IMG,
    parts: [{"type":"BRAKES","position":{"x":39,"y":54}},{"type":"SUSPENSION","position":{"x":38,"y":42}},
    {"type":"WHEELS","position":{"x":30,"y":54}},{"type":"FRAME","position":{"x":29,"y":38}},
    {"type":"SUPPORT","position":{"x":17,"y":36}},{"type":"LIGHTS","position":{"x":55,"y":43}},
    {"type":"LOAD","position":{"x":43,"y":36}},{"type":"TRAILER_ATTACHMENT","position":{"x":14,"y":34}}]
  },
  [EEquipmentModel.PRATT_CONTAINER_D3141]: {
    name: 'Pratt Container D3141',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.PRATT,
    image: PRATT_CONTAINER_D3141_IMG,
    parts: [{"type":"BRAKES","position":{"x":23,"y":49}},{"type":"SUSPENSION","position":{"x":21,"y":42}},
    {"type":"WHEELS","position":{"x":18,"y":48}},{"type":"FRAME","position":{"x":32,"y":48}},
    {"type":"SUPPORT","position":{"x":39,"y":65}},{"type":"LIGHTS","position":{"x":10,"y":36}},
    {"type":"LOAD","position":{"x":32,"y":42}},{"type":"TRAILER_ATTACHMENT","position":{"x":75,"y":53}}]
  },
  [EEquipmentModel.PRATT_CONTAINER_GN2040EZ]: {
    name: 'Pratt Container GN2040EZ',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.PRATT,
    image: PRATT_CONTAINER_GN2040EZ_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":54}},{"type":"SUSPENSION","position":{"x":52,"y":48}},
    {"type":"WHEELS","position":{"x":45,"y":53}},{"type":"FRAME","position":{"x":34,"y":41}},
    {"type":"SUPPORT","position":{"x":20,"y":41}},{"type":"LIGHTS","position":{"x":70,"y":52}},
    {"type":"LOAD","position":{"x":49,"y":41}},{"type":"TRAILER_ATTACHMENT","position":{"x":16,"y":31}}]
  },
  [EEquipmentModel.PRATT_FLATBED_FB472SA]: {
    name: 'Pratt Flatbed FB472SA',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.PRATT,
    image: PRATT_FLATBED_FB472SA_IMG,
    parts: [{"type":"BRAKES","position":{"x":82,"y":48}},{"type":"SUSPENSION","position":{"x":87,"y":43}},
    {"type":"WHEELS","position":{"x":86,"y":48}},{"type":"FRAME","position":{"x":62,"y":50}},
    {"type":"SUPPORT","position":{"x":47,"y":61}},{"type":"LIGHTS","position":{"x":94,"y":41}},
    {"type":"LOAD","position":{"x":56,"y":46}},{"type":"TRAILER_ATTACHMENT","position":{"x":22,"y":54}}]
  },
  [EEquipmentModel.PRATT_FLATBED_FB533]: {
    name: 'Pratt Flatbed FB833',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_2_AXLES,
    brand: EBrand.PRATT,
    image: PRATT_FLATBED_FB533_IMG,
    parts: [{"type":"BRAKES","position":{"x":76,"y":49}},{"type":"SUSPENSION","position":{"x":78,"y":43}},
    {"type":"WHEELS","position":{"x":80,"y":46}},{"type":"FRAME","position":{"x":47,"y":48}},
    {"type":"SUPPORT","position":{"x":55,"y":56}},{"type":"LIGHTS","position":{"x":91,"y":39}},
    {"type":"LOAD","position":{"x":55,"y":43}},{"type":"TRAILER_ATTACHMENT","position":{"x":26,"y":53}}]
  },
  [EEquipmentModel.PRATT_FLATBED_FB4228P]: {
    name: 'Pratt Flatbed FB4228P',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.PRATT,
    image: PRATT_FLATBED_FB4228P_IMG,
    parts: [{"type":"BRAKES","position":{"x":42,"y":58}},{"type":"SUSPENSION","position":{"x":40,"y":49}},
    {"type":"WHEELS","position":{"x":31,"y":58}},{"type":"FRAME","position":{"x":23,"y":39}},
    {"type":"SUPPORT","position":{"x":12,"y":37}},{"type":"LIGHTS","position":{"x":58,"y":56}},
    {"type":"LOAD","position":{"x":49,"y":38}},{"type":"TRAILER_ATTACHMENT","position":{"x":18,"y":24}}]
  },
  [EEquipmentModel.PRATT_LOWBED_LB5374_40]: {
    name: 'Pratt Lowbed 40T LB5374',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.PRATT,
    image: PRATT_LOWBED_LB5374_40_IMG,
    parts: [{"type":"BRAKES","position":{"x":64,"y":55}},{"type":"SUSPENSION","position":{"x":60,"y":51}},
    {"type":"WHEELS","position":{"x":57,"y":57}},{"type":"FRAME","position":{"x":18,"y":45}},
    {"type":"SUPPORT","position":{"x":11,"y":43}},{"type":"LIGHTS","position":{"x":87,"y":58}},
    {"type":"LOAD","position":{"x":39,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":10,"y":34}}]
  },
  [EEquipmentModel.PRATT_LOWBED_MD482A]: {
    name: 'Pratt Lowbed MD482A',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_3_AXLES,
    brand: EBrand.PRATT,
    image: PRATT_LOWBED_MD482A_IMG,
    parts: [{"type":"BRAKES","position":{"x":54,"y":57}},{"type":"SUSPENSION","position":{"x":52,"y":52}},
    {"type":"WHEELS","position":{"x":49,"y":55}},{"type":"FRAME","position":{"x":32,"y":47}},
    {"type":"SUPPORT","position":{"x":14,"y":39}},{"type":"LIGHTS","position":{"x":77,"y":62}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":15,"y":31}},{"type":"LOAD","position":{"x":43,"y":47}}]
  },
  [EEquipmentModel.PRATT_LOWBED_MDE48702A]: {
    name: 'Pratt Lowbed MDE48702A',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].LOWBED_2_AXLES,
    brand: EBrand.PRATT,
    image: PRATT_LOWBED_MDE48702A_IMG,
    parts: [{"type":"BRAKES","position":{"x":71,"y":60}},{"type":"SUSPENSION","position":{"x":67,"y":57}},
    {"type":"WHEELS","position":{"x":64,"y":63}},{"type":"FRAME","position":{"x":26,"y":45}},
    {"type":"SUPPORT","position":{"x":6,"y":38}},{"type":"LIGHTS","position":{"x":78,"y":60}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":11,"y":31}},{"type":"LOAD","position":{"x":40,"y":44}}]
  },
  [EEquipmentModel.REINKE_FLATBED]: {
    name: 'Reinke Flatbed',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.REINKE,
    image: REINKE_FLATBED_IMG,
    parts: [{"type":"BRAKES","position":{"x":60,"y":53}},{"type":"WHEELS","position":{"x":68,"y":56}},
    {"type":"SUSPENSION","position":{"x":66,"y":47}},{"type":"FRAME","position":{"x":80,"y":44}},
    {"type":"SUPPORT","position":{"x":89,"y":47}},{"type":"LIGHTS","position":{"x":35,"y":52}},
    {"type":"LOAD","position":{"x":48,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":92,"y":34}}]
  },
  [EEquipmentModel.RENAULT_MAGNUM_4x2]: {
    name: 'Renault Magnum 4 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.RENAULT,
    image: RENAULT_MAGNUM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":77}},{"type":"SUSPENSION","position":{"x":52,"y":68}},
            {"type":"WHEELS","position":{"x":57,"y":78}},{"type":"BODY","position":{"x":20,"y":49}},
            {"type":"FRAME","position":{"x":23,"y":79}},{"type":"INTERIOR","position":{"x":34,"y":39}},
            {"type":"LIGHTS","position":{"x":12,"y":66}},{"type":"ELECTRONIC","position":{"x":35,"y":57}},
            {"type":"BATTERY","position":{"x":25,"y":58}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":59}},
            {"type":"ENGINE","position":{"x":32,"y":72}},{"type":"COMPRESSOR","position":{"x":26,"y":72}},
            {"type":"EXHAUST","position":{"x":67,"y":77}},{"type":"FUEL","position":{"x":71,"y":67}},
            {"type":"GEARBOX","position":{"x":42,"y":66}}]
  },
  [EEquipmentModel.RENAULT_MAGNUM_6x2]: {
    name: 'Renault Magnum 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.RENAULT,
    image: RENAULT_MAGNUM_6x2_IMG,
    parts: [{"type":"FUEL","position":{"x":74,"y":70}},{"type":"GEARBOX","position":{"x":48,"y":65}},
            {"type":"EXHAUST","position":{"x":64,"y":76}},{"type":"ENGINE","position":{"x":34,"y":75}},
            {"type":"COMPRESSOR","position":{"x":26,"y":75}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":61}},
            {"type":"LIGHTS","position":{"x":11,"y":64}},{"type":"ELECTRONIC","position":{"x":36,"y":57}},
            {"type":"BATTERY","position":{"x":20,"y":54}},{"type":"INTERIOR","position":{"x":21,"y":41}},
            {"type":"FRAME","position":{"x":18,"y":80}},{"type":"BODY","position":{"x":12,"y":54}},
            {"type":"WHEELS","position":{"x":54,"y":82}},{"type":"SUSPENSION","position":{"x":47,"y":69}},
            {"type":"BRAKES","position":{"x":44,"y":80}}]
  },
  [EEquipmentModel.RENAULT_MASTER_BOX_L2]: {
    name: 'Renault Master Box Van L2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2_BOX,
    brand: EBrand.RENAULT,
    image: RENAULT_MASTER_BOX_L2_IMG,
    parts: [{"type":"BRAKES","position":{"x":79,"y":66}},{"type":"SUSPENSION","position":{"x":81,"y":60}},
    {"type":"WHEELS","position":{"x":84,"y":64}},{"type":"FRAME","position":{"x":63,"y":65}},
    {"type":"INTERIOR","position":{"x":71,"y":51}},{"type":"BODY","position":{"x":69,"y":59}},
    {"type":"BATTERY","position":{"x":82,"y":53}},{"type":"ELECTRONIC","position":{"x":78,"y":48}},
    {"type":"LIGHTS","position":{"x":91,"y":55}},{"type":"DOORS","position":{"x":9,"y":46}},
    {"type":"LOAD","position":{"x":37,"y":56}},{"type":"ENGINE","position":{"x":85,"y":57}},
    {"type":"EXHAUST","position":{"x":69,"y":66}},{"type":"FUEL","position":{"x":63,"y":57}},
    {"type":"GEARBOX","position":{"x":90,"y":64}}]
  },
  [EEquipmentModel.RENAULT_MASTER_FRAME_L2]: {
    name: 'Renault Master Van Frame L2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2BODY,
    brand: EBrand.RENAULT,
    image: RENAULT_MASTER_FRAME_L2_IMG,
    parts: [{"type":"BRAKES","position":{"x":80,"y":62}},{"type":"SUSPENSION","position":{"x":85,"y":57}},
    {"type":"WHEELS","position":{"x":88,"y":64}},{"type":"BODY","position":{"x":69,"y":57}},
    {"type":"FRAME","position":{"x":67,"y":64}},{"type":"INTERIOR","position":{"x":69,"y":42}},
    {"type":"BATTERY","position":{"x":82,"y":44}},{"type":"ELECTRONIC","position":{"x":85,"y":46}},
    {"type":"LIGHTS","position":{"x":97,"y":52}},{"type":"LOAD","position":{"x":31,"y":57}},
    {"type":"ENGINE","position":{"x":91,"y":54}},{"type":"EXHAUST","position":{"x":47,"y":63}},
    {"type":"FUEL","position":{"x":64,"y":54}},{"type":"GEARBOX","position":{"x":93,"y":62}}]
  },
  [EEquipmentModel.RENAULT_MASTER_L2H2]: {
    name: 'Renault Master Van L2H2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2H2,
    brand: EBrand.RENAULT,
    image: RENAULT_MASTER_L2H2_IMG,
    parts: [{"type":"BRAKES","position":{"x":42,"y":69}},{"type":"SUSPENSION","position":{"x":45,"y":59}},
    {"type":"WHEELS","position":{"x":49,"y":64}},{"type":"BODY","position":{"x":59,"y":53}},
    {"type":"INTERIOR","position":{"x":47,"y":43}},{"type":"FRAME","position":{"x":58,"y":66}},
    {"type":"LIGHTS","position":{"x":39,"y":56}},{"type":"ELECTRONIC","position":{"x":39,"y":49}},
    {"type":"BATTERY","position":{"x":43,"y":51}},{"type":"DOORS","position":{"x":68,"y":51}},
    {"type":"LOAD","position":{"x":70,"y":61}},{"type":"ENGINE","position":{"x":28,"y":53}},
    {"type":"EXHAUST","position":{"x":61,"y":64}},{"type":"FUEL","position":{"x":62,"y":56}},
    {"type":"GEARBOX","position":{"x":29,"y":63}}]
  },
  [EEquipmentModel.RENAULT_MASTER_TIPPER_L2]: {
    name: 'Renault Master Van Tipper L2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2_TIPPER,
    brand: EBrand.RENAULT,
    image: RENAULT_MASTER_TIPPER_L2_IMG,
    parts: [{"type":"BRAKES","position":{"x":81,"y":64}},{"type":"SUSPENSION","position":{"x":85,"y":56}},
    {"type":"WHEELS","position":{"x":86,"y":62}},{"type":"BODY","position":{"x":65,"y":56}},
    {"type":"FRAME","position":{"x":66,"y":64}},{"type":"INTERIOR","position":{"x":67,"y":45}},
    {"type":"LIGHTS","position":{"x":94,"y":50}},{"type":"BATTERY","position":{"x":86,"y":48}},
    {"type":"ELECTRONIC","position":{"x":81,"y":45}},{"type":"LOAD","position":{"x":28,"y":51}},
    {"type":"ENGINE","position":{"x":87,"y":52}},{"type":"EXHAUST","position":{"x":42,"y":65}},
    {"type":"FUEL","position":{"x":61,"y":52}},{"type":"GEARBOX","position":{"x":92,"y":63}}]
  },
  [EEquipmentModel.RENAULT_PREMIUM_4x2]: {
    name: 'Renault Premium 4 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.RENAULT,
    image: RENAULT_PREMIUM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":74}},{"type":"WHEELS","position":{"x":60,"y":78}},
            {"type":"SUSPENSION","position":{"x":52,"y":64}},{"type":"BODY","position":{"x":15,"y":54}},
            {"type":"FRAME","position":{"x":24,"y":79}},{"type":"INTERIOR","position":{"x":26,"y":40}},
            {"type":"BATTERY","position":{"x":15,"y":58}},{"type":"LIGHTS","position":{"x":12,"y":70}},
            {"type":"ELECTRONIC","position":{"x":30,"y":56}},{"type":"FIFTH_WHEEL","position":{"x":70,"y":58}},
            {"type":"COMPRESSOR","position":{"x":17,"y":68}},{"type":"ENGINE","position":{"x":26,"y":70}},
            {"type":"EXHAUST","position":{"x":64,"y":74}},{"type":"FUEL","position":{"x":68,"y":63}},
            {"type":"GEARBOX","position":{"x":36,"y":65}}]
  },
  [EEquipmentModel.RENAULT_PREMIUM_6x2]: {
    name: 'Renault Premium 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.RENAULT,
    image: RENAULT_PREMIUM_6x2_IMG,
    parts: [{"type":"WHEELS","position":{"x":54,"y":78}},{"type":"SUSPENSION","position":{"x":50,"y":65}},
            {"type":"BRAKES","position":{"x":46,"y":76}},{"type":"INTERIOR","position":{"x":27,"y":44}},
            {"type":"FRAME","position":{"x":24,"y":80}},{"type":"BODY","position":{"x":19,"y":51}},
            {"type":"BATTERY","position":{"x":18,"y":59}},{"type":"LIGHTS","position":{"x":11,"y":69}},
            {"type":"ELECTRONIC","position":{"x":35,"y":54}},{"type":"FIFTH_WHEEL","position":{"x":71,"y":59}},
            {"type":"COMPRESSOR","position":{"x":18,"y":70}},{"type":"ENGINE","position":{"x":26,"y":69}},
            {"type":"EXHAUST","position":{"x":58,"y":66}},{"type":"FUEL","position":{"x":66,"y":70}},
            {"type":"GEARBOX","position":{"x":39,"y":62}}]
  },
  [EEquipmentModel.RENAULT_RANGE_T_4x2]: {
    name: 'Renault Range T 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.RENAULT,
    image: RENAULT_RANGE_T_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":76}},{"type":"SUSPENSION","position":{"x":53,"y":67}},
    {"type":"WHEELS","position":{"x":57,"y":81}},{"type":"BODY","position":{"x":15,"y":54}},
    {"type":"FRAME","position":{"x":18,"y":80}},{"type":"INTERIOR","position":{"x":28,"y":34}},
    {"type":"BATTERY","position":{"x":22,"y":63}},{"type":"ELECTRONIC","position":{"x":36,"y":56}},
    {"type":"LIGHTS","position":{"x":12,"y":68}},{"type":"FIFTH_WHEEL","position":{"x":71,"y":58}},
    {"type":"COMPRESSOR","position":{"x":16,"y":70}},{"type":"ENGINE","position":{"x":23,"y":75}},
    {"type":"EXHAUST","position":{"x":64,"y":74}},{"type":"FUEL","position":{"x":72,"y":64}},
    {"type":"GEARBOX","position":{"x":36,"y":65}}]
  },
  [EEquipmentModel.RENAULT_RANGE_T_6x2]: {
    name: 'Renault Range T 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.RENAULT,
    image: RENAULT_RANGE_T_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":76}},{"type":"SUSPENSION","position":{"x":50,"y":65}},
            {"type":"WHEELS","position":{"x":58,"y":77}},{"type":"BODY","position":{"x":17,"y":52}},
            {"type":"FRAME","position":{"x":20,"y":78}},{"type":"INTERIOR","position":{"x":33,"y":38}},
            {"type":"BATTERY","position":{"x":12,"y":56}},{"type":"ELECTRONIC","position":{"x":33,"y":60}},
            {"type":"LIGHTS","position":{"x":12,"y":69}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":57}},
            {"type":"COMPRESSOR","position":{"x":18,"y":72}},{"type":"ENGINE","position":{"x":26,"y":71}},
            {"type":"EXHAUST","position":{"x":61,"y":74}},{"type":"FUEL","position":{"x":72,"y":69}},
            {"type":"GEARBOX","position":{"x":36,"y":66}}]
  },
  [EEquipmentModel.RENAULT_TRAFIC]: {
    name: 'Renault Trafic',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1H1,
    brand: EBrand.RENAULT,
    image: RENAULT_TRAFIC_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":70}},{"type":"SUSPENSION","position":{"x":62,"y":57}},
    {"type":"WHEELS","position":{"x":63,"y":69}},{"type":"BODY","position":{"x":70,"y":50}},
    {"type":"FRAME","position":{"x":76,"y":70}},{"type":"INTERIOR","position":{"x":45,"y":36}},
    {"type":"LIGHTS","position":{"x":47,"y":47}},{"type":"BATTERY","position":{"x":49,"y":39}},
    {"type":"ELECTRONIC","position":{"x":41,"y":41}},{"type":"DOORS","position":{"x":82,"y":47}},
    {"type":"LOAD","position":{"x":86,"y":63}},{"type":"ENGINE","position":{"x":23,"y":48}},
    {"type":"EXHAUST","position":{"x":71,"y":71}},{"type":"FUEL","position":{"x":80,"y":53}},
    {"type":"GEARBOX","position":{"x":25,"y":69}}]
  },
  [EEquipmentModel.SCANIA_G_DAYCAB_SEMI_4x2]: {
    name: 'Scania G PRT2 Daycab semi 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_G_DAYCAB_SEMI_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":78}},{"type":"SUSPENSION","position":{"x":58,"y":58}},
    {"type":"WHEELS","position":{"x":60,"y":73}},{"type":"BODY","position":{"x":47,"y":53}},
    {"type":"FRAME","position":{"x":45,"y":78}},{"type":"INTERIOR","position":{"x":38,"y":31}},
    {"type":"BATTERY","position":{"x":62,"y":55}},{"type":"ELECTRONIC","position":{"x":38,"y":46}},
    {"type":"LIGHTS","position":{"x":39,"y":65}},{"type":"FIFTH_WHEEL","position":{"x":71,"y":58}},
    {"type":"COMPRESSOR","position":{"x":9,"y":71}},{"type":"ENGINE","position":{"x":24,"y":60}},
    {"type":"EXHAUST","position":{"x":71,"y":70}},{"type":"FUEL","position":{"x":71,"y":65}},
    {"type":"GEARBOX","position":{"x":32,"y":73}}]
  },
  [EEquipmentModel.SCANIA_G_DAYCAB_SEMI_6x2]: {
    name: 'Scania G PRT2 Daycab semi 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_G_DAYCAB_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":77}},{"type":"SUSPENSION","position":{"x":56,"y":60}},
    {"type":"WHEELS","position":{"x":60,"y":70}},{"type":"BODY","position":{"x":54,"y":52}},
    {"type":"FRAME","position":{"x":42,"y":75}},{"type":"INTERIOR","position":{"x":35,"y":33}},
    {"type":"BATTERY","position":{"x":61,"y":54}},{"type":"ELECTRONIC","position":{"x":36,"y":50}},
    {"type":"LIGHTS","position":{"x":41,"y":64}},{"type":"FIFTH_WHEEL","position":{"x":68,"y":58}},
    {"type":"COMPRESSOR","position":{"x":10,"y":71}},{"type":"ENGINE","position":{"x":24,"y":63}},
    {"type":"EXHAUST","position":{"x":65,"y":74}},{"type":"FUEL","position":{"x":69,"y":67}},
    {"type":"GEARBOX","position":{"x":25,"y":76}}]
  },
  [EEquipmentModel.SCANIA_G_DAYCAB_TANDEM_4x2]: {
    name: 'Scania G PRT2 Daycab Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_G_DAYCAB_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":44,"y":72}},{"type":"SUSPENSION","position":{"x":52,"y":57}},
    {"type":"WHEELS","position":{"x":54,"y":67}},{"type":"BODY","position":{"x":40,"y":54}},
    {"type":"FRAME","position":{"x":41,"y":72}},{"type":"INTERIOR","position":{"x":35,"y":37}},
    {"type":"BATTERY","position":{"x":53,"y":52}},{"type":"ELECTRONIC","position":{"x":32,"y":49}},
    {"type":"LIGHTS","position":{"x":34,"y":62}},{"type":"LOAD","position":{"x":63,"y":60}},
    {"type":"COMPRESSOR","position":{"x":9,"y":69}},{"type":"ENGINE","position":{"x":21,"y":59}},
    {"type":"EXHAUST","position":{"x":58,"y":72}},{"type":"FUEL","position":{"x":63,"y":65}},
    {"type":"GEARBOX","position":{"x":25,"y":69}}]
  },
  [EEquipmentModel.SCANIA_G_DAYCAB_TANDEM_6x2]: {
    name: 'Scania G PRT2 Daycab Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_G_DAYCAB_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":75}},{"type":"SUSPENSION","position":{"x":53,"y":60}},
    {"type":"WHEELS","position":{"x":56,"y":72}},{"type":"BODY","position":{"x":39,"y":55}},
    {"type":"FRAME","position":{"x":43,"y":74}},{"type":"INTERIOR","position":{"x":30,"y":34}},
    {"type":"LIGHTS","position":{"x":36,"y":63}},{"type":"ELECTRONIC","position":{"x":32,"y":48}},
    {"type":"BATTERY","position":{"x":58,"y":54}},{"type":"LOAD","position":{"x":67,"y":60}},
    {"type":"COMPRESSOR","position":{"x":10,"y":70}},{"type":"ENGINE","position":{"x":23,"y":58}},
    {"type":"EXHAUST","position":{"x":63,"y":74}},{"type":"FUEL","position":{"x":65,"y":65}},
    {"type":"GEARBOX","position":{"x":25,"y":71}}]
  },
  [EEquipmentModel.SCANIA_G_DAYCAB_TANDEM_8x4]: {
    name: 'Scania G PRT2 Daycab Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_G_DAYCAB_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":71}},{"type":"SUSPENSION","position":{"x":51,"y":57}},
    {"type":"WHEELS","position":{"x":53,"y":68}},{"type":"BODY","position":{"x":37,"y":53}},
    {"type":"FRAME","position":{"x":40,"y":71}},{"type":"INTERIOR","position":{"x":27,"y":36}},
    {"type":"BATTERY","position":{"x":55,"y":53}},{"type":"ELECTRONIC","position":{"x":31,"y":49}},
    {"type":"LIGHTS","position":{"x":35,"y":63}},{"type":"LOAD","position":{"x":71,"y":60}},
    {"type":"COMPRESSOR","position":{"x":9,"y":69}},{"type":"ENGINE","position":{"x":21,"y":55}},
    {"type":"EXHAUST","position":{"x":59,"y":71}},{"type":"FUEL","position":{"x":59,"y":62}},
    {"type":"GEARBOX","position":{"x":23,"y":70}}]
  },
  [EEquipmentModel.SCANIA_G_SLEEPER_SEMI_4x2]: {
    name: 'Scania G PRT2 Sleeper semi 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_G_SLEEPER_SEMI_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":83}},{"type":"SUSPENSION","position":{"x":59,"y":66}},
    {"type":"WHEELS","position":{"x":61,"y":77}},{"type":"BODY","position":{"x":45,"y":56}},
    {"type":"FRAME","position":{"x":46,"y":82}},{"type":"INTERIOR","position":{"x":38,"y":37}},
    {"type":"BATTERY","position":{"x":67,"y":61}},{"type":"ELECTRONIC","position":{"x":39,"y":53}},
    {"type":"LIGHTS","position":{"x":39,"y":69}},{"type":"FIFTH_WHEEL","position":{"x":71,"y":64}},
    {"type":"COMPRESSOR","position":{"x":13,"y":75}},{"type":"ENGINE","position":{"x":27,"y":63}},
    {"type":"EXHAUST","position":{"x":67,"y":81}},{"type":"FUEL","position":{"x":71,"y":73}},
    {"type":"GEARBOX","position":{"x":25,"y":78}}]
  },
  [EEquipmentModel.SCANIA_G_SLEEPER_SEMI_6x2]: {
    name: 'Scania G PRT2 Sleeper semi 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_G_SLEEPER_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":84}},{"type":"SUSPENSION","position":{"x":56,"y":67}},
    {"type":"WHEELS","position":{"x":59,"y":79}},{"type":"BODY","position":{"x":45,"y":61}},
    {"type":"FRAME","position":{"x":44,"y":81}},{"type":"INTERIOR","position":{"x":33,"y":39}},
    {"type":"BATTERY","position":{"x":61,"y":59}},{"type":"ELECTRONIC","position":{"x":33,"y":54}},
    {"type":"LIGHTS","position":{"x":40,"y":69}},{"type":"FIFTH_WHEEL","position":{"x":70,"y":64}},
    {"type":"COMPRESSOR","position":{"x":10,"y":75}},{"type":"ENGINE","position":{"x":25,"y":63}},
    {"type":"EXHAUST","position":{"x":65,"y":79}},{"type":"FUEL","position":{"x":71,"y":74}},
    {"type":"GEARBOX","position":{"x":28,"y":79}}]
  },
  [EEquipmentModel.SCANIA_G_SLEEPER_TANDEM_4x2]: {
    name: 'Scania G PRT2 Sleeper Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_G_SLEEPER_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":76}},{"type":"SUSPENSION","position":{"x":50,"y":63}},
    {"type":"WHEELS","position":{"x":51,"y":72}},{"type":"BODY","position":{"x":39,"y":59}},
    {"type":"FRAME","position":{"x":42,"y":77}},{"type":"INTERIOR","position":{"x":33,"y":43}},
    {"type":"BATTERY","position":{"x":54,"y":59}},{"type":"ELECTRONIC","position":{"x":32,"y":55}},
    {"type":"LIGHTS","position":{"x":36,"y":67}},{"type":"LOAD","position":{"x":66,"y":65}},
    {"type":"COMPRESSOR","position":{"x":11,"y":72}},{"type":"ENGINE","position":{"x":19,"y":60}},
    {"type":"EXHAUST","position":{"x":60,"y":73}},{"type":"FUEL","position":{"x":61,"y":67}},
    {"type":"GEARBOX","position":{"x":24,"y":74}}]
  },
  [EEquipmentModel.SCANIA_G_SLEEPER_TANDEM_6x2]: {
    name: 'Scania G PRT2 Sleeper Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_G_SLEEPER_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":78}},{"type":"SUSPENSION","position":{"x":55,"y":65}},
    {"type":"WHEELS","position":{"x":57,"y":74}},{"type":"BODY","position":{"x":40,"y":59}},
    {"type":"FRAME","position":{"x":44,"y":79}},{"type":"INTERIOR","position":{"x":26,"y":42}},
    {"type":"BATTERY","position":{"x":60,"y":60}},{"type":"ELECTRONIC","position":{"x":32,"y":55}},
    {"type":"LIGHTS","position":{"x":37,"y":69}},{"type":"LOAD","position":{"x":67,"y":68}},
    {"type":"COMPRESSOR","position":{"x":10,"y":74}},{"type":"ENGINE","position":{"x":24,"y":62}},
    {"type":"EXHAUST","position":{"x":64,"y":78}},{"type":"FUEL","position":{"x":67,"y":72}},
    {"type":"GEARBOX","position":{"x":29,"y":77}}]
  },
  [EEquipmentModel.SCANIA_G_SLEEPER_TANDEM_8x4]: {
    name: 'Scania G PRT2 Sleeper Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_G_SLEEPER_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":78}},{"type":"SUSPENSION","position":{"x":53,"y":63}},
    {"type":"WHEELS","position":{"x":54,"y":74}},{"type":"BODY","position":{"x":38,"y":57}},
    {"type":"INTERIOR","position":{"x":24,"y":40}},{"type":"FRAME","position":{"x":42,"y":77}},
    {"type":"BATTERY","position":{"x":55,"y":59}},{"type":"ELECTRONIC","position":{"x":31,"y":53}},
    {"type":"LIGHTS","position":{"x":34,"y":68}},{"type":"LOAD","position":{"x":72,"y":66}},
    {"type":"COMPRESSOR","position":{"x":8,"y":73}},{"type":"ENGINE","position":{"x":21,"y":59}},
    {"type":"EXHAUST","position":{"x":60,"y":78}},{"type":"FUEL","position":{"x":62,"y":68}},
    {"type":"GEARBOX","position":{"x":26,"y":74}}]
  },
  [EEquipmentModel.SCANIA_L_SEMI_4x2]: {
    name: 'Scania L PRT2 semi 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2_small,
    brand: EBrand.SCANIA,
    image: SCANIA_L_SEMI_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":75}},{"type":"SUSPENSION","position":{"x":62,"y":63}},
    {"type":"WHEELS","position":{"x":63,"y":71}},{"type":"BODY","position":{"x":43,"y":60}},
    {"type":"FRAME","position":{"x":49,"y":75}},{"type":"INTERIOR","position":{"x":36,"y":42}},
    {"type":"LIGHTS","position":{"x":43,"y":69}},{"type":"ELECTRONIC","position":{"x":32,"y":56}},
    {"type":"BATTERY","position":{"x":65,"y":53}},{"type":"FIFTH_WHEEL","position":{"x":75,"y":59}},
    {"type":"COMPRESSOR","position":{"x":12,"y":69}},{"type":"ENGINE","position":{"x":24,"y":62}},
    {"type":"EXHAUST","position":{"x":72,"y":71}},{"type":"FUEL","position":{"x":76,"y":65}},
    {"type":"GEARBOX","position":{"x":25,"y":73}}]
  },
  [EEquipmentModel.SCANIA_L_SEMI_6x2]: {
    name: 'Scania L PRT2 semi 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_small,
    brand: EBrand.SCANIA,
    image: SCANIA_L_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":76}},{"type":"SUSPENSION","position":{"x":59,"y":60}},
    {"type":"WHEELS","position":{"x":63,"y":71}},{"type":"BODY","position":{"x":42,"y":58}},
    {"type":"FRAME","position":{"x":44,"y":73}},{"type":"INTERIOR","position":{"x":33,"y":42}},
    {"type":"BATTERY","position":{"x":62,"y":54}},{"type":"ELECTRONIC","position":{"x":38,"y":57}},
    {"type":"LIGHTS","position":{"x":39,"y":68}},{"type":"FIFTH_WHEEL","position":{"x":70,"y":58}},
    {"type":"COMPRESSOR","position":{"x":11,"y":66}},{"type":"ENGINE","position":{"x":22,"y":61}},
    {"type":"EXHAUST","position":{"x":68,"y":75}},{"type":"FUEL","position":{"x":74,"y":68}},
    {"type":"GEARBOX","position":{"x":27,"y":71}}]
  },
  [EEquipmentModel.SCANIA_L_TANDEM_4x2]: {
    name: 'Scania L PRT2 Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.SCANIA,
    image: SCANIA_L_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":70}},{"type":"SUSPENSION","position":{"x":53,"y":58}},
    {"type":"WHEELS","position":{"x":54,"y":68}},{"type":"BODY","position":{"x":35,"y":56}},
    {"type":"FRAME","position":{"x":41,"y":71}},{"type":"INTERIOR","position":{"x":29,"y":44}},
    {"type":"BATTERY","position":{"x":54,"y":51}},{"type":"ELECTRONIC","position":{"x":32,"y":55}},
    {"type":"LIGHTS","position":{"x":33,"y":67}},{"type":"LOAD","position":{"x":65,"y":60}},
    {"type":"COMPRESSOR","position":{"x":9,"y":66}},{"type":"ENGINE","position":{"x":20,"y":59}},
    {"type":"EXHAUST","position":{"x":60,"y":69}},{"type":"FUEL","position":{"x":62,"y":64}},
    {"type":"GEARBOX","position":{"x":24,"y":67}}]
  },
  [EEquipmentModel.SCANIA_L_TANDEM_6x2]: {
    name: 'Scania L PRT2 Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2_small,
    brand: EBrand.SCANIA,
    image: SCANIA_L_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":70}},{"type":"SUSPENSION","position":{"x":58,"y":57}},
    {"type":"WHEELS","position":{"x":60,"y":70}},{"type":"BODY","position":{"x":39,"y":57}},
    {"type":"FRAME","position":{"x":41,"y":71}},{"type":"INTERIOR","position":{"x":28,"y":44}},
    {"type":"BATTERY","position":{"x":58,"y":51}},{"type":"ELECTRONIC","position":{"x":33,"y":53}},
    {"type":"LIGHTS","position":{"x":36,"y":67}},{"type":"LOAD","position":{"x":72,"y":61}},
    {"type":"COMPRESSOR","position":{"x":10,"y":67}},{"type":"ENGINE","position":{"x":18,"y":60}},
    {"type":"EXHAUST","position":{"x":64,"y":70}},{"type":"FUEL","position":{"x":66,"y":63}},
    {"type":"GEARBOX","position":{"x":24,"y":69}}]
  },
  [EEquipmentModel.SCANIA_OR_G_DAYCAB_SEMI_6x2]: {
    name: 'Scania G PRT2 semi Daycab Offroad 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_G_DAYCAB_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":76}},{"type":"SUSPENSION","position":{"x":58,"y":59}},
    {"type":"WHEELS","position":{"x":59,"y":74}},{"type":"BODY","position":{"x":44,"y":52}},
    {"type":"INTERIOR","position":{"x":33,"y":34}},{"type":"FRAME","position":{"x":44,"y":71}},
    {"type":"BATTERY","position":{"x":61,"y":53}},{"type":"ELECTRONIC","position":{"x":37,"y":47}},
    {"type":"LIGHTS","position":{"x":40,"y":62}},{"type":"FIFTH_WHEEL","position":{"x":69,"y":58}},
    {"type":"COMPRESSOR","position":{"x":11,"y":70}},{"type":"ENGINE","position":{"x":24,"y":59}},
    {"type":"EXHAUST","position":{"x":65,"y":72}},{"type":"FUEL","position":{"x":71,"y":69}},
    {"type":"GEARBOX","position":{"x":26,"y":71}}]
  },
  [EEquipmentModel.SCANIA_OR_G_DAYCAB_TANDEM_6x2]: {
    name: 'Scania G PRT2 Daycab Offroad Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_G_DAYCAB_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":73}},{"type":"SUSPENSION","position":{"x":54,"y":59}},
    {"type":"WHEELS","position":{"x":56,"y":70}},{"type":"BODY","position":{"x":40,"y":51}},
    {"type":"FRAME","position":{"x":41,"y":70}},{"type":"INTERIOR","position":{"x":25,"y":32}},
    {"type":"BATTERY","position":{"x":57,"y":49}},{"type":"ELECTRONIC","position":{"x":32,"y":48}},
    {"type":"LIGHTS","position":{"x":38,"y":60}},{"type":"LOAD","position":{"x":74,"y":59}},
    {"type":"COMPRESSOR","position":{"x":12,"y":68}},{"type":"ENGINE","position":{"x":21,"y":58}},
    {"type":"EXHAUST","position":{"x":64,"y":72}},{"type":"FUEL","position":{"x":66,"y":63}},
    {"type":"GEARBOX","position":{"x":26,"y":69}}]
  },
  [EEquipmentModel.SCANIA_OR_G_DAYCAB_TANDEM_8x4]: {
    name: 'Scania G PRT2 Daycab Offroad Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_G_DAYCAB_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":71}},{"type":"SUSPENSION","position":{"x":53,"y":58}},
    {"type":"WHEELS","position":{"x":54,"y":67}},{"type":"BODY","position":{"x":39,"y":52}},
    {"type":"FRAME","position":{"x":41,"y":69}},{"type":"INTERIOR","position":{"x":29,"y":36}},
    {"type":"LIGHTS","position":{"x":36,"y":62}},{"type":"ELECTRONIC","position":{"x":31,"y":46}},
    {"type":"BATTERY","position":{"x":55,"y":53}},{"type":"LOAD","position":{"x":72,"y":58}},
    {"type":"COMPRESSOR","position":{"x":10,"y":68}},{"type":"ENGINE","position":{"x":23,"y":57}},
    {"type":"EXHAUST","position":{"x":61,"y":69}},{"type":"FUEL","position":{"x":75,"y":65}},
    {"type":"GEARBOX","position":{"x":26,"y":68}}]
  },
  [EEquipmentModel.SCANIA_OR_G_SLEEPER_SEMI_6x2]: {
    name: 'Scania G PRT2 semi Sleeper Offroad 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_G_SLEEPER_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":81}},{"type":"SUSPENSION","position":{"x":59,"y":64}},
    {"type":"WHEELS","position":{"x":58,"y":74}},{"type":"BODY","position":{"x":46,"y":58}},
    {"type":"FRAME","position":{"x":45,"y":77}},{"type":"INTERIOR","position":{"x":36,"y":41}},
    {"type":"LIGHTS","position":{"x":41,"y":66}},{"type":"ELECTRONIC","position":{"x":38,"y":52}},
    {"type":"BATTERY","position":{"x":62,"y":58}},{"type":"FIFTH_WHEEL","position":{"x":68,"y":63}},
    {"type":"COMPRESSOR","position":{"x":11,"y":74}},{"type":"ENGINE","position":{"x":25,"y":63}},
    {"type":"EXHAUST","position":{"x":66,"y":79}},{"type":"FUEL","position":{"x":70,"y":74}},
    {"type":"GEARBOX","position":{"x":28,"y":75}}]
  },
  [EEquipmentModel.SCANIA_OR_G_SLEEPER_TANDEM_6x2]: {
    name: 'Scania G PRT2 Sleeper Offroad Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_G_SLEEPER_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":78}},{"type":"SUSPENSION","position":{"x":55,"y":64}},
    {"type":"WHEELS","position":{"x":57,"y":77}},{"type":"BODY","position":{"x":40,"y":59}},
    {"type":"FRAME","position":{"x":42,"y":75}},{"type":"INTERIOR","position":{"x":25,"y":38}},
    {"type":"BATTERY","position":{"x":60,"y":57}},{"type":"ELECTRONIC","position":{"x":33,"y":54}},
    {"type":"LIGHTS","position":{"x":38,"y":69}},{"type":"LOAD","position":{"x":71,"y":64}},
    {"type":"COMPRESSOR","position":{"x":12,"y":74}},{"type":"ENGINE","position":{"x":21,"y":60}},
    {"type":"EXHAUST","position":{"x":64,"y":77}},{"type":"FUEL","position":{"x":65,"y":70}},
    {"type":"GEARBOX","position":{"x":23,"y":75}}]
  },
  [EEquipmentModel.SCANIA_OR_G_SLEEPER_TANDEM_8x4]: {
    name: 'Scania G PRT2 Sleeper Offroad Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_G_SLEEPER_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":44,"y":75}},{"type":"SUSPENSION","position":{"x":52,"y":62}},
    {"type":"WHEELS","position":{"x":53,"y":73}},{"type":"BODY","position":{"x":40,"y":57}},
    {"type":"FRAME","position":{"x":41,"y":75}},{"type":"INTERIOR","position":{"x":24,"y":38}},
    {"type":"BATTERY","position":{"x":57,"y":56}},{"type":"ELECTRONIC","position":{"x":33,"y":55}},
    {"type":"LIGHTS","position":{"x":35,"y":66}},{"type":"LOAD","position":{"x":70,"y":63}},
    {"type":"COMPRESSOR","position":{"x":10,"y":73}},{"type":"ENGINE","position":{"x":22,"y":61}},
    {"type":"EXHAUST","position":{"x":60,"y":73}},{"type":"FUEL","position":{"x":72,"y":69}},
    {"type":"GEARBOX","position":{"x":26,"y":73}}]
  },
  [EEquipmentModel.SCANIA_OR_P_DAYCAB_SEMI_6x2]: {
    name: 'Scania P PRT2 semi Daycab Offroad 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_P_DAYCAB_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":75}},{"type":"SUSPENSION","position":{"x":58,"y":57}},
    {"type":"WHEELS","position":{"x":59,"y":71}},{"type":"BODY","position":{"x":41,"y":51}},
    {"type":"FRAME","position":{"x":44,"y":71}},{"type":"INTERIOR","position":{"x":37,"y":34}},
    {"type":"BATTERY","position":{"x":62,"y":50}},{"type":"ELECTRONIC","position":{"x":34,"y":50}},
    {"type":"LIGHTS","position":{"x":38,"y":63}},{"type":"FIFTH_WHEEL","position":{"x":69,"y":56}},
    {"type":"COMPRESSOR","position":{"x":10,"y":68}},{"type":"ENGINE","position":{"x":22,"y":58}},
    {"type":"EXHAUST","position":{"x":65,"y":74}},{"type":"FUEL","position":{"x":69,"y":68}},
    {"type":"GEARBOX","position":{"x":29,"y":69}}]
  },
  [EEquipmentModel.SCANIA_OR_P_DAYCAB_TANDEM_6x2]: {
    name: 'Scania P PRT2 Daycab Offroad Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_P_DAYCAB_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":71}},{"type":"SUSPENSION","position":{"x":53,"y":57}},
    {"type":"WHEELS","position":{"x":58,"y":70}},{"type":"BODY","position":{"x":42,"y":50}},
    {"type":"FRAME","position":{"x":44,"y":69}},{"type":"INTERIOR","position":{"x":23,"y":36}},
    {"type":"BATTERY","position":{"x":57,"y":52}},{"type":"ELECTRONIC","position":{"x":35,"y":48}},
    {"type":"LIGHTS","position":{"x":38,"y":60}},{"type":"LOAD","position":{"x":74,"y":58}},
    {"type":"COMPRESSOR","position":{"x":11,"y":68}},{"type":"ENGINE","position":{"x":22,"y":56}},
    {"type":"EXHAUST","position":{"x":63,"y":71}},{"type":"FUEL","position":{"x":67,"y":63}},
    {"type":"GEARBOX","position":{"x":27,"y":68}}]
  },
  [EEquipmentModel.SCANIA_OR_P_DAYCAB_TANDEM_8x4]: {
    name: 'Scania P PRT2 Daycab Offroad Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_P_DAYCAB_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":67}},{"type":"SUSPENSION","position":{"x":52,"y":58}},
    {"type":"WHEELS","position":{"x":55,"y":64}},{"type":"BODY","position":{"x":36,"y":51}},
    {"type":"FRAME","position":{"x":39,"y":67}},{"type":"INTERIOR","position":{"x":19,"y":36}},
    {"type":"BATTERY","position":{"x":55,"y":51}},{"type":"ELECTRONIC","position":{"x":31,"y":49}},
    {"type":"LIGHTS","position":{"x":35,"y":61}},{"type":"LOAD","position":{"x":70,"y":58}},
    {"type":"COMPRESSOR","position":{"x":10,"y":66}},{"type":"ENGINE","position":{"x":21,"y":55}},
    {"type":"EXHAUST","position":{"x":59,"y":69}},{"type":"FUEL","position":{"x":71,"y":64}},
    {"type":"GEARBOX","position":{"x":26,"y":65}}]
  },
  [EEquipmentModel.SCANIA_OR_P_SLEEPER_SEMI_6x2]: {
    name: 'Scania P PRT2 semi Sleeper Offroad 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_P_SLEEPER_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":80}},{"type":"SUSPENSION","position":{"x":59,"y":61}},
    {"type":"WHEELS","position":{"x":55,"y":74}},{"type":"BODY","position":{"x":41,"y":55}},
    {"type":"FRAME","position":{"x":42,"y":76}},{"type":"INTERIOR","position":{"x":38,"y":38}},
    {"type":"LIGHTS","position":{"x":40,"y":66}},{"type":"BATTERY","position":{"x":64,"y":59}},
    {"type":"ELECTRONIC","position":{"x":37,"y":53}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":61}},
    {"type":"COMPRESSOR","position":{"x":11,"y":73}},{"type":"ENGINE","position":{"x":24,"y":65}},
    {"type":"EXHAUST","position":{"x":62,"y":78}},{"type":"FUEL","position":{"x":71,"y":70}},
    {"type":"GEARBOX","position":{"x":23,"y":73}}]
  },
  [EEquipmentModel.SCANIA_OR_P_SLEEPER_TANDEM_6x2]: {
    name: 'Scania P PRT2 Sleeper Offroad Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_P_SLEEPER_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":76}},{"type":"SUSPENSION","position":{"x":53,"y":64}},
    {"type":"WHEELS","position":{"x":58,"y":75}},{"type":"BODY","position":{"x":39,"y":57}},
    {"type":"FRAME","position":{"x":41,"y":74}},{"type":"INTERIOR","position":{"x":19,"y":41}},
    {"type":"BATTERY","position":{"x":59,"y":59}},{"type":"ELECTRONIC","position":{"x":34,"y":54}},
    {"type":"LIGHTS","position":{"x":38,"y":67}},{"type":"LOAD","position":{"x":73,"y":63}},
    {"type":"COMPRESSOR","position":{"x":13,"y":72}},{"type":"ENGINE","position":{"x":24,"y":63}},
    {"type":"EXHAUST","position":{"x":61,"y":76}},{"type":"FUEL","position":{"x":65,"y":71}},
    {"type":"GEARBOX","position":{"x":27,"y":74}}]
  },
  [EEquipmentModel.SCANIA_OR_P_SLEEPER_TANDEM_8x4]: {
    name: 'Scania P PRT2 Sleeper Offroad Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_P_SLEEPER_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":76}},{"type":"SUSPENSION","position":{"x":52,"y":62}},
    {"type":"WHEELS","position":{"x":54,"y":73}},{"type":"BODY","position":{"x":35,"y":53}},
    {"type":"FRAME","position":{"x":40,"y":73}},{"type":"INTERIOR","position":{"x":23,"y":43}},
    {"type":"LIGHTS","position":{"x":34,"y":64}},{"type":"ELECTRONIC","position":{"x":32,"y":55}},
    {"type":"BATTERY","position":{"x":59,"y":58}},{"type":"LOAD","position":{"x":73,"y":62}},
    {"type":"COMPRESSOR","position":{"x":11,"y":72}},{"type":"ENGINE","position":{"x":23,"y":60}},
    {"type":"EXHAUST","position":{"x":59,"y":74}},{"type":"FUEL","position":{"x":73,"y":69}},
    {"type":"GEARBOX","position":{"x":27,"y":71}}]
  },
  [EEquipmentModel.SCANIA_OR_R_DAYCAB_SEMI_6x2]: {
    name: 'Scania R PRT2 semi Daycab Offroad 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_R_DAYCAB_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":75}},{"type":"SUSPENSION","position":{"x":56,"y":60}},
    {"type":"WHEELS","position":{"x":60,"y":71}},{"type":"BODY","position":{"x":41,"y":53}},
    {"type":"FRAME","position":{"x":43,"y":73}},{"type":"INTERIOR","position":{"x":28,"y":32}},
    {"type":"BATTERY","position":{"x":61,"y":56}},{"type":"ELECTRONIC","position":{"x":33,"y":46}},
    {"type":"LIGHTS","position":{"x":41,"y":66}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":59}},
    {"type":"COMPRESSOR","position":{"x":12,"y":71}},{"type":"ENGINE","position":{"x":20,"y":59}},
    {"type":"EXHAUST","position":{"x":67,"y":74}},{"type":"FUEL","position":{"x":71,"y":68}},
    {"type":"GEARBOX","position":{"x":30,"y":70}}]
  },
  [EEquipmentModel.SCANIA_OR_R_DAYCAB_TANDEM_6x2]: {
    name: 'Scania R PRT2 Daycab Offroad Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_R_DAYCAB_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":73}},{"type":"SUSPENSION","position":{"x":57,"y":60}},
    {"type":"WHEELS","position":{"x":54,"y":71}},{"type":"BODY","position":{"x":40,"y":56}},
    {"type":"INTERIOR","position":{"x":24,"y":32}},{"type":"FRAME","position":{"x":41,"y":72}},
    {"type":"BATTERY","position":{"x":58,"y":53}},{"type":"ELECTRONIC","position":{"x":33,"y":47}},
    {"type":"LIGHTS","position":{"x":38,"y":64}},{"type":"LOAD","position":{"x":71,"y":61}},
    {"type":"ENGINE","position":{"x":22,"y":55}},{"type":"EXHAUST","position":{"x":62,"y":73}},
    {"type":"FUEL","position":{"x":68,"y":65}},{"type":"GEARBOX","position":{"x":25,"y":69}},
    {"type":"COMPRESSOR","position":{"x":12,"y":70}}]
  },
  [EEquipmentModel.SCANIA_OR_R_DAYCAB_TANDEM_8x4]: {
    name: 'Scania R PRT2 Daycab Offroad Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_R_DAYCAB_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":71}},{"type":"SUSPENSION","position":{"x":51,"y":60}},
    {"type":"WHEELS","position":{"x":52,"y":67}},{"type":"BODY","position":{"x":37,"y":53}},
    {"type":"FRAME","position":{"x":42,"y":70}},{"type":"INTERIOR","position":{"x":20,"y":32}},
    {"type":"BATTERY","position":{"x":55,"y":53}},{"type":"ELECTRONIC","position":{"x":31,"y":46}},
    {"type":"LIGHTS","position":{"x":35,"y":62}},{"type":"LOAD","position":{"x":66,"y":60}},
    {"type":"COMPRESSOR","position":{"x":10,"y":69}},{"type":"ENGINE","position":{"x":18,"y":58}},
    {"type":"EXHAUST","position":{"x":59,"y":71}},{"type":"FUEL","position":{"x":74,"y":63}},
    {"type":"GEARBOX","position":{"x":26,"y":69}}]
  },
  [EEquipmentModel.SCANIA_OR_R_SLEEPER_SEMI_6x2]: {
    name: 'Scania R PRT2 semi Sleeper Offroad 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_R_SLEEPER_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":81}},{"type":"SUSPENSION","position":{"x":54,"y":65}},
    {"type":"WHEELS","position":{"x":58,"y":76}},{"type":"BODY","position":{"x":44,"y":60}},
    {"type":"FRAME","position":{"x":42,"y":74}},{"type":"INTERIOR","position":{"x":38,"y":36}},
    {"type":"BATTERY","position":{"x":62,"y":58}},{"type":"ELECTRONIC","position":{"x":35,"y":53}},
    {"type":"LIGHTS","position":{"x":40,"y":69}},{"type":"FIFTH_WHEEL","position":{"x":68,"y":65}},
    {"type":"COMPRESSOR","position":{"x":12,"y":76}},{"type":"ENGINE","position":{"x":24,"y":62}},
    {"type":"EXHAUST","position":{"x":64,"y":79}},{"type":"FUEL","position":{"x":69,"y":74}},
    {"type":"GEARBOX","position":{"x":28,"y":76}}]
  },
  [EEquipmentModel.SCANIA_OR_R_SLEEPER_TANDEM_6x2]: {
    name: 'Scania R PRT2 Sleeper Offroad Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_R_SLEEPER_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":77}},{"type":"SUSPENSION","position":{"x":53,"y":66}},
    {"type":"WHEELS","position":{"x":56,"y":77}},{"type":"BODY","position":{"x":39,"y":60}},
    {"type":"FRAME","position":{"x":40,"y":77}},{"type":"INTERIOR","position":{"x":23,"y":38}},
    {"type":"BATTERY","position":{"x":59,"y":58}},{"type":"ELECTRONIC","position":{"x":36,"y":49}},
    {"type":"LIGHTS","position":{"x":38,"y":68}},{"type":"LOAD","position":{"x":72,"y":66}},
    {"type":"COMPRESSOR","position":{"x":11,"y":74}},{"type":"ENGINE","position":{"x":23,"y":63}},
    {"type":"FUEL","position":{"x":66,"y":73}},{"type":"EXHAUST","position":{"x":64,"y":77}},
    {"type":"GEARBOX","position":{"x":27,"y":75}}]
  },
  [EEquipmentModel.SCANIA_OR_R_SLEEPER_TANDEM_8x4]: {
    name: 'Scania R PRT2 Sleeper Offroad Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_R_SLEEPER_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":77}},{"type":"SUSPENSION","position":{"x":52,"y":65}},
    {"type":"WHEELS","position":{"x":53,"y":77}},{"type":"BODY","position":{"x":40,"y":59}},
    {"type":"FRAME","position":{"x":41,"y":76}},{"type":"INTERIOR","position":{"x":22,"y":37}},
    {"type":"LIGHTS","position":{"x":35,"y":69}},{"type":"ELECTRONIC","position":{"x":30,"y":53}},
    {"type":"BATTERY","position":{"x":57,"y":59}},{"type":"LOAD","position":{"x":68,"y":65}},
    {"type":"COMPRESSOR","position":{"x":10,"y":73}},{"type":"EXHAUST","position":{"x":59,"y":74}},
    {"type":"FUEL","position":{"x":73,"y":69}},{"type":"GEARBOX","position":{"x":25,"y":76}},
    {"type":"ENGINE","position":{"x":23,"y":62}}]
  },
  [EEquipmentModel.SCANIA_OR_S_SEMI_6x2]: {
    name: 'Scania S PRT2 semi Sleeper Offroad 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_S_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":81}},{"type":"SUSPENSION","position":{"x":56,"y":69}},
    {"type":"WHEELS","position":{"x":57,"y":78}},{"type":"BODY","position":{"x":42,"y":58}},
    {"type":"FRAME","position":{"x":44,"y":77}},{"type":"INTERIOR","position":{"x":38,"y":37}},
    {"type":"LIGHTS","position":{"x":40,"y":68}},{"type":"ELECTRONIC","position":{"x":37,"y":48}},
    {"type":"BATTERY","position":{"x":61,"y":61}},{"type":"FIFTH_WHEEL","position":{"x":70,"y":65}},
    {"type":"COMPRESSOR","position":{"x":15,"y":76}},{"type":"ENGINE","position":{"x":25,"y":65}},
    {"type":"EXHAUST","position":{"x":64,"y":77}},{"type":"FUEL","position":{"x":66,"y":74}},
    {"type":"GEARBOX","position":{"x":28,"y":74}}]
  },
  [EEquipmentModel.SCANIA_OR_S_TANDEM_6x2]: {
    name: 'Scania S PRT2 Sleeper Offroad Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_S_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":78}},{"type":"SUSPENSION","position":{"x":55,"y":66}},
    {"type":"WHEELS","position":{"x":56,"y":77}},{"type":"BODY","position":{"x":39,"y":62}},
    {"type":"FRAME","position":{"x":43,"y":77}},{"type":"INTERIOR","position":{"x":25,"y":37}},
    {"type":"LIGHTS","position":{"x":38,"y":70}},{"type":"BATTERY","position":{"x":59,"y":58}},
    {"type":"ELECTRONIC","position":{"x":35,"y":47}},{"type":"LOAD","position":{"x":69,"y":67}},
    {"type":"COMPRESSOR","position":{"x":12,"y":75}},{"type":"ENGINE","position":{"x":28,"y":66}},
    {"type":"EXHAUST","position":{"x":61,"y":79}},{"type":"FUEL","position":{"x":66,"y":77}},
    {"type":"GEARBOX","position":{"x":29,"y":76}}]
  },
  [EEquipmentModel.SCANIA_OR_S_TANDEM_8x4]: {
    name: 'Scania S PRT2 Sleeper Offroad Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_OR_S_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":76}},{"type":"SUSPENSION","position":{"x":52,"y":67}},
    {"type":"WHEELS","position":{"x":53,"y":76}},{"type":"BODY","position":{"x":37,"y":63}},
    {"type":"INTERIOR","position":{"x":23,"y":37}},{"type":"FRAME","position":{"x":39,"y":77}},
    {"type":"BATTERY","position":{"x":57,"y":61}},{"type":"ELECTRONIC","position":{"x":35,"y":48}},
    {"type":"LIGHTS","position":{"x":35,"y":69}},{"type":"LOAD","position":{"x":69,"y":67}},
    {"type":"COMPRESSOR","position":{"x":9,"y":74}},{"type":"ENGINE","position":{"x":19,"y":63}},
    {"type":"EXHAUST","position":{"x":61,"y":80}},{"type":"FUEL","position":{"x":71,"y":72}},
    {"type":"GEARBOX","position":{"x":27,"y":74}}]
  },
  [EEquipmentModel.SCANIA_P_DAYCAB_SEMI_4x2]: {
    name: 'Scania P PRT2 Daycab semi 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_P_DAYCAB_SEMI_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":76}},{"type":"SUSPENSION","position":{"x":63,"y":58}},
    {"type":"WHEELS","position":{"x":60,"y":70}},{"type":"BODY","position":{"x":42,"y":54}},
    {"type":"FRAME","position":{"x":44,"y":75}},{"type":"INTERIOR","position":{"x":34,"y":36}},
    {"type":"LIGHTS","position":{"x":41,"y":63}},{"type":"BATTERY","position":{"x":64,"y":52}},
    {"type":"ELECTRONIC","position":{"x":38,"y":51}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":58}},
    {"type":"COMPRESSOR","position":{"x":12,"y":72}},{"type":"ENGINE","position":{"x":21,"y":62}},
    {"type":"EXHAUST","position":{"x":67,"y":75}},{"type":"FUEL","position":{"x":71,"y":67}},
    {"type":"GEARBOX","position":{"x":24,"y":76}}]
  },
  [EEquipmentModel.SCANIA_P_DAYCAB_SEMI_6x2]: {
    name: 'Scania P PRT2 Daycab semi 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_P_DAYCAB_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":73}},{"type":"SUSPENSION","position":{"x":58,"y":60}},
    {"type":"WHEELS","position":{"x":59,"y":70}},{"type":"BODY","position":{"x":42,"y":55}},
    {"type":"FRAME","position":{"x":43,"y":76}},{"type":"INTERIOR","position":{"x":33,"y":34}},
    {"type":"LIGHTS","position":{"x":37,"y":64}},{"type":"ELECTRONIC","position":{"x":36,"y":51}},
    {"type":"BATTERY","position":{"x":58,"y":53}},{"type":"FIFTH_WHEEL","position":{"x":67,"y":58}},
    {"type":"COMPRESSOR","position":{"x":9,"y":71}},{"type":"ENGINE","position":{"x":25,"y":59}},
    {"type":"EXHAUST","position":{"x":63,"y":74}},{"type":"FUEL","position":{"x":70,"y":69}},
    {"type":"GEARBOX","position":{"x":27,"y":73}}]
  },
  [EEquipmentModel.SCANIA_P_DAYCAB_TANDEM_4x2]: {
    name: 'Scania P PRT2 Daycab Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_P_DAYCAB_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":68}},{"type":"SUSPENSION","position":{"x":51,"y":58}},
    {"type":"WHEELS","position":{"x":54,"y":67}},{"type":"BODY","position":{"x":33,"y":57}},
    {"type":"FRAME","position":{"x":41,"y":70}},{"type":"INTERIOR","position":{"x":21,"y":38}},
    {"type":"BATTERY","position":{"x":55,"y":52}},{"type":"ELECTRONIC","position":{"x":33,"y":50}},
    {"type":"LIGHTS","position":{"x":33,"y":63}},{"type":"LOAD","position":{"x":69,"y":59}},
    {"type":"COMPRESSOR","position":{"x":12,"y":68}},{"type":"ENGINE","position":{"x":22,"y":59}},
    {"type":"EXHAUST","position":{"x":59,"y":70}},{"type":"FUEL","position":{"x":63,"y":61}},
    {"type":"GEARBOX","position":{"x":24,"y":67}}]
  },
  [EEquipmentModel.SCANIA_P_DAYCAB_TANDEM_6x2]: {
    name: 'Scania P PRT2 Daycab Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_P_DAYCAB_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":70}},{"type":"SUSPENSION","position":{"x":56,"y":57}},
    {"type":"WHEELS","position":{"x":57,"y":68}},{"type":"BODY","position":{"x":39,"y":55}},
    {"type":"FRAME","position":{"x":40,"y":71}},{"type":"INTERIOR","position":{"x":27,"y":38}},
    {"type":"BATTERY","position":{"x":59,"y":53}},{"type":"ELECTRONIC","position":{"x":31,"y":51}},
    {"type":"LIGHTS","position":{"x":35,"y":63}},{"type":"LOAD","position":{"x":69,"y":58}},
    {"type":"COMPRESSOR","position":{"x":9,"y":70}},{"type":"ENGINE","position":{"x":20,"y":59}},
    {"type":"EXHAUST","position":{"x":64,"y":71}},{"type":"FUEL","position":{"x":64,"y":66}},
    {"type":"GEARBOX","position":{"x":29,"y":73}}]
  },
  [EEquipmentModel.SCANIA_P_DAYCAB_TANDEM_8x4]: {
    name: 'Scania P PRT2 Daycab Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_P_DAYCAB_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":70}},{"type":"SUSPENSION","position":{"x":51,"y":59}},
    {"type":"WHEELS","position":{"x":52,"y":66}},{"type":"BODY","position":{"x":34,"y":57}},
    {"type":"FRAME","position":{"x":41,"y":69}},{"type":"INTERIOR","position":{"x":23,"y":35}},
    {"type":"LIGHTS","position":{"x":36,"y":61}},{"type":"ELECTRONIC","position":{"x":34,"y":49}},
    {"type":"BATTERY","position":{"x":55,"y":52}},{"type":"LOAD","position":{"x":69,"y":58}},
    {"type":"COMPRESSOR","position":{"x":11,"y":67}},{"type":"ENGINE","position":{"x":23,"y":58}},
    {"type":"EXHAUST","position":{"x":60,"y":70}},{"type":"FUEL","position":{"x":73,"y":63}},
    {"type":"GEARBOX","position":{"x":22,"y":69}}]
  },
  [EEquipmentModel.SCANIA_P_SLEEPER_SEMI_4x2]: {
    name: 'Scania P PRT2 Sleeper semi 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_P_SLEEPER_SEMI_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":82}},{"type":"SUSPENSION","position":{"x":59,"y":66}},
    {"type":"WHEELS","position":{"x":63,"y":76}},{"type":"BODY","position":{"x":45,"y":57}},
    {"type":"FRAME","position":{"x":44,"y":81}},{"type":"INTERIOR","position":{"x":36,"y":41}},
    {"type":"BATTERY","position":{"x":65,"y":60}},{"type":"ELECTRONIC","position":{"x":35,"y":57}},
    {"type":"LIGHTS","position":{"x":40,"y":69}},{"type":"FIFTH_WHEEL","position":{"x":75,"y":65}},
    {"type":"COMPRESSOR","position":{"x":10,"y":77}},{"type":"ENGINE","position":{"x":22,"y":62}},
    {"type":"EXHAUST","position":{"x":67,"y":79}},{"type":"FUEL","position":{"x":69,"y":72}},
    {"type":"GEARBOX","position":{"x":23,"y":80}}]
  },
  [EEquipmentModel.SCANIA_P_SLEEPER_SEMI_6x2]: {
    name: 'Scania P PRT2 Sleeper semi 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_P_SLEEPER_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":82}},{"type":"SUSPENSION","position":{"x":58,"y":64}},
    {"type":"WHEELS","position":{"x":59,"y":76}},{"type":"BODY","position":{"x":45,"y":56}},
    {"type":"FRAME","position":{"x":44,"y":79}},{"type":"INTERIOR","position":{"x":35,"y":37}},
    {"type":"LIGHTS","position":{"x":41,"y":66}},{"type":"ELECTRONIC","position":{"x":38,"y":53}},
    {"type":"BATTERY","position":{"x":63,"y":60}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":63}},
    {"type":"COMPRESSOR","position":{"x":12,"y":76}},{"type":"ENGINE","position":{"x":25,"y":64}},
    {"type":"EXHAUST","position":{"x":66,"y":78}},{"type":"FUEL","position":{"x":68,"y":71}},
    {"type":"GEARBOX","position":{"x":30,"y":78}}]
  },
  [EEquipmentModel.SCANIA_P_SLEEPER_TANDEM_4x2]: {
    name: 'Scania P PRT2 Sleeper Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_P_SLEEPER_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":73}},{"type":"SUSPENSION","position":{"x":49,"y":63}},
    {"type":"WHEELS","position":{"x":51,"y":70}},{"type":"BODY","position":{"x":35,"y":58}},
    {"type":"FRAME","position":{"x":38,"y":76}},{"type":"INTERIOR","position":{"x":20,"y":40}},
    {"type":"BATTERY","position":{"x":55,"y":57}},{"type":"ELECTRONIC","position":{"x":31,"y":53}},
    {"type":"LIGHTS","position":{"x":35,"y":66}},{"type":"LOAD","position":{"x":66,"y":63}},
    {"type":"COMPRESSOR","position":{"x":10,"y":73}},{"type":"ENGINE","position":{"x":22,"y":62}},
    {"type":"EXHAUST","position":{"x":57,"y":77}},{"type":"FUEL","position":{"x":61,"y":68}},
    {"type":"GEARBOX","position":{"x":26,"y":73}}]
  },
  [EEquipmentModel.SCANIA_P_SLEEPER_TANDEM_6x2]: {
    name: 'Scania P PRT2 Sleeper Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_P_SLEEPER_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":76}},{"type":"SUSPENSION","position":{"x":55,"y":63}},
    {"type":"WHEELS","position":{"x":56,"y":72}},{"type":"BODY","position":{"x":38,"y":61}},
    {"type":"INTERIOR","position":{"x":22,"y":41}},{"type":"FRAME","position":{"x":39,"y":77}},
    {"type":"BATTERY","position":{"x":60,"y":60}},{"type":"ELECTRONIC","position":{"x":33,"y":54}},
    {"type":"LIGHTS","position":{"x":35,"y":67}},{"type":"LOAD","position":{"x":70,"y":66}},
    {"type":"COMPRESSOR","position":{"x":11,"y":73}},{"type":"ENGINE","position":{"x":19,"y":59}},
    {"type":"EXHAUST","position":{"x":64,"y":77}},{"type":"FUEL","position":{"x":65,"y":70}},
    {"type":"GEARBOX","position":{"x":24,"y":75}}]
  },
  [EEquipmentModel.SCANIA_P_SLEEPER_TANDEM_8x4]: {
    name: 'Scania P PRT2 Sleeper Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_P_SLEEPER_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":72}},{"type":"SUSPENSION","position":{"x":51,"y":64}},
    {"type":"WHEELS","position":{"x":54,"y":72}},{"type":"BODY","position":{"x":35,"y":58}},
    {"type":"FRAME","position":{"x":39,"y":76}},{"type":"INTERIOR","position":{"x":22,"y":42}},
    {"type":"BATTERY","position":{"x":58,"y":56}},{"type":"ELECTRONIC","position":{"x":35,"y":52}},
    {"type":"LIGHTS","position":{"x":34,"y":68}},{"type":"LOAD","position":{"x":71,"y":65}},
    {"type":"COMPRESSOR","position":{"x":10,"y":72}},{"type":"ENGINE","position":{"x":20,"y":61}},
    {"type":"EXHAUST","position":{"x":58,"y":75}},{"type":"FUEL","position":{"x":72,"y":71}},
    {"type":"GEARBOX","position":{"x":24,"y":75}}]
  },
  [EEquipmentModel.SCANIA_R_DAYCAB_SEMI_4x2]: {
    name: 'Scania R PRT2 Daycab semi 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_R_DAYCAB_SEMI_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":54,"y":80}},{"type":"SUSPENSION","position":{"x":62,"y":65}},
    {"type":"WHEELS","position":{"x":60,"y":75}},{"type":"BODY","position":{"x":46,"y":59}},
    {"type":"FRAME","position":{"x":44,"y":82}},{"type":"INTERIOR","position":{"x":38,"y":38}},
    {"type":"LIGHTS","position":{"x":42,"y":70}},{"type":"BATTERY","position":{"x":63,"y":60}},
    {"type":"ELECTRONIC","position":{"x":39,"y":50}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":65}},
    {"type":"COMPRESSOR","position":{"x":12,"y":76}},{"type":"ENGINE","position":{"x":22,"y":62}},
    {"type":"EXHAUST","position":{"x":66,"y":80}},{"type":"FUEL","position":{"x":70,"y":73}},
    {"type":"GEARBOX","position":{"x":30,"y":78}}]
  },
  [EEquipmentModel.SCANIA_R_DAYCAB_SEMI_6x2]: {
    name: 'Scania R PRT2 Daycab semi 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_R_DAYCAB_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":81}},{"type":"SUSPENSION","position":{"x":55,"y":64}},
    {"type":"WHEELS","position":{"x":59,"y":74}},{"type":"BODY","position":{"x":43,"y":52}},
    {"type":"INTERIOR","position":{"x":27,"y":32}},{"type":"FRAME","position":{"x":45,"y":80}},
    {"type":"BATTERY","position":{"x":63,"y":60}},{"type":"ELECTRONIC","position":{"x":36,"y":49}},
    {"type":"LIGHTS","position":{"x":37,"y":70}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":64}},
    {"type":"COMPRESSOR","position":{"x":10,"y":76}},{"type":"ENGINE","position":{"x":26,"y":65}},
    {"type":"EXHAUST","position":{"x":66,"y":80}},{"type":"FUEL","position":{"x":66,"y":74}},
    {"type":"GEARBOX","position":{"x":27,"y":78}}]
  },
  [EEquipmentModel.SCANIA_R_DAYCAB_TANDEM_4x2]: {
    name: 'Scania R PRT2 Daycab Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_R_DAYCAB_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":74}},{"type":"SUSPENSION","position":{"x":50,"y":64}},
    {"type":"WHEELS","position":{"x":53,"y":71}},{"type":"BODY","position":{"x":33,"y":60}},
    {"type":"FRAME","position":{"x":40,"y":76}},{"type":"INTERIOR","position":{"x":21,"y":40}},
    {"type":"BATTERY","position":{"x":53,"y":58}},{"type":"ELECTRONIC","position":{"x":33,"y":50}},
    {"type":"LIGHTS","position":{"x":35,"y":67}},{"type":"LOAD","position":{"x":67,"y":64}},
    {"type":"COMPRESSOR","position":{"x":11,"y":73}},{"type":"ENGINE","position":{"x":21,"y":61}},
    {"type":"EXHAUST","position":{"x":60,"y":71}},{"type":"FUEL","position":{"x":58,"y":65}},
    {"type":"GEARBOX","position":{"x":25,"y":77}}]
  },
  [EEquipmentModel.SCANIA_R_DAYCAB_TANDEM_6x2]: {
    name: 'Scania R PRT2 Daycab Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_R_DAYCAB_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":71}},{"type":"SUSPENSION","position":{"x":53,"y":61}},
    {"type":"WHEELS","position":{"x":58,"y":69}},{"type":"BODY","position":{"x":37,"y":57}},
    {"type":"FRAME","position":{"x":43,"y":75}},{"type":"INTERIOR","position":{"x":24,"y":35}},
    {"type":"LIGHTS","position":{"x":36,"y":67}},{"type":"ELECTRONIC","position":{"x":33,"y":48}},
    {"type":"BATTERY","position":{"x":57,"y":53}},{"type":"LOAD","position":{"x":72,"y":64}},
    {"type":"COMPRESSOR","position":{"x":10,"y":71}},{"type":"ENGINE","position":{"x":22,"y":59}},
    {"type":"EXHAUST","position":{"x":61,"y":73}},{"type":"FUEL","position":{"x":62,"y":63}},
    {"type":"GEARBOX","position":{"x":29,"y":74}}]
  },
  [EEquipmentModel.SCANIA_R_DAYCAB_TANDEM_8x4]: {
    name: 'Scania R PRT2 Daycab Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_R_DAYCAB_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":71}},{"type":"SUSPENSION","position":{"x":53,"y":60}},
    {"type":"WHEELS","position":{"x":52,"y":70}},{"type":"BODY","position":{"x":37,"y":59}},
    {"type":"FRAME","position":{"x":39,"y":74}},{"type":"INTERIOR","position":{"x":17,"y":35}},
    {"type":"LIGHTS","position":{"x":34,"y":65}},{"type":"ELECTRONIC","position":{"x":33,"y":49}},
    {"type":"BATTERY","position":{"x":53,"y":55}},{"type":"LOAD","position":{"x":74,"y":61}},
    {"type":"COMPRESSOR","position":{"x":9,"y":71}},{"type":"ENGINE","position":{"x":21,"y":63}},
    {"type":"EXHAUST","position":{"x":58,"y":73}},{"type":"FUEL","position":{"x":58,"y":61}},
    {"type":"GEARBOX","position":{"x":24,"y":70}}]
  },
  [EEquipmentModel.SCANIA_R_PRT1_4x2]: {
    name: 'Scania R PRT1 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_R_PRT1_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":76}},{"type":"SUSPENSION","position":{"x":50,"y":66}},
            {"type":"WHEELS","position":{"x":58,"y":75}},{"type":"BODY","position":{"x":12,"y":58}},
            {"type":"FRAME","position":{"x":23,"y":79}},{"type":"INTERIOR","position":{"x":27,"y":42}},
            {"type":"BATTERY","position":{"x":15,"y":62}},{"type":"ELECTRONIC","position":{"x":30,"y":57}},
            {"type":"LIGHTS","position":{"x":13,"y":69}},{"type":"FIFTH_WHEEL","position":{"x":70,"y":58}},
            {"type":"FUEL","position":{"x":73,"y":62}},{"type":"GEARBOX","position":{"x":39,"y":64}},
            {"type":"EXHAUST","position":{"x":66,"y":74}},{"type":"ENGINE","position":{"x":28,"y":71}},
            {"type":"COMPRESSOR","position":{"x":20,"y":68}}]
  },
  [EEquipmentModel.SCANIA_R_PRT1_6x2]: {
    name: 'Scania R PRT1 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_R_PRT1_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":79}},{"type":"WHEELS","position":{"x":56,"y":81}},
            {"type":"SUSPENSION","position":{"x":51,"y":67}},{"type":"BODY","position":{"x":12,"y":56}},
            {"type":"FRAME","position":{"x":22,"y":80}},{"type":"INTERIOR","position":{"x":24,"y":39}},
            {"type":"ELECTRONIC","position":{"x":28,"y":55}},{"type":"LIGHTS","position":{"x":12,"y":70}},
            {"type":"BATTERY","position":{"x":11,"y":62}},{"type":"FIFTH_WHEEL","position":{"x":69,"y":58}},
            {"type":"COMPRESSOR","position":{"x":17,"y":69}},{"type":"ENGINE","position":{"x":24,"y":70}},
            {"type":"EXHAUST","position":{"x":64,"y":73}},{"type":"FUEL","position":{"x":67,"y":68}},
            {"type":"GEARBOX","position":{"x":33,"y":65}}]
  },
  [EEquipmentModel.SCANIA_R_SLEEPER_SEMI_4x2]: {
    name: 'Scania R PRT2 Sleeper semi 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_R_SLEEPER_SEMI_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":81}},{"type":"SUSPENSION","position":{"x":58,"y":65}},
    {"type":"WHEELS","position":{"x":60,"y":78}},{"type":"BODY","position":{"x":43,"y":61}},
    {"type":"FRAME","position":{"x":45,"y":82}},{"type":"INTERIOR","position":{"x":36,"y":38}},
    {"type":"BATTERY","position":{"x":64,"y":62}},{"type":"ELECTRONIC","position":{"x":36,"y":51}},
    {"type":"LIGHTS","position":{"x":40,"y":70}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":66}},
    {"type":"COMPRESSOR","position":{"x":14,"y":76}},{"type":"ENGINE","position":{"x":25,"y":65}},
    {"type":"EXHAUST","position":{"x":66,"y":78}},{"type":"FUEL","position":{"x":70,"y":73}},
    {"type":"GEARBOX","position":{"x":30,"y":80}}]
  },
  [EEquipmentModel.SCANIA_R_SLEEPER_SEMI_6x2]: {
    name: 'Scania R PRT2 Sleeper semi 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_R_SLEEPER_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":82}},{"type":"SUSPENSION","position":{"x":55,"y":65}},
    {"type":"WHEELS","position":{"x":58,"y":78}},{"type":"BODY","position":{"x":44,"y":60}},
    {"type":"FRAME","position":{"x":45,"y":81}},{"type":"INTERIOR","position":{"x":31,"y":33}},
    {"type":"BATTERY","position":{"x":62,"y":61}},{"type":"ELECTRONIC","position":{"x":36,"y":53}},
    {"type":"LIGHTS","position":{"x":39,"y":70}},{"type":"FIFTH_WHEEL","position":{"x":67,"y":65}},
    {"type":"COMPRESSOR","position":{"x":14,"y":78}},{"type":"ENGINE","position":{"x":21,"y":65}},
    {"type":"EXHAUST","position":{"x":65,"y":80}},{"type":"FUEL","position":{"x":66,"y":71}},
    {"type":"GEARBOX","position":{"x":26,"y":78}}]
  },
  [EEquipmentModel.SCANIA_R_SLEEPER_TANDEM_4x2]: {
    name: 'Scania R PRT2 Sleeper Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_R_SLEEPER_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":73}},{"type":"SUSPENSION","position":{"x":50,"y":65}},
    {"type":"WHEELS","position":{"x":54,"y":74}},{"type":"BODY","position":{"x":35,"y":61}},
    {"type":"FRAME","position":{"x":39,"y":77}},{"type":"INTERIOR","position":{"x":23,"y":39}},
    {"type":"BATTERY","position":{"x":55,"y":61}},{"type":"ELECTRONIC","position":{"x":34,"y":51}},
    {"type":"LIGHTS","position":{"x":33,"y":69}},{"type":"LOAD","position":{"x":70,"y":66}},
    {"type":"COMPRESSOR","position":{"x":10,"y":74}},{"type":"ENGINE","position":{"x":20,"y":59}},
    {"type":"EXHAUST","position":{"x":57,"y":78}},{"type":"FUEL","position":{"x":56,"y":68}},
    {"type":"GEARBOX","position":{"x":28,"y":73}}]
  },
  [EEquipmentModel.SCANIA_R_SLEEPER_TANDEM_6x2]: {
    name: 'Scania R PRT2 Sleeper Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_R_SLEEPER_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":77}},{"type":"SUSPENSION","position":{"x":54,"y":65}},
    {"type":"WHEELS","position":{"x":56,"y":74}},{"type":"BODY","position":{"x":37,"y":64}},
    {"type":"FRAME","position":{"x":42,"y":79}},{"type":"INTERIOR","position":{"x":26,"y":36}},
    {"type":"BATTERY","position":{"x":60,"y":60}},{"type":"ELECTRONIC","position":{"x":35,"y":55}},
    {"type":"LIGHTS","position":{"x":38,"y":69}},{"type":"LOAD","position":{"x":69,"y":68}},
    {"type":"COMPRESSOR","position":{"x":12,"y":77}},{"type":"ENGINE","position":{"x":23,"y":62}},
    {"type":"EXHAUST","position":{"x":64,"y":79}},{"type":"FUEL","position":{"x":61,"y":67}},
    {"type":"GEARBOX","position":{"x":30,"y":79}}]
  },
  [EEquipmentModel.SCANIA_R_SLEEPER_TANDEM_8x4]: {
    name: 'Scania R PRT2 Sleeper Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_R_SLEEPER_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":44,"y":74}},{"type":"SUSPENSION","position":{"x":49,"y":64}},
    {"type":"WHEELS","position":{"x":53,"y":74}},{"type":"BODY","position":{"x":38,"y":60}},
    {"type":"FRAME","position":{"x":40,"y":79}},{"type":"INTERIOR","position":{"x":21,"y":39}},
    {"type":"BATTERY","position":{"x":57,"y":59}},{"type":"ELECTRONIC","position":{"x":33,"y":49}},
    {"type":"LIGHTS","position":{"x":35,"y":68}},{"type":"LOAD","position":{"x":70,"y":67}},
    {"type":"COMPRESSOR","position":{"x":11,"y":76}},{"type":"ENGINE","position":{"x":19,"y":63}},
    {"type":"EXHAUST","position":{"x":59,"y":78}},{"type":"FUEL","position":{"x":63,"y":71}},
    {"type":"GEARBOX","position":{"x":30,"y":77}}]
  },
  [EEquipmentModel.SCANIA_S_SEMI_4x2]: {
    name: 'Scania S PRT2 Sleeper semi 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_S_SEMI_4x2_IMG,
    parts: [{"type":"SUSPENSION","position":{"x":59,"y":68}},{"type":"WHEELS","position":{"x":61,"y":78}},
    {"type":"BRAKES","position":{"x":53,"y":78}},{"type":"BODY","position":{"x":47,"y":57}},
    {"type":"FRAME","position":{"x":48,"y":81}},{"type":"INTERIOR","position":{"x":34,"y":38}},
    {"type":"BATTERY","position":{"x":63,"y":62}},{"type":"ELECTRONIC","position":{"x":36,"y":50}},
    {"type":"LIGHTS","position":{"x":41,"y":69}},{"type":"FIFTH_WHEEL","position":{"x":69,"y":66}},
    {"type":"COMPRESSOR","position":{"x":16,"y":77}},{"type":"ENGINE","position":{"x":24,"y":58}},
    {"type":"EXHAUST","position":{"x":65,"y":81}},{"type":"FUEL","position":{"x":74,"y":72}},
    {"type":"GEARBOX","position":{"x":32,"y":80}}]
  },
  [EEquipmentModel.SCANIA_S_SEMI_6x2]: {
    name: 'Scania S PRT2 Sleeper semi 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_S_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":79}},{"type":"SUSPENSION","position":{"x":57,"y":67}},
    {"type":"WHEELS","position":{"x":58,"y":75}},{"type":"BODY","position":{"x":42,"y":60}},
    {"type":"FRAME","position":{"x":45,"y":83}},{"type":"INTERIOR","position":{"x":30,"y":33}},
    {"type":"LIGHTS","position":{"x":41,"y":70}},{"type":"ELECTRONIC","position":{"x":37,"y":51}},
    {"type":"BATTERY","position":{"x":63,"y":63}},{"type":"FIFTH_WHEEL","position":{"x":68,"y":65}},
    {"type":"COMPRESSOR","position":{"x":15,"y":78}},{"type":"ENGINE","position":{"x":27,"y":66}},
    {"type":"EXHAUST","position":{"x":64,"y":79}},{"type":"FUEL","position":{"x":70,"y":72}},
    {"type":"GEARBOX","position":{"x":29,"y":79}}]
  },
  [EEquipmentModel.SCANIA_S_TANDEM_4x2]: {
    name: 'Scania S PRT2 Sleeper Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.SCANIA,
    image: SCANIA_S_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":76}},{"type":"SUSPENSION","position":{"x":50,"y":67}},
    {"type":"WHEELS","position":{"x":53,"y":74}},{"type":"BODY","position":{"x":35,"y":59}},
    {"type":"FRAME","position":{"x":38,"y":79}},{"type":"INTERIOR","position":{"x":23,"y":34}},
    {"type":"LIGHTS","position":{"x":33,"y":71}},{"type":"ELECTRONIC","position":{"x":35,"y":49}},
    {"type":"BATTERY","position":{"x":54,"y":60}},{"type":"LOAD","position":{"x":67,"y":67}},
    {"type":"COMPRESSOR","position":{"x":10,"y":77}},{"type":"EXHAUST","position":{"x":58,"y":79}},
    {"type":"FUEL","position":{"x":57,"y":68}},{"type":"GEARBOX","position":{"x":25,"y":78}},
    {"type":"ENGINE","position":{"x":21,"y":65}}]
  },
  [EEquipmentModel.SCANIA_S_TANDEM_6x2]: {
    name: 'Scania S PRT2 Sleeper Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCANIA,
    image: SCANIA_S_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":77}},{"type":"SUSPENSION","position":{"x":50,"y":66}},
    {"type":"WHEELS","position":{"x":51,"y":73}},{"type":"BODY","position":{"x":34,"y":62}},
    {"type":"FRAME","position":{"x":37,"y":79}},{"type":"INTERIOR","position":{"x":21,"y":39}},
    {"type":"LIGHTS","position":{"x":38,"y":71}},{"type":"ELECTRONIC","position":{"x":34,"y":48}},
    {"type":"BATTERY","position":{"x":55,"y":60}},{"type":"LOAD","position":{"x":66,"y":68}},
    {"type":"COMPRESSOR","position":{"x":9,"y":76}},{"type":"ENGINE","position":{"x":20,"y":61}},
    {"type":"EXHAUST","position":{"x":58,"y":78}},{"type":"FUEL","position":{"x":56,"y":67}},
    {"type":"GEARBOX","position":{"x":25,"y":77}}]
  },
  [EEquipmentModel.SCANIA_S_TANDEM_8x4]: {
    name: 'Scania S PRT2 Sleeper Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.SCANIA,
    image: SCANIA_S_TANDEM_8x4_IMG,
    parts: [{"type":"SUSPENSION","position":{"x":50,"y":66}},{"type":"BRAKES","position":{"x":43,"y":74}},
    {"type":"WHEELS","position":{"x":51,"y":76}},{"type":"BODY","position":{"x":34,"y":62}},
    {"type":"FRAME","position":{"x":41,"y":78}},{"type":"INTERIOR","position":{"x":24,"y":38}},
    {"type":"BATTERY","position":{"x":53,"y":60}},{"type":"ELECTRONIC","position":{"x":33,"y":51}},
    {"type":"LIGHTS","position":{"x":33,"y":70}},{"type":"LOAD","position":{"x":68,"y":67}},
    {"type":"COMPRESSOR","position":{"x":12,"y":77}},{"type":"ENGINE","position":{"x":22,"y":62}},
    {"type":"EXHAUST","position":{"x":56,"y":78}},{"type":"FUEL","position":{"x":55,"y":67}},
    {"type":"GEARBOX","position":{"x":28,"y":80}}]
  },
  [EEquipmentModel.SCHMITZ_CARGOBULL_SEMI_REEFER]: {
    name: 'Schmitz CargoBull Reefer Semi Trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.SCHMITZ_CARGOBULL,
    image: SCHMITZ_CARGOBULL_SEMI_REEFER_IMG,
    parts: [{"type":"BRAKES","position":{"x":77,"y":71}},{"type":"SUSPENSION","position":{"x":81,"y":66}},
    {"type":"WHEELS","position":{"x":82,"y":71}},{"type":"BODY","position":{"x":55,"y":48}},
    {"type":"FRAME","position":{"x":49,"y":69}},{"type":"SUPPORT","position":{"x":59,"y":78}},
    {"type":"LIGHTS","position":{"x":95,"y":65}},{"type":"FRIGO","position":{"x":15,"y":42}},
    {"type":"DOORS","position":{"x":94,"y":54}},{"type":"LOAD","position":{"x":70,"y":61}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":19,"y":66}}]
  },
  [EEquipmentModel.SCHMITZ_CARGOBULL_TANDEM_CURTAIN]: {
    name: 'Schmitz CargoBull Curtain Tandem Trailer',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].TRAILER_2_MID_AXLES,
    brand: EBrand.SCHMITZ_CARGOBULL,
    image: SCHMITZ_CARGOBULL_TANDEM_CURTAIN_IMG,
    parts: [{"type":"BRAKES","position":{"x":40,"y":79}},{"type":"SUSPENSION","position":{"x":33,"y":73}},
    {"type":"WHEELS","position":{"x":32,"y":77}},{"type":"BODY","position":{"x":47,"y":54}},
    {"type":"SUPPORT","position":{"x":63,"y":82}},{"type":"FRAME","position":{"x":40,"y":72}},
    {"type":"LIGHTS","position":{"x":76,"y":84}},{"type":"DOORS","position":{"x":81,"y":56}},
    {"type":"LOAD","position":{"x":34,"y":65}},{"type":"TRAILER_ATTACHMENT","position":{"x":4,"y":70}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_FLATBED_3]: {
    name: 'Schwartzmueller 3 axle flatbed extendable semi trailer with cranked platform',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_FLATBED_3_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":71}},{"type":"SUSPENSION","position":{"x":49,"y":65}},
    {"type":"WHEELS","position":{"x":50,"y":70}},{"type":"FRAME","position":{"x":66,"y":61}},
    {"type":"SUPPORT","position":{"x":89,"y":61}},{"type":"LIGHTS","position":{"x":19,"y":67}},
    {"type":"LOAD","position":{"x":57,"y":60}},{"type":"RAMP","position":{"x":20,"y":50}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":93,"y":54}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_FLATBED_3_1]: {
    name: 'Schwartzmueller 3 axle flatbed semi trailer with cranked platform',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_FLATBED_3_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":74}},{"type":"SUSPENSION","position":{"x":45,"y":67}},
    {"type":"WHEELS","position":{"x":42,"y":75}},{"type":"FRAME","position":{"x":18,"y":63}},
    {"type":"SUPPORT","position":{"x":13,"y":67}},{"type":"LIGHTS","position":{"x":74,"y":66}},
    {"type":"LOAD","position":{"x":34,"y":62}},{"type":"RAMP","position":{"x":76,"y":42}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":9,"y":57}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_FLATBED_3_2]: {
    name: 'Schwartzmueller 3 axle reinforced flatbed semi trailer with cranked platform',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_FLATBED_3_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":72,"y":59}},{"type":"SUSPENSION","position":{"x":76,"y":54}},
    {"type":"WHEELS","position":{"x":77,"y":58}},{"type":"FRAME","position":{"x":45,"y":56}},
    {"type":"SUPPORT","position":{"x":43,"y":63}},{"type":"LIGHTS","position":{"x":91,"y":49}},
    {"type":"LOAD","position":{"x":59,"y":53}},{"type":"RAMP","position":{"x":91,"y":41}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":15,"y":52}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_FLATBED_TANDEM]: {
    name: 'Schwartzmueller 5 axle flatbed trailer with cranked platform',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].FLATBED_2_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_FLATBED_TANDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":62}},{"type":"SUSPENSION","position":{"x":52,"y":54}},
    {"type":"WHEELS","position":{"x":58,"y":60}},{"type":"FRAME","position":{"x":67,"y":53}},
    {"type":"LIGHTS","position":{"x":90,"y":51}},{"type":"LOAD","position":{"x":64,"y":49}},
    {"type":"RAMP","position":{"x":89,"y":35}},{"type":"TRAILER_ATTACHMENT","position":{"x":3,"y":58}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_FLATBED_TANDEM_1]: {
    name: 'Schwartzmueller 3 axle flatbed with wheel wells for construction',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].FLATBED_1_2_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_FLATBED_TANDEM_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":41,"y":69}},{"type":"SUSPENSION","position":{"x":44,"y":58}},
    {"type":"WHEELS","position":{"x":48,"y":66}},{"type":"FRAME","position":{"x":57,"y":56}},
    {"type":"LIGHTS","position":{"x":98,"y":53}},{"type":"LOAD","position":{"x":65,"y":55}},
    {"type":"RAMP","position":{"x":94,"y":47}},{"type":"TRAILER_ATTACHMENT","position":{"x":1,"y":63}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_FLATBED_TANDEM_2]: {
    name: 'Schwartzmueller 4 axle flatbed with cranked platform',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].FLATBED_2_2_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_FLATBED_TANDEM_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":62}},{"type":"SUSPENSION","position":{"x":45,"y":55}},
    {"type":"WHEELS","position":{"x":44,"y":61}},{"type":"FRAME","position":{"x":31,"y":54}},
    {"type":"LIGHTS","position":{"x":6,"y":47}},{"type":"LOAD","position":{"x":37,"y":52}},
    {"type":"RAMP","position":{"x":16,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":95,"y":53}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_FLATBED_TANDEM_3]: {
    name: 'Schwartzmueller 3 axle flatbed with straight platform',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].FLATBED_1_2_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_FLATBED_TANDEM_3_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":69}},{"type":"SUSPENSION","position":{"x":49,"y":64}},
    {"type":"WHEELS","position":{"x":53,"y":69}},{"type":"FRAME","position":{"x":66,"y":60}},
    {"type":"LIGHTS","position":{"x":13,"y":63}},{"type":"LOAD","position":{"x":53,"y":57}},
    {"type":"RAMP","position":{"x":18,"y":40}},{"type":"TRAILER_ATTACHMENT","position":{"x":95,"y":56}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_FLATBED_TANDEM_4]: {
    name: 'Schwartzmueller 3 axle flatbed with cranked platform',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].FLATBED_1_2_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_FLATBED_TANDEM_4_IMG,
    parts: [{"type":"BRAKES","position":{"x":33,"y":67}},{"type":"SUSPENSION","position":{"x":40,"y":59}},
    {"type":"WHEELS","position":{"x":41,"y":66}},{"type":"FRAME","position":{"x":51,"y":58}},
    {"type":"LIGHTS","position":{"x":89,"y":50}},{"type":"LOAD","position":{"x":61,"y":56}},
    {"type":"RAMP","position":{"x":77,"y":46}},{"type":"TRAILER_ATTACHMENT","position":{"x":5,"y":62}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_FLATBED_TANDEM_5]: {
    name: 'Schwartzmueller 2 axle flatbed with cranked platform',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_FLATBED_TANDEM_5_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":65}},{"type":"SUSPENSION","position":{"x":49,"y":57}},
    {"type":"WHEELS","position":{"x":51,"y":65}},{"type":"FRAME","position":{"x":65,"y":56}},
    {"type":"LIGHTS","position":{"x":85,"y":50}},{"type":"LOAD","position":{"x":68,"y":53}},
    {"type":"RAMP","position":{"x":72,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":5,"y":65}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_FLATBED_TANDEM_6]: {
    name: 'Schwartzmueller 2 axle flatbed with straight platform',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_FLATBED_TANDEM_6_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":66}},{"type":"SUSPENSION","position":{"x":54,"y":57}},
    {"type":"WHEELS","position":{"x":58,"y":64}},{"type":"FRAME","position":{"x":71,"y":56}},
    {"type":"LIGHTS","position":{"x":87,"y":47}},{"type":"LOAD","position":{"x":65,"y":52}},
    {"type":"RAMP","position":{"x":72,"y":41}},{"type":"TRAILER_ATTACHMENT","position":{"x":2,"y":66}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_REEFER]: {
    name: 'Schwartzmueller 3 axle reefer semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_REEFER_IMG,
    parts: [{"type":"BRAKES","position":{"x":21,"y":70}},{"type":"SUSPENSION","position":{"x":17,"y":65}},
    {"type":"WHEELS","position":{"x":16,"y":69}},{"type":"BODY","position":{"x":41,"y":60}},
    {"type":"FRAME","position":{"x":35,"y":66}},{"type":"SUPPORT","position":{"x":39,"y":75}},
    {"type":"LIGHTS","position":{"x":2,"y":66}},{"type":"DOORS","position":{"x":6,"y":53}},
    {"type":"FRIGO","position":{"x":87,"y":46}},{"type":"LOAD","position":{"x":26,"y":61}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":68,"y":66}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TIPPER_2_ALU]: {
    name: 'Schwartzmueller 2 axle aluminium segment body tipper semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_2_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TIPPER_2_ALU_IMG,
    parts: [{"type":"TRAILER_ATTACHMENT","position":{"x":20,"y":59}},{"type":"BRAKES","position":{"x":66,"y":73}},
    {"type":"SUSPENSION","position":{"x":73,"y":63}},{"type":"WHEELS","position":{"x":76,"y":72}},
    {"type":"BODY","position":{"x":48,"y":48}},{"type":"FRAME","position":{"x":34,"y":57}},
    {"type":"SUPPORT","position":{"x":46,"y":74}},{"type":"LIGHTS","position":{"x":93,"y":61}},
    {"type":"DOORS","position":{"x":95,"y":53}},{"type":"LOAD","position":{"x":58,"y":50}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TIPPER_2_ALU_1]: {
    name: 'Schwartzmueller 2 axle aluminium segment body tipper semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_2_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TIPPER_2_ALU_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":68}},{"type":"SUSPENSION","position":{"x":50,"y":60}},
    {"type":"WHEELS","position":{"x":54,"y":65}},{"type":"BODY","position":{"x":58,"y":41}},
    {"type":"FRAME","position":{"x":55,"y":54}},{"type":"SUPPORT","position":{"x":66,"y":70}},
    {"type":"LIGHTS","position":{"x":29,"y":57}},{"type":"DOORS","position":{"x":20,"y":41}},
    {"type":"LOAD","position":{"x":66,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":84,"y":53}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TIPPER_2_STEEL]: {
    name: 'Schwartzmueller 2 axle steel segment body tipper semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_2_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TIPPER_2_STEEL_IMG,
    parts: [{"type":"BRAKES","position":{"x":71,"y":69}},{"type":"SUSPENSION","position":{"x":75,"y":60}},
    {"type":"WHEELS","position":{"x":78,"y":66}},{"type":"BODY","position":{"x":44,"y":48}},
    {"type":"FRAME","position":{"x":40,"y":59}},{"type":"SUPPORT","position":{"x":68,"y":76}},
    {"type":"LIGHTS","position":{"x":93,"y":56}},{"type":"LOAD","position":{"x":61,"y":51}},
    {"type":"DOORS","position":{"x":88,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":31,"y":60}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TIPPER_2_STEEL_1]: {
    name: 'Schwartzmueller 2 axle steel segment body tipper semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_2_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TIPPER_2_STEEL_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":69}},{"type":"SUSPENSION","position":{"x":58,"y":60}},
    {"type":"WHEELS","position":{"x":64,"y":66}},{"type":"BODY","position":{"x":52,"y":43}},
    {"type":"FRAME","position":{"x":62,"y":53}},{"type":"SUPPORT","position":{"x":74,"y":70}},
    {"type":"LIGHTS","position":{"x":40,"y":61}},{"type":"DOORS","position":{"x":28,"y":42}},
    {"type":"LOAD","position":{"x":70,"y":46}},{"type":"TRAILER_ATTACHMENT","position":{"x":87,"y":51}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TIPPER_3_ALU]: {
    name: 'Schwartzmueller 3 axle aluminium segment body tipper semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TIPPER_3_ALU_IMG,
    parts: [{"type":"BRAKES","position":{"x":71,"y":67}},{"type":"SUSPENSION","position":{"x":76,"y":57}},
    {"type":"WHEELS","position":{"x":78,"y":63}},{"type":"BODY","position":{"x":51,"y":44}},
    {"type":"FRAME","position":{"x":38,"y":54}},{"type":"SUPPORT","position":{"x":62,"y":77}},
    {"type":"LIGHTS","position":{"x":94,"y":57}},{"type":"DOORS","position":{"x":91,"y":43}},
    {"type":"LOAD","position":{"x":62,"y":46}},{"type":"TRAILER_ATTACHMENT","position":{"x":29,"y":59}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TIPPER_3_STEEL]: {
    name: 'Schwartzmueller 3 axle aluminium segment body tipper semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TIPPER_3_STEEL_IMG,
    parts: [{"type":"BRAKES","position":{"x":63,"y":64}},{"type":"SUSPENSION","position":{"x":66,"y":56}},
    {"type":"WHEELS","position":{"x":70,"y":61}},{"type":"BODY","position":{"x":45,"y":45}},
    {"type":"FRAME","position":{"x":36,"y":53}},{"type":"SUPPORT","position":{"x":57,"y":69}},
    {"type":"LIGHTS","position":{"x":93,"y":53}},{"type":"DOORS","position":{"x":91,"y":43}},
    {"type":"LOAD","position":{"x":60,"y":43}},{"type":"TRAILER_ATTACHMENT","position":{"x":21,"y":55}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU]: {
    name: 'Schwartzmueller 3 axle aluminium hollow profile tipper semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU_IMG,
    parts: [{"type":"BRAKES","position":{"x":75,"y":64}},{"type":"SUSPENSION","position":{"x":79,"y":58}},
    {"type":"WHEELS","position":{"x":81,"y":63}},{"type":"BODY","position":{"x":54,"y":43}},
    {"type":"FRAME","position":{"x":41,"y":58}},{"type":"SUPPORT","position":{"x":56,"y":72}},
    {"type":"LIGHTS","position":{"x":92,"y":57}},{"type":"LOAD","position":{"x":65,"y":49}},
    {"type":"DOORS","position":{"x":91,"y":47}},{"type":"TRAILER_ATTACHMENT","position":{"x":28,"y":59}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU_1]: {
    name: 'Schwartzmueller 3 axle aluminium hollow profile tipper semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TIPPER_HOLLOW_3_ALU_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":36,"y":66}},{"type":"SUSPENSION","position":{"x":40,"y":59}},
    {"type":"WHEELS","position":{"x":43,"y":64}},{"type":"BODY","position":{"x":46,"y":44}},
    {"type":"FRAME","position":{"x":63,"y":56}},{"type":"SUPPORT","position":{"x":63,"y":66}},
    {"type":"LIGHTS","position":{"x":18,"y":60}},{"type":"LOAD","position":{"x":58,"y":46}},
    {"type":"DOORS","position":{"x":15,"y":38}},{"type":"TRAILER_ATTACHMENT","position":{"x":84,"y":54}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER]: {
    name: 'Schwartzmueller 3 axle moving floor steel frame semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_IMG,
    parts: [{"type":"BRAKES","position":{"x":68,"y":63}},{"type":"SUSPENSION","position":{"x":75,"y":58}},
    {"type":"WHEELS","position":{"x":74,"y":62}},{"type":"BODY","position":{"x":43,"y":50}},
    {"type":"FRAME","position":{"x":52,"y":59}},{"type":"SUPPORT","position":{"x":45,"y":69}},
    {"type":"LIGHTS","position":{"x":92,"y":59}},{"type":"DOORS","position":{"x":83,"y":55}},
    {"type":"LOAD","position":{"x":34,"y":55}},{"type":"TRAILER_ATTACHMENT","position":{"x":22,"y":60}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_1]: {
    name: 'Schwartzmueller 3 axle moving floor aluminium frame semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":73,"y":62}},{"type":"SUSPENSION","position":{"x":75,"y":57}},
    {"type":"WHEELS","position":{"x":78,"y":61}},{"type":"BODY","position":{"x":45,"y":51}},
    {"type":"FRAME","position":{"x":52,"y":58}},{"type":"SUPPORT","position":{"x":42,"y":68}},
    {"type":"LIGHTS","position":{"x":92,"y":60}},{"type":"DOORS","position":{"x":95,"y":50}},
    {"type":"LOAD","position":{"x":56,"y":53}},{"type":"TRAILER_ATTACHMENT","position":{"x":25,"y":59}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_JUMBO]: {
    name: 'Schwartzmueller 3 axle jumbo sliding tarpaulin platform semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_JUMBO_IMG,
    parts: [{"type":"BRAKES","position":{"x":70,"y":64}},{"type":"SUSPENSION","position":{"x":72,"y":60}},
    {"type":"WHEELS","position":{"x":74,"y":63}},{"type":"BODY","position":{"x":59,"y":48}},
    {"type":"FRAME","position":{"x":50,"y":62}},{"type":"SUPPORT","position":{"x":37,"y":66}},
    {"type":"LIGHTS","position":{"x":90,"y":60}},{"type":"DOORS","position":{"x":90,"y":52}},
    {"type":"LOAD","position":{"x":62,"y":53}},{"type":"TRAILER_ATTACHMENT","position":{"x":23,"y":60}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL]: {
    name: 'Schwartzmueller 3 axle mega sliding tarpaulin platform coil semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL_IMG,
    parts: [{"type":"BRAKES","position":{"x":62,"y":61}},{"type":"SUSPENSION","position":{"x":66,"y":58}},
    {"type":"WHEELS","position":{"x":67,"y":62}},{"type":"BODY","position":{"x":44,"y":48}},
    {"type":"FRAME","position":{"x":45,"y":60}},{"type":"SUPPORT","position":{"x":38,"y":67}},
    {"type":"LIGHTS","position":{"x":90,"y":61}},{"type":"DOORS","position":{"x":89,"y":51}},
    {"type":"LOAD","position":{"x":55,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":17,"y":60}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL_1]: {
    name: 'Schwartzmueller 3 axle large capacity sliding tarpaulin platform coil semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_MEGA_COIL_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":65,"y":63}},{"type":"SUSPENSION","position":{"x":68,"y":58}},
    {"type":"WHEELS","position":{"x":70,"y":62}},{"type":"BODY","position":{"x":44,"y":45}},
    {"type":"FRAME","position":{"x":52,"y":59}},{"type":"SUPPORT","position":{"x":45,"y":68}},
    {"type":"LIGHTS","position":{"x":86,"y":59}},{"type":"DOORS","position":{"x":82,"y":51}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":30,"y":61}},{"type":"LOAD","position":{"x":55,"y":54}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK]: {
    name: 'Schwartzmueller 3 axle sliding tarpaulin platform piggyback semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_IMG,
    parts: [{"type":"BRAKES","position":{"x":58,"y":64}},{"type":"SUSPENSION","position":{"x":53,"y":58}},
    {"type":"WHEELS","position":{"x":52,"y":63}},{"type":"BODY","position":{"x":40,"y":51}},
    {"type":"FRAME","position":{"x":36,"y":57}},{"type":"SUPPORT","position":{"x":20,"y":62}},
    {"type":"LIGHTS","position":{"x":87,"y":62}},{"type":"DOORS","position":{"x":91,"y":50}},
    {"type":"LOAD","position":{"x":48,"y":53}},{"type":"TRAILER_ATTACHMENT","position":{"x":15,"y":55}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_1]: {
    name: 'Schwartzmueller 3 axle large capacity sliding tarpaulin platform piggyback semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":70,"y":66}},{"type":"SUSPENSION","position":{"x":71,"y":60}},
    {"type":"WHEELS","position":{"x":73,"y":63}},{"type":"BODY","position":{"x":45,"y":58}},
    {"type":"FRAME","position":{"x":54,"y":63}},{"type":"SUPPORT","position":{"x":47,"y":69}},
    {"type":"LIGHTS","position":{"x":90,"y":61}},{"type":"DOORS","position":{"x":85,"y":52}},
    {"type":"LOAD","position":{"x":62,"y":57}},{"type":"TRAILER_ATTACHMENT","position":{"x":29,"y":61}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_2]: {
    name: 'Schwartzmueller 3 axle sliding tarpaulin platform coil piggyback semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_PIGGYBACK_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":76,"y":67}},{"type":"SUSPENSION","position":{"x":78,"y":61}},
    {"type":"WHEELS","position":{"x":80,"y":66}},{"type":"BODY","position":{"x":55,"y":51}},
    {"type":"FRAME","position":{"x":66,"y":66}},{"type":"SUPPORT","position":{"x":51,"y":73}},
    {"type":"LIGHTS","position":{"x":96,"y":62}},{"type":"DOORS","position":{"x":94,"y":52}},
    {"type":"LOAD","position":{"x":69,"y":58}},{"type":"TRAILER_ATTACHMENT","position":{"x":29,"y":66}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_STANDARD]: {
    name: 'Schwartzmueller 3 axle platform semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_STANDARD_IMG,
    parts: [{"type":"BRAKES","position":{"x":25,"y":69}},{"type":"SUSPENSION","position":{"x":20,"y":64}},
    {"type":"WHEELS","position":{"x":21,"y":70}},{"type":"BODY","position":{"x":35,"y":57}},
    {"type":"FRAME","position":{"x":33,"y":68}},{"type":"SUPPORT","position":{"x":47,"y":76}},
    {"type":"LIGHTS","position":{"x":4,"y":65}},{"type":"DOORS","position":{"x":8,"y":58}},
    {"type":"LOAD","position":{"x":40,"y":60}},{"type":"TRAILER_ATTACHMENT","position":{"x":74,"y":65}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_STANDARD_1]: {
    name: 'Schwartzmueller 3 axle sliding tarpaulin platform semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_STANDARD_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":68}},{"type":"SUSPENSION","position":{"x":60,"y":60}},
    {"type":"WHEELS","position":{"x":61,"y":66}},{"type":"BODY","position":{"x":59,"y":53}},
    {"type":"FRAME","position":{"x":73,"y":63}},{"type":"SUPPORT","position":{"x":85,"y":64}},
    {"type":"LIGHTS","position":{"x":22,"y":70}},{"type":"DOORS","position":{"x":14,"y":52}},
    {"type":"LOAD","position":{"x":53,"y":58}},{"type":"TRAILER_ATTACHMENT","position":{"x":90,"y":57}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT]: {
    name: 'Schwartzmueller 3 axle ultralight sliding tarpaulin platform semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":69}},{"type":"SUSPENSION","position":{"x":57,"y":61}},
    {"type":"WHEELS","position":{"x":58,"y":66}},{"type":"BODY","position":{"x":63,"y":50}},
    {"type":"FRAME","position":{"x":69,"y":63}},{"type":"SUPPORT","position":{"x":81,"y":67}},
    {"type":"LIGHTS","position":{"x":22,"y":67}},{"type":"DOORS","position":{"x":14,"y":51}},
    {"type":"LOAD","position":{"x":58,"y":56}},{"type":"TRAILER_ATTACHMENT","position":{"x":89,"y":62}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_1]: {
    name: 'Schwartzmueller 3 axle ultralight sliding tarpaulin platform paper rolls semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":76,"y":71}},{"type":"SUSPENSION","position":{"x":79,"y":65}},
    {"type":"WHEELS","position":{"x":81,"y":69}},{"type":"BODY","position":{"x":66,"y":54}},
    {"type":"SUPPORT","position":{"x":56,"y":76}},{"type":"FRAME","position":{"x":69,"y":67}},
    {"type":"LIGHTS","position":{"x":94,"y":67}},{"type":"DOORS","position":{"x":95,"y":57}},
    {"type":"LOAD","position":{"x":59,"y":57}},{"type":"TRAILER_ATTACHMENT","position":{"x":31,"y":67}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_2]: {
    name: 'Schwartzmueller 3 axle ultralight platform coil semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":68,"y":64}},{"type":"SUSPENSION","position":{"x":71,"y":60}},
    {"type":"WHEELS","position":{"x":73,"y":65}},{"type":"BODY","position":{"x":58,"y":54}},
    {"type":"FRAME","position":{"x":59,"y":60}},{"type":"SUPPORT","position":{"x":43,"y":69}},
    {"type":"LIGHTS","position":{"x":94,"y":62}},{"type":"DOORS","position":{"x":94,"y":53}},
    {"type":"LOAD","position":{"x":62,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":23,"y":61}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_3]: {
    name: 'Schwartzmueller 3 axle ultralight sliding tarrpaulin platform coil semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_3_IMG,
    parts: [{"type":"BRAKES","position":{"x":44,"y":69}},{"type":"SUSPENSION","position":{"x":50,"y":62}},
    {"type":"WHEELS","position":{"x":48,"y":68}},{"type":"BODY","position":{"x":61,"y":48}},
    {"type":"FRAME","position":{"x":67,"y":61}},{"type":"SUPPORT","position":{"x":79,"y":65}},
    {"type":"LIGHTS","position":{"x":21,"y":68}},{"type":"DOORS","position":{"x":14,"y":49}},
    {"type":"LOAD","position":{"x":58,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":82,"y":58}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA]: {
    name: 'Schwartzmueller 3 axle mega sliding tarpaulin platform semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA_IMG,
    parts: [{"type":"BRAKES","position":{"x":52,"y":64}},{"type":"SUSPENSION","position":{"x":48,"y":58}},
    {"type":"WHEELS","position":{"x":46,"y":63}},{"type":"BODY","position":{"x":38,"y":48}},
    {"type":"FRAME","position":{"x":33,"y":58}},{"type":"SUPPORT","position":{"x":18,"y":62}},
    {"type":"LIGHTS","position":{"x":83,"y":66}},{"type":"DOORS","position":{"x":89,"y":50}},
    {"type":"LOAD","position":{"x":42,"y":52}},{"type":"TRAILER_ATTACHMENT","position":{"x":14,"y":56}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA_1]: {
    name: 'Schwartzmueller 3 axle large capacity sliding tarpaulin platform semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_SEMI_TRAILER_ULTRALIGHT_MEGA_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":72}},{"type":"SUSPENSION","position":{"x":50,"y":65}},
    {"type":"WHEELS","position":{"x":53,"y":69}},{"type":"BODY","position":{"x":44,"y":46}},
    {"type":"FRAME","position":{"x":67,"y":63}},{"type":"SUPPORT","position":{"x":87,"y":67}},
    {"type":"LIGHTS","position":{"x":19,"y":74}},{"type":"DOORS","position":{"x":14,"y":57}},
    {"type":"LOAD","position":{"x":62,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":92,"y":60}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_4x2]: {
    name: 'Schwartzmueller aluminium box body tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":75}},{"type":"SUSPENSION","position":{"x":57,"y":68}},
    {"type":"WHEELS","position":{"x":61,"y":74}},{"type":"BODY","position":{"x":58,"y":43}},
    {"type":"FRAME","position":{"x":70,"y":68}},{"type":"INTERIOR","position":{"x":88,"y":47}},
    {"type":"BATTERY","position":{"x":84,"y":65}},{"type":"ELECTRONIC","position":{"x":89,"y":57}},
    {"type":"LIGHTS","position":{"x":95,"y":63}},{"type":"DOORS","position":{"x":24,"y":31}},
    {"type":"RAMP","position":{"x":24,"y":59}},{"type":"LOAD","position":{"x":52,"y":62}},
    {"type":"COMPRESSOR","position":{"x":88,"y":61}},{"type":"ENGINE","position":{"x":92,"y":60}},
    {"type":"EXHAUST","position":{"x":84,"y":69}},{"type":"FUEL","position":{"x":75,"y":67}},
    {"type":"GEARBOX","position":{"x":91,"y":66}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_6x2]: {
    name: 'Schwartzmueller plywood box body tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":76}},{"type":"SUSPENSION","position":{"x":49,"y":67}},
    {"type":"WHEELS","position":{"x":48,"y":73}},{"type":"BODY","position":{"x":38,"y":49}},
    {"type":"FRAME","position":{"x":29,"y":67}},{"type":"INTERIOR","position":{"x":7,"y":50}},
    {"type":"BATTERY","position":{"x":12,"y":63}},{"type":"ELECTRONIC","position":{"x":4,"y":56}},
    {"type":"LIGHTS","position":{"x":3,"y":61}},{"type":"DOORS","position":{"x":83,"y":33}},
    {"type":"RAMP","position":{"x":86,"y":48}},{"type":"LOAD","position":{"x":47,"y":60}},
    {"type":"COMPRESSOR","position":{"x":13,"y":59}},{"type":"ENGINE","position":{"x":8,"y":55}},
    {"type":"EXHAUST","position":{"x":14,"y":66}},{"type":"FUEL","position":{"x":23,"y":66}},
    {"type":"GEARBOX","position":{"x":5,"y":66}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_TIPPER_2A]: {
    name: 'Schwartzmueller 3 way tipper 2A tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T4x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_TIPPER_2A_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":71}},{"type":"SUSPENSION","position":{"x":53,"y":58}},
    {"type":"WHEELS","position":{"x":41,"y":66}},{"type":"BODY","position":{"x":23,"y":42}},
    {"type":"FRAME","position":{"x":35,"y":58}},{"type":"INTERIOR","position":{"x":7,"y":33}},
    {"type":"BATTERY","position":{"x":11,"y":49}},{"type":"ELECTRONIC","position":{"x":5,"y":44}},
    {"type":"LIGHTS","position":{"x":6,"y":51}},{"type":"DOORS","position":{"x":78,"y":33}},
    {"type":"LOAD","position":{"x":48,"y":39}},{"type":"COMPRESSOR","position":{"x":19,"y":48}},
    {"type":"ENGINE","position":{"x":14,"y":52}},{"type":"EXHAUST","position":{"x":22,"y":61}},
    {"type":"FUEL","position":{"x":29,"y":56}},{"type":"GEARBOX","position":{"x":10,"y":59}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_TIPPER_2A_1]: {
    name: 'Schwartzmueller 3 way tipper 2A tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T4x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_TIPPER_2A_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":69}},{"type":"SUSPENSION","position":{"x":59,"y":58}},
    {"type":"WHEELS","position":{"x":58,"y":66}},{"type":"BODY","position":{"x":72,"y":47}},
    {"type":"FRAME","position":{"x":65,"y":63}},{"type":"INTERIOR","position":{"x":90,"y":38}},
    {"type":"BATTERY","position":{"x":88,"y":49}},{"type":"ELECTRONIC","position":{"x":94,"y":47}},
    {"type":"LIGHTS","position":{"x":95,"y":55}},{"type":"DOORS","position":{"x":25,"y":46}},
    {"type":"LOAD","position":{"x":50,"y":46}},{"type":"COMPRESSOR","position":{"x":91,"y":54}},
    {"type":"ENGINE","position":{"x":86,"y":52}},{"type":"EXHAUST","position":{"x":83,"y":63}},
    {"type":"FUEL","position":{"x":75,"y":63}},{"type":"GEARBOX","position":{"x":90,"y":59}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_TIPPER_3A]: {
    name: 'Schwartzmueller 3 way tipper 3A tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T6x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_TIPPER_3A_IMG,
    parts: [{"type":"BRAKES","position":{"x":71,"y":68}},{"type":"SUSPENSION","position":{"x":61,"y":57}},
    {"type":"WHEELS","position":{"x":59,"y":69}},{"type":"BODY","position":{"x":30,"y":47}},
    {"type":"FRAME","position":{"x":34,"y":63}},{"type":"INTERIOR","position":{"x":9,"y":43}},
    {"type":"BATTERY","position":{"x":15,"y":53}},{"type":"ELECTRONIC","position":{"x":3,"y":50}},
    {"type":"LIGHTS","position":{"x":3,"y":59}},{"type":"DOORS","position":{"x":72,"y":41}},
    {"type":"LOAD","position":{"x":51,"y":48}},{"type":"COMPRESSOR","position":{"x":20,"y":55}},
    {"type":"ENGINE","position":{"x":4,"y":54}},{"type":"EXHAUST","position":{"x":22,"y":62}},
    {"type":"FUEL","position":{"x":24,"y":58}},{"type":"GEARBOX","position":{"x":7,"y":60}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_TIPPER_3A_1]: {
    name: 'Schwartzmueller 3 way tipper 3A tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T6x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_TIPPER_3A_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":61,"y":63}},{"type":"SUSPENSION","position":{"x":53,"y":55}},
    {"type":"WHEELS","position":{"x":52,"y":62}},{"type":"BODY","position":{"x":31,"y":43}},
    {"type":"FRAME","position":{"x":31,"y":57}},{"type":"INTERIOR","position":{"x":9,"y":39}},
    {"type":"BATTERY","position":{"x":16,"y":48}},{"type":"LIGHTS","position":{"x":5,"y":56}},
    {"type":"ELECTRONIC","position":{"x":4,"y":47}},{"type":"DOORS","position":{"x":77,"y":45}},
    {"type":"LOAD","position":{"x":54,"y":47}},{"type":"COMPRESSOR","position":{"x":19,"y":54}},
    {"type":"ENGINE","position":{"x":6,"y":51}},{"type":"EXHAUST","position":{"x":21,"y":59}},
    {"type":"FUEL","position":{"x":26,"y":56}},{"type":"GEARBOX","position":{"x":11,"y":58}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_TIPPER_3A_ALU]: {
    name: 'Schwartzmueller segment body aluminium tipper 3A tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T8x4,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_TIPPER_3A_ALU_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":68}},{"type":"SUSPENSION","position":{"x":48,"y":57}},
    {"type":"WHEELS","position":{"x":43,"y":66}},{"type":"BODY","position":{"x":27,"y":47}},
    {"type":"FRAME","position":{"x":34,"y":62}},{"type":"INTERIOR","position":{"x":9,"y":42}},
    {"type":"BATTERY","position":{"x":13,"y":52}},{"type":"LIGHTS","position":{"x":3,"y":57}},
    {"type":"ELECTRONIC","position":{"x":3,"y":49}},{"type":"DOORS","position":{"x":85,"y":42}},
    {"type":"LOAD","position":{"x":50,"y":47}},{"type":"HYDRAULIC","position":{"x":26,"y":53}},
    {"type":"COMPRESSOR","position":{"x":22,"y":54}},{"type":"ENGINE","position":{"x":7,"y":52}},
    {"type":"EXHAUST","position":{"x":28,"y":64}},{"type":"FUEL","position":{"x":29,"y":59}},
    {"type":"GEARBOX","position":{"x":10,"y":58}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_TIPPER_4A]: {
    name: 'Schwartzmueller steel segment body tipper 4A tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T8x4,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_TIPPER_4A_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":66}},{"type":"SUSPENSION","position":{"x":58,"y":56}},
    {"type":"WHEELS","position":{"x":60,"y":65}},{"type":"BODY","position":{"x":56,"y":41}},
    {"type":"FRAME","position":{"x":65,"y":62}},{"type":"INTERIOR","position":{"x":94,"y":39}},
    {"type":"BATTERY","position":{"x":85,"y":50}},{"type":"ELECTRONIC","position":{"x":86,"y":45}},
    {"type":"LIGHTS","position":{"x":96,"y":52}},{"type":"DOORS","position":{"x":18,"y":41}},
    {"type":"LOAD","position":{"x":49,"y":44}},{"type":"HYDRAULIC","position":{"x":78,"y":49}},
    {"type":"COMPRESSOR","position":{"x":93,"y":54}},{"type":"ENGINE","position":{"x":91,"y":49}},
    {"type":"EXHAUST","position":{"x":83,"y":59}},{"type":"FUEL","position":{"x":70,"y":60}},
    {"type":"GEARBOX","position":{"x":90,"y":58}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_TIPPER_4A_STEEL]: {
    name: 'Schwartzmueller steel segment body tipper 4A tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T8x4,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_TIPPER_4A_STEEL_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":66}},{"type":"SUSPENSION","position":{"x":48,"y":56}},
    {"type":"WHEELS","position":{"x":54,"y":64}},{"type":"BODY","position":{"x":73,"y":45}},
    {"type":"FRAME","position":{"x":73,"y":53}},{"type":"INTERIOR","position":{"x":88,"y":36}},
    {"type":"BATTERY","position":{"x":85,"y":48}},{"type":"ELECTRONIC","position":{"x":95,"y":45}},
    {"type":"LIGHTS","position":{"x":97,"y":54}},{"type":"DOORS","position":{"x":14,"y":37}},
    {"type":"HYDRAULIC","position":{"x":77,"y":51}},{"type":"LOAD","position":{"x":46,"y":48}},
    {"type":"COMPRESSOR","position":{"x":94,"y":57}},{"type":"ENGINE","position":{"x":92,"y":50}},
    {"type":"EXHAUST","position":{"x":82,"y":62}},{"type":"GEARBOX","position":{"x":89,"y":60}},
    {"type":"FUEL","position":{"x":65,"y":60}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_TRUCK_2A]: {
    name: 'Schwartzmueller platform construction 2A tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_TRUCK_2A_IMG,
    parts: [{"type":"BRAKES","position":{"x":41,"y":79}},{"type":"SUSPENSION","position":{"x":47,"y":68}},
    {"type":"WHEELS","position":{"x":50,"y":75}},{"type":"BODY","position":{"x":41,"y":47}},
    {"type":"FRAME","position":{"x":57,"y":71}},{"type":"INTERIOR","position":{"x":87,"y":46}},
    {"type":"BATTERY","position":{"x":85,"y":58}},{"type":"ELECTRONIC","position":{"x":96,"y":53}},
    {"type":"LIGHTS","position":{"x":97,"y":63}},{"type":"DOORS","position":{"x":16,"y":55}},
    {"type":"LOAD","position":{"x":54,"y":56}},{"type":"COMPRESSOR","position":{"x":94,"y":68}},
    {"type":"ENGINE","position":{"x":91,"y":58}},{"type":"EXHAUST","position":{"x":82,"y":70}},
    {"type":"FUEL","position":{"x":66,"y":72}},{"type":"GEARBOX","position":{"x":88,"y":71}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_TRUCK_2A_1]: {
    name: 'Schwartzmueller tarpaulin platform construction 2A tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_TRUCK_2A_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":57,"y":73}},{"type":"SUSPENSION","position":{"x":50,"y":65}},
    {"type":"WHEELS","position":{"x":46,"y":70}},{"type":"BODY","position":{"x":40,"y":53}},
    {"type":"FRAME","position":{"x":38,"y":66}},{"type":"INTERIOR","position":{"x":12,"y":43}},
    {"type":"BATTERY","position":{"x":14,"y":56}},{"type":"ELECTRONIC","position":{"x":5,"y":52}},
    {"type":"LIGHTS","position":{"x":5,"y":60}},{"type":"DOORS","position":{"x":82,"y":53}},
    {"type":"LOAD","position":{"x":47,"y":59}},{"type":"COMPRESSOR","position":{"x":20,"y":58}},
    {"type":"ENGINE","position":{"x":8,"y":56}},{"type":"EXHAUST","position":{"x":22,"y":67}},
    {"type":"FUEL","position":{"x":34,"y":65}},{"type":"GEARBOX","position":{"x":11,"y":63}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_TRUCK_3A]: {
    name: 'Schwartzmueller tarpaulin platform construction 3A tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_TRUCK_3A_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":70}},{"type":"SUSPENSION","position":{"x":44,"y":63}},
    {"type":"WHEELS","position":{"x":43,"y":70}},{"type":"BODY","position":{"x":38,"y":52}},
    {"type":"FRAME","position":{"x":39,"y":69}},{"type":"INTERIOR","position":{"x":14,"y":49}},
    {"type":"BATTERY","position":{"x":16,"y":59}},{"type":"ELECTRONIC","position":{"x":2,"y":56}},
    {"type":"LIGHTS","position":{"x":2,"y":65}},{"type":"DOORS","position":{"x":95,"y":54}},
    {"type":"LOAD","position":{"x":47,"y":56}},{"type":"COMPRESSOR","position":{"x":9,"y":60}},
    {"type":"ENGINE","position":{"x":5,"y":61}},{"type":"EXHAUST","position":{"x":19,"y":69}},
    {"type":"FUEL","position":{"x":27,"y":68}},{"type":"GEARBOX","position":{"x":4,"y":67}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANDEM_TRUCK_MEDIUM]: {
    name: 'Schwartzmueller platform construction medium tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANDEM_TRUCK_MEDIUM_IMG,
    parts: [{"type":"BRAKES","position":{"x":40,"y":78}},{"type":"SUSPENSION","position":{"x":46,"y":71}},
    {"type":"WHEELS","position":{"x":47,"y":76}},{"type":"BODY","position":{"x":62,"y":44}},
    {"type":"FRAME","position":{"x":63,"y":68}},{"type":"INTERIOR","position":{"x":89,"y":50}},
    {"type":"BATTERY","position":{"x":86,"y":61}},{"type":"ELECTRONIC","position":{"x":94,"y":58}},
    {"type":"LIGHTS","position":{"x":97,"y":63}},{"type":"DOORS","position":{"x":12,"y":51}},
    {"type":"LOAD","position":{"x":52,"y":54}},{"type":"COMPRESSOR","position":{"x":89,"y":65}},
    {"type":"ENGINE","position":{"x":92,"y":62}},{"type":"EXHAUST","position":{"x":84,"y":69}},
    {"type":"FUEL","position":{"x":71,"y":70}},{"type":"GEARBOX","position":{"x":93,"y":68}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANK_SEMI]: {
    name: 'Schwartzmueller 3 axle aluminium tank semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANK_SEMI_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":65}},{"type":"SUSPENSION","position":{"x":21,"y":56}},
    {"type":"WHEELS","position":{"x":18,"y":62}},{"type":"BODY","position":{"x":39,"y":46}},
    {"type":"FRAME","position":{"x":35,"y":61}},{"type":"SUPPORT","position":{"x":50,"y":71}},
    {"type":"LIGHTS","position":{"x":3,"y":58}},{"type":"DOORS","position":{"x":76,"y":31}},
    {"type":"LOAD","position":{"x":52,"y":53}},{"type":"TRAILER_ATTACHMENT","position":{"x":76,"y":59}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANK_SEMI_1]: {
    name: 'Schwartzmueller 3 axle aluminium tank semi trailer w/ dipsticks',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANK_SEMI_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":43,"y":73}},{"type":"SUSPENSION","position":{"x":51,"y":59}},
    {"type":"WHEELS","position":{"x":53,"y":67}},{"type":"BODY","position":{"x":54,"y":39}},
    {"type":"FRAME","position":{"x":69,"y":52}},{"type":"SUPPORT","position":{"x":88,"y":59}},
    {"type":"LIGHTS","position":{"x":23,"y":73}},{"type":"DOORS","position":{"x":72,"y":28}},
    {"type":"LOAD","position":{"x":51,"y":50}},{"type":"TRAILER_ATTACHMENT","position":{"x":95,"y":49}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANK_SEMI_2]: {
    name: 'Schwartzmueller 3 axle aluminium tank semi trailer w/ pump',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_3_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANK_SEMI_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":16,"y":64}},{"type":"SUSPENSION","position":{"x":20,"y":57}},
    {"type":"WHEELS","position":{"x":21,"y":65}},{"type":"BODY","position":{"x":48,"y":45}},
    {"type":"FRAME","position":{"x":55,"y":55}},{"type":"SUPPORT","position":{"x":77,"y":64}},
    {"type":"LIGHTS","position":{"x":3,"y":62}},{"type":"DOORS","position":{"x":61,"y":35}},
    {"type":"LOAD","position":{"x":62,"y":49}},{"type":"TRAILER_ATTACHMENT","position":{"x":90,"y":52}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANK_TANDEM]: {
    name: 'Schwartzmueller 3 axle aluminium tank tandem trailer',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].TANK_1_2_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANK_TANDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":73,"y":61}},{"type":"SUSPENSION","position":{"x":78,"y":52}},
    {"type":"WHEELS","position":{"x":79,"y":57}},{"type":"BODY","position":{"x":52,"y":46}},
    {"type":"FRAME","position":{"x":53,"y":54}},{"type":"LIGHTS","position":{"x":95,"y":52}},
    {"type":"DOORS","position":{"x":39,"y":31}},{"type":"LOAD","position":{"x":59,"y":47}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":58}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANK_TANDEM_1]: {
    name: 'Schwartzmueller 3 axle aluminium tank tandem trailer',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].TANK_1_2_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANK_TANDEM_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":84,"y":68}},{"type":"SUSPENSION","position":{"x":88,"y":57}},
    {"type":"WHEELS","position":{"x":89,"y":62}},{"type":"BODY","position":{"x":56,"y":40}},
    {"type":"FRAME","position":{"x":68,"y":57}},{"type":"LIGHTS","position":{"x":97,"y":58}},
    {"type":"DOORS","position":{"x":55,"y":23}},{"type":"LOAD","position":{"x":74,"y":47}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":4,"y":72}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANK_TANDEM_2]: {
    name: 'Schwartzmueller 2 axle aluminium tank tandem trailer',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].TANK_1_1_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANK_TANDEM_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":34,"y":73}},{"type":"SUSPENSION","position":{"x":39,"y":59}},
    {"type":"WHEELS","position":{"x":44,"y":69}},{"type":"BODY","position":{"x":50,"y":40}},
    {"type":"FRAME","position":{"x":55,"y":61}},{"type":"LIGHTS","position":{"x":24,"y":67}},
    {"type":"DOORS","position":{"x":49,"y":24}},{"type":"LOAD","position":{"x":61,"y":45}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":95,"y":55}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANK_TANDEM_3]: {
    name: 'Schwartzmueller 2 axle aluminium tank tandem trailer',
    type: EEquipmentModelType.TANDEM_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM_TRAILER].TANK_1_1_AXLES,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANK_TANDEM_3_IMG,
    parts: [{"type":"BRAKES","position":{"x":59,"y":78}},{"type":"SUSPENSION","position":{"x":67,"y":61}},
    {"type":"WHEELS","position":{"x":68,"y":70}},{"type":"BODY","position":{"x":73,"y":46}},
    {"type":"FRAME","position":{"x":76,"y":62}},{"type":"LIGHTS","position":{"x":96,"y":59}},
    {"type":"DOORS","position":{"x":61,"y":24}},{"type":"LOAD","position":{"x":79,"y":47}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":2,"y":71}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANK_TANDEM_TRUCK]: {
    name: 'Schwartzmueller Aluminium tank 2A side cabinet tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TANK_T4x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANK_TANDEM_TRUCK_IMG,
    parts: [{"type":"BRAKES","position":{"x":22,"y":67}},{"type":"SUSPENSION","position":{"x":30,"y":58}},
    {"type":"WHEELS","position":{"x":31,"y":66}},{"type":"BODY","position":{"x":46,"y":42}},
    {"type":"FRAME","position":{"x":41,"y":60}},{"type":"LIGHTS","position":{"x":94,"y":57}},
    {"type":"BATTERY","position":{"x":72,"y":51}},{"type":"ELECTRONIC","position":{"x":94,"y":48}},
    {"type":"DOORS","position":{"x":32,"y":30}},{"type":"LOAD","position":{"x":34,"y":46}},
    {"type":"COMPRESSOR","position":{"x":92,"y":53}},{"type":"ENGINE","position":{"x":86,"y":51}},
    {"type":"EXHAUST","position":{"x":72,"y":61}},{"type":"FUEL","position":{"x":65,"y":56}},
    {"type":"GEARBOX","position":{"x":83,"y":60}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANK_TANDEM_TRUCK_1]: {
    name: 'Schwartzmueller Aluminium tank 2A rear cabinet tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TANK_T4x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANK_TANDEM_TRUCK_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":61,"y":77}},{"type":"SUSPENSION","position":{"x":66,"y":59}},
    {"type":"WHEELS","position":{"x":72,"y":73}},{"type":"BODY","position":{"x":61,"y":47}},
    {"type":"FRAME","position":{"x":72,"y":54}},{"type":"BATTERY","position":{"x":84,"y":50}},
    {"type":"ELECTRONIC","position":{"x":93,"y":45}},{"type":"LIGHTS","position":{"x":94,"y":56}},
    {"type":"DOORS","position":{"x":29,"y":48}},{"type":"LOAD","position":{"x":53,"y":50}},
    {"type":"COMPRESSOR","position":{"x":92,"y":50}},{"type":"ENGINE","position":{"x":87,"y":54}},
    {"type":"EXHAUST","position":{"x":84,"y":66}},{"type":"FUEL","position":{"x":77,"y":63}},
    {"type":"GEARBOX","position":{"x":90,"y":63}}]
  },
  [EEquipmentModel.SCHWARZMUELLER_TANK_TANDEM_TRUCK_2]: {
    name: 'Schwartzmueller Aluminium tank 3A side cabinet tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TANK_T6x2,
    brand: EBrand.SCHWARZMUELLER,
    image: SCHWARZMUELLER_TANK_TANDEM_TRUCK_2_IMG,
    parts: [{"type":"BRAKES","position":{"x":50,"y":74}},{"type":"SUSPENSION","position":{"x":57,"y":62}},
    {"type":"WHEELS","position":{"x":59,"y":68}},{"type":"BODY","position":{"x":45,"y":45}},
    {"type":"FRAME","position":{"x":44,"y":76}},{"type":"BATTERY","position":{"x":85,"y":50}},
    {"type":"ELECTRONIC","position":{"x":94,"y":45}},{"type":"LIGHTS","position":{"x":95,"y":58}},
    {"type":"DOORS","position":{"x":47,"y":26}},{"type":"LOAD","position":{"x":62,"y":46}},
    {"type":"COMPRESSOR","position":{"x":94,"y":51}},{"type":"ENGINE","position":{"x":90,"y":51}},
    {"type":"EXHAUST","position":{"x":85,"y":65}},{"type":"FUEL","position":{"x":80,"y":62}},
    {"type":"GEARBOX","position":{"x":91,"y":58}}]
  },
  [EEquipmentModel.SDC_BOXVAN_ALU]: {
    name: 'SDC Aluminium Box Van semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_BOXVAN_ALU_IMG,
    parts: [{"type":"BRAKES","position":{"x":79,"y":74}},{"type":"SUSPENSION","position":{"x":81,"y":67}},
    {"type":"WHEELS","position":{"x":85,"y":71}},{"type":"BODY","position":{"x":41,"y":58}},
    {"type":"FRAME","position":{"x":65,"y":70}},{"type":"SUPPORT","position":{"x":56,"y":78}},
    {"type":"LIGHTS","position":{"x":94,"y":69}},{"type":"DOORS","position":{"x":95,"y":58}},
    {"type":"LOAD","position":{"x":65,"y":60}},{"type":"TRAILER_ATTACHMENT","position":{"x":19,"y":68}}]
  },
  [EEquipmentModel.SDC_BOXVAN_DOUBLE_DECK]: {
    name: 'SDC Double-Deck Box Van semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_BOXVAN_DOUBLE_DECK_IMG,
    parts: [{"type":"BRAKES","position":{"x":17,"y":80}},{"type":"SUSPENSION","position":{"x":11,"y":75}},
    {"type":"WHEELS","position":{"x":11,"y":81}},{"type":"BODY","position":{"x":23,"y":59}},
    {"type":"FRAME","position":{"x":26,"y":77}},{"type":"SUPPORT","position":{"x":35,"y":87}},
    {"type":"LIGHTS","position":{"x":3,"y":73}},{"type":"DOORS","position":{"x":6,"y":61}},
    {"type":"LOAD","position":{"x":39,"y":70}},{"type":"TRAILER_ATTACHMENT","position":{"x":67,"y":73}}]
  },
  [EEquipmentModel.SDC_BOXVAN_GRP]: {
    name: 'SDC GRP Box Van semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_BOXVAN_GRP_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":79}},{"type":"SUSPENSION","position":{"x":56,"y":70}},
    {"type":"WHEELS","position":{"x":57,"y":78}},{"type":"BODY","position":{"x":53,"y":58}},
    {"type":"FRAME","position":{"x":47,"y":71}},{"type":"SUPPORT","position":{"x":87,"y":74}},
    {"type":"LIGHTS","position":{"x":22,"y":70}},{"type":"DOORS","position":{"x":18,"y":50}},
    {"type":"LOAD","position":{"x":63,"y":57}},{"type":"RAMP","position":{"x":27,"y":80}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":90,"y":63}}]
  },
  [EEquipmentModel.SDC_BOXVAN_URBAN]: {
    name: 'SDC Urban Box Van semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_BOXVAN_URBAN_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":82}},{"type":"SUSPENSION","position":{"x":57,"y":74}},
    {"type":"WHEELS","position":{"x":59,"y":82}},{"type":"BODY","position":{"x":62,"y":53}},
    {"type":"FRAME","position":{"x":68,"y":73}},{"type":"SUPPORT","position":{"x":86,"y":74}},
    {"type":"LIGHTS","position":{"x":31,"y":82}},{"type":"DOORS","position":{"x":21,"y":44}},
    {"type":"LOAD","position":{"x":70,"y":65}},{"type":"RAMP","position":{"x":17,"y":73}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":89,"y":62}}]
  },
  [EEquipmentModel.SDC_CURTAIN]: {
    name: 'SDC curtain sider semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_CURTAIN_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":78}},{"type":"SUSPENSION","position":{"x":60,"y":67}},
    {"type":"WHEELS","position":{"x":61,"y":77}},{"type":"BODY","position":{"x":58,"y":41}},
    {"type":"FRAME","position":{"x":47,"y":70}},{"type":"SUPPORT","position":{"x":88,"y":71}},
    {"type":"LIGHTS","position":{"x":36,"y":79}},{"type":"DOORS","position":{"x":22,"y":56}},
    {"type":"LOAD","position":{"x":62,"y":60}},{"type":"TRAILER_ATTACHMENT","position":{"x":94,"y":60}}]
  },
  [EEquipmentModel.SDC_CURTAIN_CHIPLINER]: {
    name: 'SDC curtain sider chipliner semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_CURTAIN_CHIPLINER_IMG,
    parts: [{"type":"BRAKES","position":{"x":19,"y":77}},{"type":"SUSPENSION","position":{"x":16,"y":69}},
    {"type":"WHEELS","position":{"x":14,"y":75}},{"type":"BODY","position":{"x":21,"y":55}},
    {"type":"FRAME","position":{"x":28,"y":72}},{"type":"SUPPORT","position":{"x":38,"y":82}},
    {"type":"LIGHTS","position":{"x":6,"y":71}},{"type":"DOORS","position":{"x":6,"y":58}},
    {"type":"LOAD","position":{"x":38,"y":65}},{"type":"TRAILER_ATTACHMENT","position":{"x":67,"y":76}}]
  },
  [EEquipmentModel.SDC_CURTAIN_COILWELL]: {
    name: 'SDC curtain sider coilwell semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_CURTAIN_COILWELL_IMG,
    parts: [{"type":"BRAKES","position":{"x":68,"y":80}},{"type":"SUSPENSION","position":{"x":73,"y":69}},
    {"type":"WHEELS","position":{"x":76,"y":78}},{"type":"BODY","position":{"x":70,"y":37}},
    {"type":"FRAME","position":{"x":65,"y":71}},{"type":"SUPPORT","position":{"x":85,"y":72}},
    {"type":"LIGHTS","position":{"x":61,"y":84}},{"type":"DOORS","position":{"x":34,"y":64}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":86,"y":62}},{"type":"LOAD","position":{"x":61,"y":61}}]
  },
  [EEquipmentModel.SDC_CURTAIN_DOUBLE_DECK]: {
    name: 'SDC curtain sider double deck semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_CURTAIN_DOUBLE_DECK_IMG,
    parts: [{"type":"BRAKES","position":{"x":78,"y":73}},{"type":"SUSPENSION","position":{"x":84,"y":67}},
    {"type":"WHEELS","position":{"x":83,"y":73}},{"type":"BODY","position":{"x":41,"y":42}},
    {"type":"FRAME","position":{"x":62,"y":73}},{"type":"SUPPORT","position":{"x":53,"y":78}},
    {"type":"LIGHTS","position":{"x":93,"y":68}},{"type":"DOORS","position":{"x":94,"y":54}},
    {"type":"LOAD","position":{"x":65,"y":61}},{"type":"TRAILER_ATTACHMENT","position":{"x":29,"y":69}}]
  },
  [EEquipmentModel.SDC_CURTAIN_EUROLINER]: {
    name: 'SDC curtain sider euroliner semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_CURTAIN_EUROLINER_IMG,
    parts: [{"type":"BRAKES","position":{"x":29,"y":70}},{"type":"SUSPENSION","position":{"x":25,"y":63}},
    {"type":"WHEELS","position":{"x":24,"y":68}},{"type":"BODY","position":{"x":20,"y":54}},
    {"type":"FRAME","position":{"x":39,"y":63}},{"type":"SUPPORT","position":{"x":56,"y":73}},
    {"type":"LIGHTS","position":{"x":4,"y":67}},{"type":"DOORS","position":{"x":7,"y":56}},
    {"type":"LOAD","position":{"x":49,"y":60}},{"type":"TRAILER_ATTACHMENT","position":{"x":81,"y":64}}]
  },
  [EEquipmentModel.SDC_CURTAIN_INSULINER]: {
    name: 'SDC curtain sider insuliner semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_CURTAIN_INSULINER_IMG,
    parts: [{"type":"BRAKES","position":{"x":18,"y":78}},{"type":"SUSPENSION","position":{"x":15,"y":70}},
    {"type":"WHEELS","position":{"x":10,"y":77}},{"type":"BODY","position":{"x":24,"y":58}},
    {"type":"FRAME","position":{"x":32,"y":73}},{"type":"SUPPORT","position":{"x":38,"y":86}},
    {"type":"LIGHTS","position":{"x":4,"y":72}},{"type":"DOORS","position":{"x":10,"y":56}},
    {"type":"FRIGO","position":{"x":67,"y":41}},{"type":"LOAD","position":{"x":39,"y":60}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":75,"y":72}}]
  },
  [EEquipmentModel.SDC_CURTAIN_MEGA]: {
    name: 'SDC curtain sider mega semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_CURTAIN_MEGA_IMG,
    parts: [{"type":"BRAKES","position":{"x":38,"y":77}},{"type":"SUSPENSION","position":{"x":31,"y":70}},
    {"type":"WHEELS","position":{"x":30,"y":76}},{"type":"BODY","position":{"x":24,"y":57}},
    {"type":"FRAME","position":{"x":19,"y":70}},{"type":"SUPPORT","position":{"x":15,"y":76}},
    {"type":"LIGHTS","position":{"x":75,"y":76}},{"type":"DOORS","position":{"x":78,"y":52}},
    {"type":"LOAD","position":{"x":37,"y":61}},{"type":"TRAILER_ATTACHMENT","position":{"x":11,"y":69}}]
  },
  [EEquipmentModel.SDC_CURTAIN_URBAN]: {
    name: 'SDC curtain sider urban semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_CURTAIN_URBAN_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":82}},{"type":"SUSPENSION","position":{"x":39,"y":69}},
    {"type":"WHEELS","position":{"x":40,"y":78}},{"type":"BODY","position":{"x":28,"y":53}},
    {"type":"FRAME","position":{"x":31,"y":66}},{"type":"SUPPORT","position":{"x":18,"y":76}},
    {"type":"LIGHTS","position":{"x":69,"y":81}},{"type":"DOORS","position":{"x":89,"y":52}},
    {"type":"LOAD","position":{"x":40,"y":59}},{"type":"TRAILER_ATTACHMENT","position":{"x":9,"y":67}}]
  },
  [EEquipmentModel.SDC_PLATFORM]: {
    name: 'SDC flatbed platform semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_PLATFORM_IMG,
    parts: [{"type":"BRAKES","position":{"x":85,"y":72}},{"type":"SUSPENSION","position":{"x":89,"y":65}},
    {"type":"WHEELS","position":{"x":92,"y":71}},{"type":"FRAME","position":{"x":68,"y":62}},
    {"type":"SUPPORT","position":{"x":75,"y":81}},{"type":"LIGHTS","position":{"x":97,"y":65}},
    {"type":"LOAD","position":{"x":75,"y":61}},{"type":"TRAILER_ATTACHMENT","position":{"x":37,"y":67}}]
  },
  [EEquipmentModel.SDC_PLATFORM_EXTENDABLE]: {
    name: 'SDC flatbed extendable platform semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_PLATFORM_EXTENDABLE_IMG,
    parts: [{"type":"BRAKES","position":{"x":87,"y":52}},{"type":"SUSPENSION","position":{"x":90,"y":48}},
    {"type":"WHEELS","position":{"x":92,"y":53}},{"type":"FRAME","position":{"x":53,"y":57}},
    {"type":"SUPPORT","position":{"x":52,"y":69}},{"type":"LIGHTS","position":{"x":96,"y":46}},
    {"type":"LOAD","position":{"x":60,"y":52}},{"type":"TRAILER_ATTACHMENT","position":{"x":22,"y":64}}]
  },
  [EEquipmentModel.SDC_PLATFORM_OIL_SPEC]: {
    name: 'SDC flatbed oil-spec platform semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_PLATFORM_OIL_SPEC_IMG,
    parts: [{"type":"BRAKES","position":{"x":58,"y":59}},{"type":"SUSPENSION","position":{"x":65,"y":47}},
    {"type":"WHEELS","position":{"x":66,"y":56}},{"type":"FRAME","position":{"x":80,"y":46}},
    {"type":"SUPPORT","position":{"x":86,"y":57}},{"type":"LIGHTS","position":{"x":36,"y":55}},
    {"type":"LOAD","position":{"x":63,"y":42}},{"type":"TRAILER_ATTACHMENT","position":{"x":92,"y":46}}]
  },
  [EEquipmentModel.SDC_PLATFORM_PSK]: {
    name: 'SDC flatbed platform psk semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_PLATFORM_PSK_IMG,
    parts: [{"type":"BRAKES","position":{"x":75,"y":59}},{"type":"SUSPENSION","position":{"x":80,"y":52}},
    {"type":"WHEELS","position":{"x":81,"y":56}},{"type":"FRAME","position":{"x":38,"y":57}},
    {"type":"SUPPORT","position":{"x":57,"y":67}},{"type":"LIGHTS","position":{"x":95,"y":52}},
    {"type":"LOAD","position":{"x":56,"y":52}},{"type":"TRAILER_ATTACHMENT","position":{"x":26,"y":59}}]
  },
  [EEquipmentModel.SDC_PLATFORM_STEP_FRAME]: {
    name: 'SDC flatbed platform step frame semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_PLATFORM_STEP_FRAME_IMG,
    parts: [{"type":"BRAKES","position":{"x":16,"y":60}},{"type":"SUSPENSION","position":{"x":12,"y":54}},
    {"type":"WHEELS","position":{"x":11,"y":60}},{"type":"FRAME","position":{"x":22,"y":54}},
    {"type":"SUPPORT","position":{"x":30,"y":67}},{"type":"LIGHTS","position":{"x":5,"y":53}},
    {"type":"LOAD","position":{"x":39,"y":49}},{"type":"TRAILER_ATTACHMENT","position":{"x":73,"y":57}}]
  },
  [EEquipmentModel.SDC_SKELETAL_EXTANDABLE]: {
    name: 'SDC skeletal extendable semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_SKELETAL_EXTANDABLE_IMG,
    parts: [{"type":"BRAKES","position":{"x":61,"y":57}},{"type":"SUSPENSION","position":{"x":69,"y":52}},
    {"type":"WHEELS","position":{"x":67,"y":61}},{"type":"FRAME","position":{"x":31,"y":43}},
    {"type":"SUPPORT","position":{"x":16,"y":47}},{"type":"LIGHTS","position":{"x":85,"y":61}},
    {"type":"LOAD","position":{"x":60,"y":46}},{"type":"TRAILER_ATTACHMENT","position":{"x":15,"y":34}}]
  },
  [EEquipmentModel.SDC_SKELETAL_FIXED]: {
    name: 'SDC skeletal fixed semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_SKELETAL_FIXED_IMG,
    parts: [{"type":"BRAKES","position":{"x":79,"y":58}},{"type":"WHEELS","position":{"x":84,"y":56}},
    {"type":"SUSPENSION","position":{"x":80,"y":51}},{"type":"FRAME","position":{"x":33,"y":50}},
    {"type":"LIGHTS","position":{"x":95,"y":51}},{"type":"SUPPORT","position":{"x":56,"y":63}},
    {"type":"LOAD","position":{"x":60,"y":47}},{"type":"TRAILER_ATTACHMENT","position":{"x":21,"y":51}}]
  },
  [EEquipmentModel.SDC_SKELETAL_FIXED_GOOSENECK]: {
    name: 'SDC skeletal fixed gooseneck semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_SKELETAL_FIXED_GOOSENECK_IMG,
    parts: [{"type":"BRAKES","position":{"x":83,"y":58}},{"type":"SUSPENSION","position":{"x":85,"y":51}},
    {"type":"WHEELS","position":{"x":90,"y":53}},{"type":"FRAME","position":{"x":58,"y":46}},
    {"type":"SUPPORT","position":{"x":61,"y":65}},{"type":"LIGHTS","position":{"x":98,"y":49}},
    {"type":"LOAD","position":{"x":70,"y":49}},{"type":"TRAILER_ATTACHMENT","position":{"x":21,"y":53}}]
  },
  [EEquipmentModel.SDC_SKELETAL_GOOSENECK_EXTENDING]: {
    name: 'SDC skeletal extendable fixed gooseneck semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_SKELETAL_GOOSENECK_EXTENDING_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":61}},{"type":"SUSPENSION","position":{"x":51,"y":56}},
    {"type":"WHEELS","position":{"x":66,"y":61}},{"type":"FRAME","position":{"x":59,"y":42}},
    {"type":"SUPPORT","position":{"x":86,"y":37}},{"type":"LIGHTS","position":{"x":41,"y":73}},
    {"type":"LOAD","position":{"x":50,"y":42}},{"type":"TRAILER_ATTACHMENT","position":{"x":85,"y":24}}]
  },
  [EEquipmentModel.SDC_SKELETAL_ISO_TANK]: {
    name: 'SDC skeletal iso tank semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_SKELETAL_ISO_TANK_IMG,
    parts: [{"type":"BRAKES","position":{"x":60,"y":56}},{"type":"SUSPENSION","position":{"x":63,"y":47}},
    {"type":"WHEELS","position":{"x":69,"y":53}},{"type":"FRAME","position":{"x":67,"y":36}},
    {"type":"SUPPORT","position":{"x":86,"y":41}},{"type":"LIGHTS","position":{"x":33,"y":65}},
    {"type":"LOAD","position":{"x":58,"y":32}},{"type":"TRAILER_ATTACHMENT","position":{"x":92,"y":25}}]
  },
  [EEquipmentModel.SDC_SKELETAL_TIPPING]: {
    name: 'SDC skeletal tipping semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.SDC_TRAILERS,
    image: SDC_SKELETAL_TIPPING_IMG,
    parts: [{"type":"BRAKES","position":{"x":56,"y":65}},{"type":"SUSPENSION","position":{"x":55,"y":55}},
    {"type":"WHEELS","position":{"x":67,"y":62}},{"type":"FRAME","position":{"x":59,"y":42}},
    {"type":"SUPPORT","position":{"x":89,"y":50}},{"type":"LIGHTS","position":{"x":29,"y":64}},
    {"type":"LOAD","position":{"x":40,"y":42}},{"type":"TRAILER_ATTACHMENT","position":{"x":95,"y":41}}]
  },
  [EEquipmentModel.STAS_TIPPER_AGGREGATE_STAR]: {
    name: 'STAS Tipper Aggregate Star semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.STAS,
    image: STAS_TIPPER_AGGREGATE_STAR_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":70}},{"type":"SUSPENSION","position":{"x":49,"y":64}},
    {"type":"WHEELS","position":{"x":55,"y":67}},{"type":"BODY","position":{"x":55,"y":51}},
    {"type":"FRAME","position":{"x":63,"y":57}},{"type":"SUPPORT","position":{"x":80,"y":69}},
    {"type":"LIGHTS","position":{"x":31,"y":68}},{"type":"DOORS","position":{"x":19,"y":47}},
    {"type":"HYDRAULIC","position":{"x":25,"y":44}},{"type":"LOAD","position":{"x":66,"y":51}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":90,"y":54}}]
  },
  [EEquipmentModel.STAS_TIPPER_BUILD_STARX]: {
    name: 'STAS Tipper Build Star X semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.STAS,
    image: STAS_TIPPER_BUILD_STARX_IMG,
    parts: [{"type":"BRAKES","position":{"x":19,"y":72}},{"type":"SUSPENSION","position":{"x":15,"y":66}},
    {"type":"WHEELS","position":{"x":13,"y":70}},{"type":"BODY","position":{"x":33,"y":49}},
    {"type":"FRAME","position":{"x":28,"y":59}},{"type":"SUPPORT","position":{"x":32,"y":79}},
    {"type":"LIGHTS","position":{"x":3,"y":63}},{"type":"DOORS","position":{"x":4,"y":52}},
    {"type":"HYDRAULIC","position":{"x":7,"y":48}},{"type":"LOAD","position":{"x":24,"y":50}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":66,"y":63}}]
  },
  [EEquipmentModel.STAS_TIPPER_ROCK_STAR]: {
    name: 'STAS Tipper Rock Star semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.STAS,
    image: STAS_TIPPER_ROCK_STAR_IMG,
    parts: [{"type":"BRAKES","position":{"x":27,"y":68}},{"type":"SUSPENSION","position":{"x":19,"y":60}},
    {"type":"WHEELS","position":{"x":20,"y":66}},{"type":"BODY","position":{"x":25,"y":41}},
    {"type":"FRAME","position":{"x":32,"y":53}},{"type":"SUPPORT","position":{"x":38,"y":75}},
    {"type":"LIGHTS","position":{"x":5,"y":58}},{"type":"DOORS","position":{"x":8,"y":47}},
    {"type":"HYDRAULIC","position":{"x":9,"y":42}},{"type":"LOAD","position":{"x":36,"y":48}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":64,"y":59}}]
  },
  [EEquipmentModel.STAS_TIPPER_U_ROCKSTAR]: {
    name: 'STAS Tipper U Rock Star semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.STAS,
    image: STAS_TIPPER_U_ROCKSTAR_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":68}},{"type":"SUSPENSION","position":{"x":18,"y":59}},
    {"type":"WHEELS","position":{"x":17,"y":67}},{"type":"FRAME","position":{"x":32,"y":52}},
    {"type":"BODY","position":{"x":34,"y":43}},{"type":"SUPPORT","position":{"x":39,"y":73}},
    {"type":"LIGHTS","position":{"x":1,"y":60}},{"type":"DOORS","position":{"x":4,"y":48}},
    {"type":"HYDRAULIC","position":{"x":11,"y":43}},{"type":"LOAD","position":{"x":44,"y":50}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":69,"y":61}}]
  },
  [EEquipmentModel.STOUGHTON_TRAILERS_CHASSIS]: {
    name: 'Stoughton Trailer Chassis semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_2_AXLES,
    brand: EBrand.STOUGHTON,
    image: STOUGHTON_TRAILERS_CHASSIS_IMG,
    parts: [{"type":"BRAKES","position":{"x":88,"y":37}},{"type":"SUSPENSION","position":{"x":88,"y":33}},
    {"type":"WHEELS","position":{"x":93,"y":36}},{"type":"FRAME","position":{"x":64,"y":43}},
    {"type":"SUPPORT","position":{"x":54,"y":62}},{"type":"LIGHTS","position":{"x":96,"y":29}},
    {"type":"LOAD","position":{"x":56,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":23,"y":64}}]
  },
  [EEquipmentModel.STOUGHTON_TRAILERS_REEFER_PUREBLUE]: {
    name: 'Stoughton Reefer PureBlue semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_2_AXLES,
    brand: EBrand.STOUGHTON,
    image: STOUGHTON_TRAILERS_REEFER_PUREBLUE_IMG,
    parts: [{"type":"BRAKES","position":{"x":41,"y":72}},{"type":"SUSPENSION","position":{"x":43,"y":65}},
    {"type":"WHEELS","position":{"x":48,"y":70}},{"type":"BODY","position":{"x":36,"y":52}},
    {"type":"FRAME","position":{"x":55,"y":61}},{"type":"SUPPORT","position":{"x":87,"y":66}},
    {"type":"LIGHTS","position":{"x":15,"y":66}},{"type":"DOORS","position":{"x":9,"y":52}},
    {"type":"FRIGO","position":{"x":96,"y":47}},{"type":"LOAD","position":{"x":64,"y":48}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":92,"y":60}}]
  },
  [EEquipmentModel.STOUGHTON_TRAILERS_SEMI_TRAILER_EXTRA_WIDE]: {
    name: 'Stoughton Extra Wide semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.STOUGHTON,
    image: STOUGHTON_TRAILERS_SEMI_TRAILER_EXTRA_WIDE_IMG,
    parts: [{"type":"BRAKES","position":{"x":41,"y":73}},{"type":"SUSPENSION","position":{"x":44,"y":63}},
    {"type":"WHEELS","position":{"x":53,"y":70}},{"type":"BODY","position":{"x":59,"y":39}},
    {"type":"FRAME","position":{"x":69,"y":62}},{"type":"SUPPORT","position":{"x":87,"y":68}},
    {"type":"LIGHTS","position":{"x":22,"y":67}},{"type":"LOAD","position":{"x":52,"y":50}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":93,"y":62}}]
  },
  [EEquipmentModel.STOUGHTON_TRAILERS_SEMI_TRAILER_TOUGH_PLATE]: {
    name: 'Stoughton Tough Plate semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.STOUGHTON,
    image: STOUGHTON_TRAILERS_SEMI_TRAILER_TOUGH_PLATE_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":77}},{"type":"SUSPENSION","position":{"x":42,"y":70}},
    {"type":"WHEELS","position":{"x":38,"y":76}},{"type":"BODY","position":{"x":40,"y":60}},
    {"type":"FRAME","position":{"x":28,"y":65}},{"type":"SUPPORT","position":{"x":9,"y":70}},
    {"type":"LIGHTS","position":{"x":74,"y":72}},{"type":"DOORS","position":{"x":87,"y":52}},
    {"type":"LOAD","position":{"x":26,"y":56}},{"type":"TRAILER_ATTACHMENT","position":{"x":8,"y":63}}]
  },
  [EEquipmentModel.STOUGHTON_TRAILERS_SEMI_TRAILER_Z_PLATE]: {
    name: 'Stoughton Z Plate semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.STOUGHTON,
    image: STOUGHTON_TRAILERS_SEMI_TRAILER_Z_PLATE_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":59}},{"type":"SUSPENSION","position":{"x":20,"y":57}},
    {"type":"WHEELS","position":{"x":19,"y":61}},{"type":"BODY","position":{"x":31,"y":50}},
    {"type":"FRAME","position":{"x":41,"y":53}},{"type":"SUPPORT","position":{"x":76,"y":62}},
    {"type":"LIGHTS","position":{"x":2,"y":55}},{"type":"DOORS","position":{"x":3,"y":47}},
    {"type":"LOAD","position":{"x":50,"y":49}},{"type":"TRAILER_ATTACHMENT","position":{"x":90,"y":55}}]
  },
  [EEquipmentModel.STRICK_TRAILERS_SEMI_TRAILER_COMPOSITE]: {
    name: 'Strick Composite semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.STRICK,
    image: STRICK_TRAILERS_SEMI_TRAILER_COMPOSITE_IMG,
    parts: [{"type":"BRAKES","position":{"x":12,"y":61}},{"type":"SUSPENSION","position":{"x":9,"y":57}},
    {"type":"WHEELS","position":{"x":7,"y":61}},{"type":"BODY","position":{"x":27,"y":53}},
    {"type":"FRAME","position":{"x":28,"y":58}},{"type":"SUPPORT","position":{"x":59,"y":68}},
    {"type":"LIGHTS","position":{"x":1,"y":58}},{"type":"DOORS","position":{"x":3,"y":50}},
    {"type":"LOAD","position":{"x":41,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":81,"y":59}}]
  },
  [EEquipmentModel.STRICK_TRAILERS_SEMI_TRAILER_SHEET_POST]: {
    name: 'Strick Sheet Post semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.STRICK,
    image: STRICK_TRAILERS_SEMI_TRAILER_SHEET_POST_IMG,
    parts: [{"type":"BRAKES","position":{"x":23,"y":64}},{"type":"SUSPENSION","position":{"x":19,"y":60}},
    {"type":"WHEELS","position":{"x":17,"y":63}},{"type":"BODY","position":{"x":40,"y":52}},
    {"type":"FRAME","position":{"x":38,"y":57}},{"type":"SUPPORT","position":{"x":64,"y":67}},
    {"type":"LIGHTS","position":{"x":5,"y":58}},{"type":"DOORS","position":{"x":7,"y":52}},
    {"type":"LOAD","position":{"x":45,"y":49}},{"type":"TRAILER_ATTACHMENT","position":{"x":84,"y":58}}]
  },
  [EEquipmentModel.STRICK_TRAILERS_TANDEM_4x2]: {
    name: 'Strick tandem',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_big,
    brand: EBrand.STRICK,
    image: STRICK_TRAILERS_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":84,"y":60}},{"type":"SUSPENSION","position":{"x":89,"y":53}},
    {"type":"WHEELS","position":{"x":90,"y":59}},{"type":"BODY","position":{"x":75,"y":44}},
    {"type":"INTERIOR","position":{"x":52,"y":40}},{"type":"FRAME","position":{"x":79,"y":53}},
    {"type":"LIGHTS","position":{"x":23,"y":60}},{"type":"ELECTRONIC","position":{"x":31,"y":44}},
    {"type":"BATTERY","position":{"x":35,"y":49}},{"type":"DOORS","position":{"x":93,"y":42}},
    {"type":"LOAD","position":{"x":84,"y":44}},{"type":"COMPRESSOR","position":{"x":4,"y":62}},
    {"type":"ENGINE","position":{"x":9,"y":55}},{"type":"EXHAUST","position":{"x":54,"y":65}},
    {"type":"FUEL","position":{"x":65,"y":61}},{"type":"GEARBOX","position":{"x":11,"y":66}}]
  },
  [EEquipmentModel.TATA_1821_TANDEM_6x2]: {
    name: 'Tata 1821 Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.TATA,
    image: TATA_1821_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":75,"y":65}},{"type":"SUSPENSION","position":{"x":76,"y":53}},
    {"type":"WHEELS","position":{"x":83,"y":62}},{"type":"BODY","position":{"x":57,"y":49}},
    {"type":"FRAME","position":{"x":58,"y":57}},{"type":"INTERIOR","position":{"x":51,"y":32}},
    {"type":"BATTERY","position":{"x":33,"y":52}},{"type":"ELECTRONIC","position":{"x":29,"y":44}},
    {"type":"LIGHTS","position":{"x":27,"y":63}},{"type":"LOAD","position":{"x":65,"y":53}},
    {"type":"COMPRESSOR","position":{"x":7,"y":63}},{"type":"ENGINE","position":{"x":14,"y":54}},
    {"type":"EXHAUST","position":{"x":57,"y":66}},{"type":"FUEL","position":{"x":65,"y":61}},
    {"type":"GEARBOX","position":{"x":18,"y":65}}]
  },
  [EEquipmentModel.TATA_1918T_TANDEM_4x2]: {
    name: 'Tata 1918T Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.TATA,
    image: TATA_1918T_TANDEM_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":77,"y":65}},{"type":"SUSPENSION","position":{"x":77,"y":58}},
    {"type":"WHEELS","position":{"x":86,"y":63}},{"type":"BODY","position":{"x":57,"y":48}},
    {"type":"FRAME","position":{"x":65,"y":59}},{"type":"INTERIOR","position":{"x":46,"y":35}},
    {"type":"BATTERY","position":{"x":37,"y":45}},{"type":"ELECTRONIC","position":{"x":27,"y":46}},
    {"type":"LIGHTS","position":{"x":35,"y":54}},{"type":"LOAD","position":{"x":70,"y":55}},
    {"type":"COMPRESSOR","position":{"x":7,"y":65}},{"type":"ENGINE","position":{"x":17,"y":56}},
    {"type":"EXHAUST","position":{"x":60,"y":68}},{"type":"FUEL","position":{"x":56,"y":56}},
    {"type":"GEARBOX","position":{"x":19,"y":65}}]
  },
  [EEquipmentModel.TATA_1923_TANDEM_TIPPER_4x2]: {
    name: 'Tata 1923 Tipper Tandem 4x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T4x2,
    brand: EBrand.TATA,
    image: TATA_1923_TANDEM_TIPPER_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":76,"y":68}},{"type":"SUSPENSION","position":{"x":83,"y":56}},
    {"type":"WHEELS","position":{"x":85,"y":63}},{"type":"BODY","position":{"x":63,"y":45}},
    {"type":"FRAME","position":{"x":72,"y":57}},{"type":"INTERIOR","position":{"x":43,"y":28}},
    {"type":"BATTERY","position":{"x":50,"y":48}},{"type":"ELECTRONIC","position":{"x":26,"y":48}},
    {"type":"LIGHTS","position":{"x":25,"y":67}},{"type":"HYDRAULIC","position":{"x":61,"y":54}},
    {"type":"LOAD","position":{"x":75,"y":50}},{"type":"RAMP","position":{"x":93,"y":39}},
    {"type":"COMPRESSOR","position":{"x":6,"y":58}},{"type":"ENGINE","position":{"x":12,"y":52}},
    {"type":"EXHAUST","position":{"x":56,"y":69}},{"type":"FUEL","position":{"x":58,"y":63}},
    {"type":"GEARBOX","position":{"x":15,"y":63}}]
  },
  [EEquipmentModel.TATA_2818_TANDEM_6x2]: {
    name: 'Tata 2818 Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.TATA,
    image: TATA_2818_TANDEM_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":71,"y":64}},{"type":"SUSPENSION","position":{"x":75,"y":56}},
    {"type":"WHEELS","position":{"x":81,"y":62}},{"type":"BODY","position":{"x":57,"y":50}},
    {"type":"FRAME","position":{"x":61,"y":56}},{"type":"INTERIOR","position":{"x":50,"y":33}},
    {"type":"BATTERY","position":{"x":52,"y":50}},{"type":"ELECTRONIC","position":{"x":31,"y":45}},
    {"type":"LIGHTS","position":{"x":31,"y":64}},{"type":"LOAD","position":{"x":66,"y":55}},
    {"type":"COMPRESSOR","position":{"x":6,"y":65}},{"type":"ENGINE","position":{"x":15,"y":55}},
    {"type":"EXHAUST","position":{"x":58,"y":66}},{"type":"FUEL","position":{"x":55,"y":59}},
    {"type":"GEARBOX","position":{"x":20,"y":67}}]
  },
  [EEquipmentModel.TATA_2823_TANDEM_TIPPER_6x2]: {
    name: 'Tata 2823 Tipper Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T6x2,
    brand: EBrand.TATA,
    image: TATA_2823_TANDEM_TIPPER_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":73,"y":73}},{"type":"SUSPENSION","position":{"x":80,"y":64}},
    {"type":"WHEELS","position":{"x":83,"y":71}},{"type":"BODY","position":{"x":54,"y":51}},
    {"type":"FRAME","position":{"x":62,"y":66}},{"type":"INTERIOR","position":{"x":42,"y":36}},
    {"type":"BATTERY","position":{"x":53,"y":58}},{"type":"ELECTRONIC","position":{"x":33,"y":46}},
    {"type":"LIGHTS","position":{"x":33,"y":69}},{"type":"DOORS","position":{"x":95,"y":44}},
    {"type":"HYDRAULIC","position":{"x":66,"y":56}},{"type":"LOAD","position":{"x":79,"y":45}},
    {"type":"COMPRESSOR","position":{"x":7,"y":65}},{"type":"ENGINE","position":{"x":15,"y":55}},
    {"type":"EXHAUST","position":{"x":57,"y":74}},{"type":"FUEL","position":{"x":67,"y":63}},
    {"type":"GEARBOX","position":{"x":21,"y":68}}]
  },
  [EEquipmentModel.TATA_2825_TANDEM_TIPPER_6x2]: {
    name: 'Tata 2825 Tipper Tandem 6x2',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T6x2,
    brand: EBrand.TATA,
    image: TATA_2825_TANDEM_TIPPER_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":75,"y":69}},{"type":"SUSPENSION","position":{"x":74,"y":61}},
    {"type":"WHEELS","position":{"x":83,"y":68}},{"type":"BODY","position":{"x":52,"y":46}},
    {"type":"FRAME","position":{"x":64,"y":59}},{"type":"INTERIOR","position":{"x":49,"y":35}},
    {"type":"BATTERY","position":{"x":54,"y":51}},{"type":"ELECTRONIC","position":{"x":32,"y":50}},
    {"type":"LIGHTS","position":{"x":32,"y":66}},{"type":"DOORS","position":{"x":92,"y":43}},
    {"type":"HYDRAULIC","position":{"x":65,"y":50}},{"type":"LOAD","position":{"x":83,"y":53}},
    {"type":"COMPRESSOR","position":{"x":9,"y":65}},{"type":"ENGINE","position":{"x":19,"y":54}},
    {"type":"EXHAUST","position":{"x":61,"y":69}},{"type":"FUEL","position":{"x":57,"y":60}},
    {"type":"GEARBOX","position":{"x":18,"y":65}}]
  },
  [EEquipmentModel.TATA_3518_TANDEM_8x4]: {
    name: 'Tata 3518 Tipper Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.TATA,
    image: TATA_3518_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":69,"y":64}},{"type":"SUSPENSION","position":{"x":74,"y":57}},
    {"type":"WHEELS","position":{"x":73,"y":71}},{"type":"BODY","position":{"x":52,"y":48}},
    {"type":"FRAME","position":{"x":59,"y":58}},{"type":"INTERIOR","position":{"x":46,"y":36}},
    {"type":"BATTERY","position":{"x":49,"y":52}},{"type":"ELECTRONIC","position":{"x":27,"y":46}},
    {"type":"LIGHTS","position":{"x":27,"y":63}},{"type":"LOAD","position":{"x":65,"y":55}},
    {"type":"COMPRESSOR","position":{"x":5,"y":65}},{"type":"ENGINE","position":{"x":14,"y":54}},
    {"type":"EXHAUST","position":{"x":57,"y":65}},{"type":"FUEL","position":{"x":53,"y":70}},
    {"type":"GEARBOX","position":{"x":15,"y":63}}]
  },
  [EEquipmentModel.TATA_3521_TANDEM_8x4]: {
    name: 'Tata 3521 Tipper Tandem 8x4',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T8x4,
    brand: EBrand.TATA,
    image: TATA_3521_TANDEM_8x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":67,"y":68}},{"type":"SUSPENSION","position":{"x":73,"y":58}},
    {"type":"WHEELS","position":{"x":75,"y":66}},{"type":"FRAME","position":{"x":58,"y":62}},
    {"type":"BODY","position":{"x":56,"y":43}},{"type":"INTERIOR","position":{"x":47,"y":35}},
    {"type":"BATTERY","position":{"x":53,"y":49}},{"type":"ELECTRONIC","position":{"x":30,"y":45}},
    {"type":"LIGHTS","position":{"x":28,"y":64}},{"type":"LOAD","position":{"x":66,"y":58}},
    {"type":"COMPRESSOR","position":{"x":5,"y":64}},{"type":"ENGINE","position":{"x":15,"y":53}},
    {"type":"EXHAUST","position":{"x":53,"y":69}},{"type":"FUEL","position":{"x":50,"y":57}},
    {"type":"GEARBOX","position":{"x":17,"y":62}}]
  },
  [EEquipmentModel.TATA_4018_SEMI_4x2]: {
    name: 'Tata 4018 4x2 Semi truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.TATA,
    image: TATA_4018_SEMI_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":80,"y":67}},{"type":"SUSPENSION","position":{"x":80,"y":56}},
    {"type":"WHEELS","position":{"x":93,"y":62}},{"type":"BODY","position":{"x":53,"y":47}},
    {"type":"FRAME","position":{"x":65,"y":65}},{"type":"INTERIOR","position":{"x":57,"y":28}},
    {"type":"BATTERY","position":{"x":61,"y":53}},{"type":"ELECTRONIC","position":{"x":31,"y":43}},
    {"type":"LIGHTS","position":{"x":31,"y":68}},{"type":"FIFTH_WHEEL","position":{"x":68,"y":55}},
    {"type":"COMPRESSOR","position":{"x":6,"y":69}},{"type":"ENGINE","position":{"x":15,"y":57}},
    {"type":"EXHAUST","position":{"x":61,"y":72}},{"type":"FUEL","position":{"x":56,"y":59}},
    {"type":"GEARBOX","position":{"x":20,"y":72}}]
  },
  [EEquipmentModel.TATA_4625_SEMI_4x2]: {
    name: 'Tata 4625 4x2 Semi truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.TATA,
    image: TATA_4625_SEMI_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":80,"y":67}},{"type":"SUSPENSION","position":{"x":80,"y":56}},
    {"type":"WHEELS","position":{"x":93,"y":62}},{"type":"BODY","position":{"x":53,"y":47}},
    {"type":"FRAME","position":{"x":65,"y":65}},{"type":"INTERIOR","position":{"x":57,"y":28}},
    {"type":"BATTERY","position":{"x":61,"y":53}},{"type":"ELECTRONIC","position":{"x":31,"y":43}},
    {"type":"LIGHTS","position":{"x":31,"y":68}},{"type":"FIFTH_WHEEL","position":{"x":68,"y":55}},
    {"type":"COMPRESSOR","position":{"x":6,"y":69}},{"type":"ENGINE","position":{"x":15,"y":57}},
    {"type":"EXHAUST","position":{"x":61,"y":72}},{"type":"FUEL","position":{"x":56,"y":59}},
    {"type":"GEARBOX","position":{"x":20,"y":72}}]
  },
  [EEquipmentModel.TATA_5530_SEMI_6x2]: {
    name: 'Tata 5530 6x2 Semi truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.TATA,
    image: TATA_5530_SEMI_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":26,"y":69}},{"type":"SUSPENSION","position":{"x":19,"y":59}},
    {"type":"WHEELS","position":{"x":17,"y":68}},{"type":"BODY","position":{"x":43,"y":49}},
    {"type":"FRAME","position":{"x":39,"y":62}},{"type":"INTERIOR","position":{"x":44,"y":35}},
    {"type":"BATTERY","position":{"x":38,"y":52}},{"type":"ELECTRONIC","position":{"x":59,"y":47}},
    {"type":"LIGHTS","position":{"x":67,"y":66}},{"type":"FIFTH_WHEEL","position":{"x":28,"y":53}},
    {"type":"COMPRESSOR","position":{"x":76,"y":69}},{"type":"ENGINE","position":{"x":78,"y":56}},
    {"type":"EXHAUST","position":{"x":40,"y":73}},{"type":"FUEL","position":{"x":32,"y":64}},
    {"type":"GEARBOX","position":{"x":83,"y":68}}]
  },
  [EEquipmentModel.TRAIL_KING_TIPPER]: {
    name: 'Trail King Tipper semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.TRAIL_KING_IND,
    image: TRAIL_KING_TIPPER_IMG,
    parts: [{"type":"BRAKES","position":{"x":48,"y":61}},{"type":"SUSPENSION","position":{"x":47,"y":54}},
    {"type":"WHEELS","position":{"x":43,"y":59}},{"type":"BODY","position":{"x":44,"y":41}},
    {"type":"FRAME","position":{"x":39,"y":52}},{"type":"SUPPORT","position":{"x":18,"y":60}},
    {"type":"LIGHTS","position":{"x":76,"y":48}},{"type":"DOORS","position":{"x":84,"y":38}},
    {"type":"HYDRAULIC","position":{"x":19,"y":49}},{"type":"LOAD","position":{"x":50,"y":45}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":15,"y":48}}]
  },
  [EEquipmentModel.TRAIL_KING_TIPPER_1]: {
    name: 'Trail King Tipper semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TIPPER_3_AXLES,
    brand: EBrand.TRAIL_KING_IND,
    image: TRAIL_KING_TIPPER_1_IMG,
    parts: [{"type":"BRAKES","position":{"x":44,"y":67}},{"type":"SUSPENSION","position":{"x":42,"y":56}},
    {"type":"WHEELS","position":{"x":37,"y":67}},{"type":"BODY","position":{"x":26,"y":43}},
    {"type":"FRAME","position":{"x":32,"y":53}},{"type":"SUPPORT","position":{"x":19,"y":67}},
    {"type":"LIGHTS","position":{"x":64,"y":48}},{"type":"DOORS","position":{"x":71,"y":44}},
    {"type":"HYDRAULIC","position":{"x":13,"y":53}},{"type":"LOAD","position":{"x":37,"y":43}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":17,"y":53}}]
  },
  [EEquipmentModel.TRANSCRAFT_FLATBED_COMBO]: {
    name: 'Transcraft Flatbed combo semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.TRANSCRAFT,
    image: TRANSCRAFT_FLATBED_COMBO_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":56}},{"type":"SUSPENSION","position":{"x":34,"y":41}},
    {"type":"WHEELS","position":{"x":30,"y":51}},{"type":"FRAME","position":{"x":22,"y":37}},
    {"type":"SUPPORT","position":{"x":10,"y":39}},{"type":"LIGHTS","position":{"x":54,"y":45}},
    {"type":"LOAD","position":{"x":46,"y":32}},{"type":"TRAILER_ATTACHMENT","position":{"x":15,"y":28}}]
  },
  [EEquipmentModel.TRANSCRAFT_FLATBED_DROP_DECK_COMBO]: {
    name: 'Transcraft Flatbed Drop deck combo semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.TRANSCRAFT,
    image: TRANSCRAFT_FLATBED_DROP_DECK_COMBO_IMG,
    parts: [{"type":"BRAKES","position":{"x":85,"y":47}},{"type":"SUSPENSION","position":{"x":86,"y":42}},
    {"type":"WHEELS","position":{"x":90,"y":46}},{"type":"FRAME","position":{"x":66,"y":48}},
    {"type":"SUPPORT","position":{"x":51,"y":64}},{"type":"LIGHTS","position":{"x":95,"y":41}},
    {"type":"LOAD","position":{"x":74,"y":43}},{"type":"TRAILER_ATTACHMENT","position":{"x":28,"y":46}}]
  },
  [EEquipmentModel.TRANSCRAFT_FLATBED_DROP_DECK_STEEL]: {
    name: 'Transcraft Flatbed Drop deck steel semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.TRANSCRAFT,
    image: TRANSCRAFT_FLATBED_DROP_DECK_STEEL_IMG,
    parts: [{"type":"BRAKES","position":{"x":90,"y":46}},{"type":"SUSPENSION","position":{"x":92,"y":40}},
    {"type":"WHEELS","position":{"x":94,"y":49}},{"type":"FRAME","position":{"x":73,"y":49}},
    {"type":"SUPPORT","position":{"x":53,"y":63}},{"type":"LIGHTS","position":{"x":98,"y":42}},
    {"type":"LOAD","position":{"x":64,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":30,"y":53}}]
  },
  [EEquipmentModel.TRANSCRAFT_FLATBED_STEEL]: {
    name: 'Transcraft Flatbed steel semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.TRANSCRAFT,
    image: TRANSCRAFT_FLATBED_STEEL_IMG,
    parts: [{"type":"BRAKES","position":{"x":35,"y":57}},{"type":"SUSPENSION","position":{"x":37,"y":45}},
    {"type":"WHEELS","position":{"x":29,"y":52}},{"type":"FRAME","position":{"x":20,"y":38}},
    {"type":"SUPPORT","position":{"x":11,"y":36}},{"type":"LIGHTS","position":{"x":61,"y":57}},
    {"type":"LOAD","position":{"x":43,"y":37}},{"type":"TRAILER_ATTACHMENT","position":{"x":14,"y":29}}]
  },
  [EEquipmentModel.UTM_FLATBED_4000AE]: {
    name: 'UTM Flatbed 4000 AE semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.UTM_CORPORATE,
    image: UTM_FLATBED_4000AE_IMG,
    parts: [{"type":"BRAKES","position":{"x":23,"y":62}},{"type":"SUSPENSION","position":{"x":23,"y":51}},
    {"type":"WHEELS","position":{"x":18,"y":59}},{"type":"FRAME","position":{"x":16,"y":40}},
    {"type":"SUPPORT","position":{"x":12,"y":48}},{"type":"LIGHTS","position":{"x":37,"y":51}},
    {"type":"LOAD","position":{"x":52,"y":42}},{"type":"TRAILER_ATTACHMENT","position":{"x":11,"y":35}}]
  },
  [EEquipmentModel.UTM_FLATBED_4000AE_DROP_DECK]: {
    name: 'UTM Flatbed 4000 AE Drop Deck semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.UTM_CORPORATE,
    image: UTM_FLATBED_4000AE_DROP_DECK_IMG,
    parts: [{"type":"BRAKES","position":{"x":45,"y":56}},{"type":"SUSPENSION","position":{"x":50,"y":51}},
    {"type":"WHEELS","position":{"x":55,"y":57}},{"type":"FRAME","position":{"x":66,"y":38}},
    {"type":"SUPPORT","position":{"x":92,"y":36}},{"type":"LIGHTS","position":{"x":28,"y":62}},
    {"type":"LOAD","position":{"x":50,"y":43}},{"type":"TRAILER_ATTACHMENT","position":{"x":86,"y":27}}]
  },
  [EEquipmentModel.UTM_FLATBED_DROP_DECK]: {
    name: 'UTM Flatbed Drop Deck semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.UTM_CORPORATE,
    image: UTM_FLATBED_DROP_DECK_IMG,
    parts: [{"type":"BRAKES","position":{"x":44,"y":62}},{"type":"SUSPENSION","position":{"x":37,"y":56}},
    {"type":"WHEELS","position":{"x":35,"y":63}},{"type":"FRAME","position":{"x":31,"y":52}},
    {"type":"SUPPORT","position":{"x":18,"y":56}},{"type":"LIGHTS","position":{"x":60,"y":64}},
    {"type":"LOAD","position":{"x":53,"y":53}},{"type":"TRAILER_ATTACHMENT","position":{"x":18,"y":41}}]
  },
  [EEquipmentModel.UTM_TRAILER_3000R]: {
    name: 'UTM 3000R Reefer semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_2_AXLES,
    brand: EBrand.UTM_CORPORATE,
    image: UTM_TRAILER_3000R_IMG,
    parts: [{"type":"BRAKES","position":{"x":36,"y":83}},{"type":"SUSPENSION","position":{"x":34,"y":73}},
    {"type":"WHEELS","position":{"x":23,"y":79}},{"type":"BODY","position":{"x":21,"y":54}},
    {"type":"FRAME","position":{"x":17,"y":72}},{"type":"SUPPORT","position":{"x":9,"y":82}},
    {"type":"LIGHTS","position":{"x":47,"y":68}},{"type":"DOORS","position":{"x":66,"y":49}},
    {"type":"LOAD","position":{"x":25,"y":60}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":75}},
    {"type":"FRIGO","position":{"x":8,"y":60}}]
  },
  [EEquipmentModel.UTM_TRAILER_3000R_MULTI_TEMP]: {
    name: 'UTM 3000R Multi temp Reefer semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_2_AXLES,
    brand: EBrand.UTM_CORPORATE,
    image: UTM_TRAILER_3000R_MULTI_TEMP_IMG,
    parts: [{"type":"BRAKES","position":{"x":29,"y":66}},{"type":"SUSPENSION","position":{"x":27,"y":58}},
    {"type":"WHEELS","position":{"x":22,"y":65}},{"type":"BODY","position":{"x":18,"y":42}},
    {"type":"FRAME","position":{"x":17,"y":55}},{"type":"SUPPORT","position":{"x":16,"y":60}},
    {"type":"LIGHTS","position":{"x":29,"y":49}},{"type":"DOORS","position":{"x":51,"y":43}},
    {"type":"LOAD","position":{"x":38,"y":48}},{"type":"FRIGO","position":{"x":21,"y":34}},
    {"type":"RAMP","position":{"x":64,"y":78}},{"type":"TRAILER_ATTACHMENT","position":{"x":13,"y":51}}]
  },
  [EEquipmentModel.UTM_TRAILER_4000D]: {
    name: 'UTM 4000D semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.UTM_CORPORATE,
    image: UTM_TRAILER_4000D_IMG,
    parts: [{"type":"BRAKES","position":{"x":58,"y":79}},{"type":"SUSPENSION","position":{"x":46,"y":70}},
    {"type":"WHEELS","position":{"x":45,"y":80}},{"type":"BODY","position":{"x":35,"y":37}},
    {"type":"FRAME","position":{"x":33,"y":64}},{"type":"SUPPORT","position":{"x":10,"y":76}},
    {"type":"LIGHTS","position":{"x":60,"y":68}},{"type":"DOORS","position":{"x":72,"y":50}},
    {"type":"LOAD","position":{"x":28,"y":56}},{"type":"TRAILER_ATTACHMENT","position":{"x":10,"y":69}}]
  },
  [EEquipmentModel.UTM_TRAILER_4000D_X_COMPOSITE]: {
    name: 'UTM 4000D X Composite semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.UTM_CORPORATE,
    image: UTM_TRAILER_4000D_X_COMPOSITE_IMG,
    parts: [{"type":"BRAKES","position":{"x":40,"y":74}},{"type":"SUSPENSION","position":{"x":38,"y":68}},
    {"type":"WHEELS","position":{"x":34,"y":74}},{"type":"BODY","position":{"x":25,"y":44}},
    {"type":"FRAME","position":{"x":23,"y":65}},{"type":"SUPPORT","position":{"x":10,"y":71}},
    {"type":"LIGHTS","position":{"x":63,"y":65}},{"type":"DOORS","position":{"x":66,"y":42}},
    {"type":"LOAD","position":{"x":42,"y":50}},{"type":"TRAILER_ATTACHMENT","position":{"x":5,"y":66}}]
  },
  [EEquipmentModel.UTM_TRAILER_4000D_X_COMPOSITE_100]: {
    name: 'UTM 4000D X Composite 100 semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.UTM_CORPORATE,
    image: UTM_TRAILER_4000D_X_COMPOSITE_100_IMG,
    parts: [{"type":"BRAKES","position":{"x":37,"y":73}},{"type":"SUSPENSION","position":{"x":33,"y":66}},
    {"type":"WHEELS","position":{"x":31,"y":74}},{"type":"BODY","position":{"x":23,"y":56}},
    {"type":"FRAME","position":{"x":23,"y":65}},{"type":"SUPPORT","position":{"x":10,"y":68}},
    {"type":"LIGHTS","position":{"x":67,"y":68}},{"type":"DOORS","position":{"x":77,"y":56}},
    {"type":"LOAD","position":{"x":36,"y":57}},{"type":"TRAILER_ATTACHMENT","position":{"x":6,"y":63}}]
  },
  [EEquipmentModel.UTM_TRAILER_4000D_X_COMPOSITE_TBR]: {
    name: 'UTM 4000D X Composite TBR semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.UTM_CORPORATE,
    image: UTM_TRAILER_4000D_X_COMPOSITE_TBR_IMG,
    parts: [{"type":"BRAKES","position":{"x":32,"y":78}},{"type":"SUSPENSION","position":{"x":29,"y":71}},
    {"type":"WHEELS","position":{"x":26,"y":79}},{"type":"BODY","position":{"x":15,"y":45}},
    {"type":"FRAME","position":{"x":17,"y":65}},{"type":"SUPPORT","position":{"x":8,"y":73}},
    {"type":"LIGHTS","position":{"x":57,"y":72}},{"type":"DOORS","position":{"x":64,"y":34}},
    {"type":"LOAD","position":{"x":28,"y":50}},{"type":"TRAILER_ATTACHMENT","position":{"x":6,"y":62}}]
  },
  [EEquipmentModel.UTM_TRAILER_TAUTLINER]: {
    name: 'UTM Tautliner semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.UTM_CORPORATE,
    image: UTM_TRAILER_TAUTLINER_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":74}},{"type":"SUSPENSION","position":{"x":50,"y":66}},
    {"type":"WHEELS","position":{"x":43,"y":74}},{"type":"BODY","position":{"x":38,"y":50}},
    {"type":"FRAME","position":{"x":35,"y":63}},{"type":"SUPPORT","position":{"x":16,"y":73}},
    {"type":"LIGHTS","position":{"x":67,"y":67}},{"type":"DOORS","position":{"x":85,"y":42}},
    {"type":"LOAD","position":{"x":24,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":62}}]
  },
  [EEquipmentModel.VANGUARD_CIE_20_40_CITYCOMBO_WS_TANDEM]: {
    name: 'Vanguard CIE 20-40" CityCombo WS Tandem semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_1_1_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_20_40_CITYCOMBO_WS_TANDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":74,"y":49}},{"type":"SUSPENSION","position":{"x":76,"y":45}},
    {"type":"WHEELS","position":{"x":80,"y":48}},{"type":"FRAME","position":{"x":53,"y":45}},
    {"type":"SUPPORT","position":{"x":44,"y":59}},{"type":"LIGHTS","position":{"x":96,"y":40}},
    {"type":"LOAD","position":{"x":63,"y":43}},{"type":"TRAILER_ATTACHMENT","position":{"x":19,"y":47}}]
  },
  [EEquipmentModel.VANGUARD_CIE_20_40_SL_COMBO_TANDEM_WS]: {
    name: 'Vanguard CIE 20-40" SL Combo WS semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_1_1_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_20_40_SL_COMBO_TANDEM_WS_IMG,
    parts: [{"type":"BRAKES","position":{"x":76,"y":49}},{"type":"SUSPENSION","position":{"x":77,"y":45}},
    {"type":"WHEELS","position":{"x":82,"y":49}},{"type":"FRAME","position":{"x":54,"y":45}},
    {"type":"SUPPORT","position":{"x":44,"y":58}},{"type":"LIGHTS","position":{"x":95,"y":44}},
    {"type":"LOAD","position":{"x":60,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":19,"y":48}}]
  },
  [EEquipmentModel.VANGUARD_CIE_20_40_SL_COMBO_TRIDEM]: {
    name: 'Vanguard CIE 20-40" SL Combo Tridem semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_20_40_SL_COMBO_TRIDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":76,"y":49}},{"type":"SUSPENSION","position":{"x":77,"y":45}},
    {"type":"WHEELS","position":{"x":82,"y":49}},{"type":"FRAME","position":{"x":54,"y":45}},
    {"type":"SUPPORT","position":{"x":44,"y":58}},{"type":"LIGHTS","position":{"x":95,"y":44}},
    {"type":"LOAD","position":{"x":60,"y":45}},{"type":"TRAILER_ATTACHMENT","position":{"x":19,"y":48}}]
  },
  [EEquipmentModel.VANGUARD_CIE_23_5_TANDEM]: {
    name: 'Vanguard CIE 23,5" Tandem semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_2_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_23_5_TANDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":76,"y":49}},{"type":"SUSPENSION","position":{"x":77,"y":45}},
    {"type":"WHEELS","position":{"x":82,"y":49}},{"type":"FRAME","position":{"x":54,"y":45}},
    {"type":"LIGHTS","position":{"x":95,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":19,"y":48}},
    {"type":"LOAD","position":{"x":57,"y":40}},{"type":"SUPPORT","position":{"x":48,"y":61}}]
  },
  [EEquipmentModel.VANGUARD_CIE_33_LIGHTWEIGHT_TRIDEM]: {
    name: 'Vanguard CIE 33" Lightweight Tridem semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_33_LIGHTWEIGHT_TRIDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":74,"y":50}},{"type":"SUSPENSION","position":{"x":74,"y":44}},
    {"type":"WHEELS","position":{"x":79,"y":49}},{"type":"FRAME","position":{"x":55,"y":47}},
    {"type":"SUPPORT","position":{"x":40,"y":60}},{"type":"LIGHTS","position":{"x":97,"y":45}},
    {"type":"LOAD","position":{"x":57,"y":43}},{"type":"TRAILER_ATTACHMENT","position":{"x":20,"y":46}}]
  },
  [EEquipmentModel.VANGUARD_CIE_33_SLIDER_TRIDEM]: {
    name: 'Vanguard CIE 33" Slider Tridem semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_33_SLIDER_TRIDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":74,"y":50}},{"type":"SUSPENSION","position":{"x":76,"y":45}},
    {"type":"WHEELS","position":{"x":81,"y":49}},{"type":"FRAME","position":{"x":61,"y":43}},
    {"type":"SUPPORT","position":{"x":39,"y":59}},{"type":"LIGHTS","position":{"x":95,"y":45}},
    {"type":"LOAD","position":{"x":52,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":17,"y":47}}]
  },
  [EEquipmentModel.VANGUARD_CIE_40_45_EXTANDABLE]: {
    name: 'Vanguard CIE 40-45" Extendable semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_2_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_40_45_EXTANDABLE_IMG,
    parts: [{"type":"SUSPENSION","position":{"x":86,"y":44}},{"type":"BRAKES","position":{"x":83,"y":47}},
    {"type":"WHEELS","position":{"x":90,"y":48}},{"type":"FRAME","position":{"x":52,"y":47}},
    {"type":"SUPPORT","position":{"x":42,"y":57}},{"type":"LIGHTS","position":{"x":97,"y":42}},
    {"type":"LOAD","position":{"x":64,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":22,"y":48}}]
  },
  [EEquipmentModel.VANGUARD_CIE_40_53_EXTENDABLE_TRIDEM]: {
    name: 'Vanguard CIE 40-53" Extendable Tridem semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_40_53_EXTENDABLE_TRIDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":75,"y":50}},{"type":"SUSPENSION","position":{"x":75,"y":46}},
    {"type":"WHEELS","position":{"x":80,"y":49}},{"type":"SUPPORT","position":{"x":41,"y":57}},
    {"type":"FRAME","position":{"x":46,"y":47}},{"type":"LIGHTS","position":{"x":93,"y":42}},
    {"type":"LOAD","position":{"x":58,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":16,"y":49}}]
  },
  [EEquipmentModel.VANGUARD_CIE_40_GOOSENECK_LIGHTWEIGHT]: {
    name: 'Vanguard CIE 40" Gooseneck Lightweight semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_2_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_40_GOOSENECK_LIGHTWEIGHT_IMG,
    parts: [{"type":"BRAKES","position":{"x":82,"y":49}},{"type":"SUSPENSION","position":{"x":82,"y":44}},
    {"type":"WHEELS","position":{"x":89,"y":48}},{"type":"FRAME","position":{"x":56,"y":46}},
    {"type":"SUPPORT","position":{"x":46,"y":60}},{"type":"LIGHTS","position":{"x":93,"y":42}},
    {"type":"LOAD","position":{"x":63,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":22,"y":48}}]
  },
  [EEquipmentModel.VANGUARD_CIE_40_GOOSENECK_TANDEM]: {
    name: 'Vanguard CIE 40" Gooseneck Tandem semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_2_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_40_GOOSENECK_TANDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":85,"y":51}},{"type":"SUSPENSION","position":{"x":84,"y":46}},
    {"type":"WHEELS","position":{"x":90,"y":48}},{"type":"FRAME","position":{"x":51,"y":46}},
    {"type":"SUPPORT","position":{"x":45,"y":57}},{"type":"LIGHTS","position":{"x":97,"y":43}},
    {"type":"LOAD","position":{"x":58,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":21,"y":47}}]
  },
  [EEquipmentModel.VANGUARD_CIE_40_GOOSENECK_TRIDEM]: {
    name: 'Vanguard CIE 40" Gooseneck Tridem semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_3_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_40_GOOSENECK_TRIDEM_IMG,
    parts: [{"type":"BRAKES","position":{"x":75,"y":51}},{"type":"SUSPENSION","position":{"x":77,"y":46}},
    {"type":"WHEELS","position":{"x":81,"y":48}},{"type":"SUPPORT","position":{"x":46,"y":59}},
    {"type":"FRAME","position":{"x":53,"y":45}},{"type":"LIGHTS","position":{"x":97,"y":43}},
    {"type":"LOAD","position":{"x":62,"y":42}},{"type":"TRAILER_ATTACHMENT","position":{"x":24,"y":49}}]
  },
  [EEquipmentModel.VANGUARD_CIE_43_DROP_FRAME]: {
    name: 'Vanguard CIE 43" Drop Frame semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_1_1_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_43_DROP_FRAME_IMG,
    parts: [{"type":"BRAKES","position":{"x":75,"y":47}},{"type":"SUSPENSION","position":{"x":78,"y":43}},
    {"type":"WHEELS","position":{"x":82,"y":49}},{"type":"FRAME","position":{"x":57,"y":44}},
    {"type":"SUPPORT","position":{"x":38,"y":57}},{"type":"LIGHTS","position":{"x":96,"y":42}},
    {"type":"LOAD","position":{"x":62,"y":44}},{"type":"TRAILER_ATTACHMENT","position":{"x":18,"y":45}}]
  },
  [EEquipmentModel.VANGUARD_CIE_53_GOOSENECK]: {
    name: 'Vanguard CIE 53" Gooseneck semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].CONTAINER_2_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_CIE_53_GOOSENECK_IMG,
    parts: [{"type":"BRAKES","position":{"x":85,"y":51}},{"type":"SUSPENSION","position":{"x":84,"y":46}},
    {"type":"WHEELS","position":{"x":88,"y":49}},{"type":"FRAME","position":{"x":50,"y":48}},
    {"type":"SUPPORT","position":{"x":37,"y":58}},{"type":"LIGHTS","position":{"x":95,"y":44}},
    {"type":"LOAD","position":{"x":60,"y":47}},{"type":"TRAILER_ATTACHMENT","position":{"x":16,"y":49}}]
  },
  [EEquipmentModel.VANGUARD_MAXCUBE]: {
    name: 'Vanguard MaxCube semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_MAXCUBE_IMG,
    parts: [{"type":"BRAKES","position":{"x":88,"y":64}},{"type":"SUSPENSION","position":{"x":90,"y":60}},
    {"type":"WHEELS","position":{"x":94,"y":63}},{"type":"BODY","position":{"x":32,"y":57}},
    {"type":"FRAME","position":{"x":40,"y":60}},{"type":"SUPPORT","position":{"x":44,"y":72}},
    {"type":"LIGHTS","position":{"x":97,"y":60}},{"type":"DOORS","position":{"x":95,"y":50}},
    {"type":"LOAD","position":{"x":57,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":20,"y":61}}]
  },
  [EEquipmentModel.VANGUARD_REEFER]: {
    name: 'Vanguard Reefer semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_2_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_REEFER_IMG,
    parts: [{"type":"BRAKES","position":{"x":13,"y":67}},{"type":"SUSPENSION","position":{"x":11,"y":62}},
    {"type":"WHEELS","position":{"x":9,"y":66}},{"type":"BODY","position":{"x":20,"y":52}},
    {"type":"FRAME","position":{"x":25,"y":63}},{"type":"SUPPORT","position":{"x":44,"y":76}},
    {"type":"LIGHTS","position":{"x":4,"y":64}},{"type":"DOORS","position":{"x":7,"y":57}},
    {"type":"FRIGO","position":{"x":81,"y":44}},{"type":"LOAD","position":{"x":36,"y":53}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":69,"y":66}}]
  },
  [EEquipmentModel.VANGUARD_VAF]: {
    name: 'Vanguard VAF semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_2_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_VAF_IMG,
    parts: [{"type":"BRAKES","position":{"x":85,"y":53}},{"type":"SUSPENSION","position":{"x":89,"y":45}},
    {"type":"WHEELS","position":{"x":93,"y":52}},{"type":"FRAME","position":{"x":65,"y":43}},
    {"type":"SUPPORT","position":{"x":63,"y":63}},{"type":"LIGHTS","position":{"x":99,"y":49}},
    {"type":"LOAD","position":{"x":46,"y":41}},{"type":"TRAILER_ATTACHMENT","position":{"x":24,"y":48}}]
  },
  [EEquipmentModel.VANGUARD_VIP_4000]: {
    name: 'Vanguard VIP 4000 semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_VIP_4000_IMG,
    parts: [{"type":"BRAKES","position":{"x":83,"y":65}},{"type":"SUSPENSION","position":{"x":84,"y":61}},
    {"type":"WHEELS","position":{"x":89,"y":64}},{"type":"BODY","position":{"x":40,"y":52}},
    {"type":"FRAME","position":{"x":50,"y":61}},{"type":"SUPPORT","position":{"x":44,"y":72}},
    {"type":"LIGHTS","position":{"x":97,"y":59}},{"type":"DOORS","position":{"x":95,"y":51}},
    {"type":"LOAD","position":{"x":52,"y":49}},{"type":"TRAILER_ATTACHMENT","position":{"x":23,"y":61}}]
  },
  [EEquipmentModel.VANGUARD_VSF]: {
    name: 'Vanguard VSF semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_VSF_IMG,
    parts: [{"type":"BRAKES","position":{"x":82,"y":48}},{"type":"SUSPENSION","position":{"x":86,"y":41}},
    {"type":"WHEELS","position":{"x":88,"y":49}},{"type":"FRAME","position":{"x":55,"y":42}},
    {"type":"SUPPORT","position":{"x":47,"y":58}},{"type":"LIGHTS","position":{"x":98,"y":43}},
    {"type":"LOAD","position":{"x":46,"y":42}},{"type":"TRAILER_ATTACHMENT","position":{"x":19,"y":45}}]
  },
  [EEquipmentModel.VANGUARD_VXP]: {
    name: 'Vanguard VXP semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.VANGUARD,
    image: VANGUARD_VXP_IMG,
    parts: [{"type":"BRAKES","position":{"x":87,"y":62}},{"type":"SUSPENSION","position":{"x":88,"y":57}},
    {"type":"WHEELS","position":{"x":92,"y":61}},{"type":"BODY","position":{"x":39,"y":50}},
    {"type":"FRAME","position":{"x":50,"y":60}},{"type":"SUPPORT","position":{"x":44,"y":71}},
    {"type":"LIGHTS","position":{"x":97,"y":58}},{"type":"DOORS","position":{"x":95,"y":48}},
    {"type":"LOAD","position":{"x":59,"y":54}},{"type":"TRAILER_ATTACHMENT","position":{"x":16,"y":61}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_15190_ROBUST]: {
    name: 'Volkswagen Constellation 15190 Robust tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_15190_ROBUST_IMG,
    parts: [{"type":"BRAKES","position":{"x":21,"y":61}},{"type":"SUSPENSION","position":{"x":17,"y":55}},
    {"type":"WHEELS","position":{"x":12,"y":63}},{"type":"FRAME","position":{"x":27,"y":58}},
    {"type":"INTERIOR","position":{"x":60,"y":48}},{"type":"BODY","position":{"x":54,"y":47}},
    {"type":"BATTERY","position":{"x":55,"y":53}},{"type":"ELECTRONIC","position":{"x":74,"y":45}},
    {"type":"LIGHTS","position":{"x":74,"y":54}},{"type":"LOAD","position":{"x":36,"y":55}},
    {"type":"COMPRESSOR","position":{"x":79,"y":63}},{"type":"ENGINE","position":{"x":86,"y":55}},
    {"type":"EXHAUST","position":{"x":49,"y":63}},{"type":"FUEL","position":{"x":38,"y":62}},
    {"type":"GEARBOX","position":{"x":83,"y":67}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_17190]: {
    name: 'Volkswagen Constellation 17190 tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_17190_IMG,
    parts: [{"type":"BRAKES","position":{"x":16,"y":61}},{"type":"SUSPENSION","position":{"x":13,"y":52}},
    {"type":"WHEELS","position":{"x":10,"y":61}},{"type":"BODY","position":{"x":53,"y":44}},
    {"type":"FRAME","position":{"x":35,"y":58}},{"type":"INTERIOR","position":{"x":60,"y":42}},
    {"type":"BATTERY","position":{"x":49,"y":50}},{"type":"ELECTRONIC","position":{"x":73,"y":42}},
    {"type":"LIGHTS","position":{"x":75,"y":52}},{"type":"LOAD","position":{"x":26,"y":53}},
    {"type":"COMPRESSOR","position":{"x":78,"y":64}},{"type":"ENGINE","position":{"x":85,"y":55}},
    {"type":"EXHAUST","position":{"x":44,"y":64}},{"type":"FUEL","position":{"x":35,"y":65}},
    {"type":"GEARBOX","position":{"x":82,"y":66}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_17230_ROBUST]: {
    name: 'Volkswagen Constellation 17230 Robust tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_17230_ROBUST_IMG,
    parts: [{"type":"BODY","position":{"x":53,"y":44}},{"type":"FRAME","position":{"x":35,"y":58}},
    {"type":"INTERIOR","position":{"x":60,"y":42}},{"type":"ELECTRONIC","position":{"x":73,"y":42}},
    {"type":"LIGHTS","position":{"x":75,"y":52}},{"type":"LOAD","position":{"x":26,"y":53}},
    {"type":"COMPRESSOR","position":{"x":78,"y":64}},{"type":"ENGINE","position":{"x":85,"y":55}},
    {"type":"EXHAUST","position":{"x":44,"y":64}},{"type":"FUEL","position":{"x":35,"y":65}},
    {"type":"GEARBOX","position":{"x":82,"y":66}},{"type":"BATTERY","position":{"x":52,"y":52}},
    {"type":"SUSPENSION","position":{"x":19,"y":56}},{"type":"WHEELS","position":{"x":10,"y":62}},
    {"type":"BRAKES","position":{"x":19,"y":62}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_17280]: {
    name: 'Volkswagen Constellation 17280 tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_17280_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":62}},{"type":"WHEELS","position":{"x":14,"y":64}},
    {"type":"SUSPENSION","position":{"x":17,"y":55}},{"type":"FRAME","position":{"x":30,"y":56}},
    {"type":"INTERIOR","position":{"x":67,"y":40}},{"type":"BODY","position":{"x":54,"y":48}},
    {"type":"BATTERY","position":{"x":53,"y":54}},{"type":"ELECTRONIC","position":{"x":75,"y":47}},
    {"type":"LIGHTS","position":{"x":74,"y":55}},{"type":"LOAD","position":{"x":38,"y":56}},
    {"type":"COMPRESSOR","position":{"x":75,"y":67}},{"type":"ENGINE","position":{"x":85,"y":60}},
    {"type":"EXHAUST","position":{"x":48,"y":64}},{"type":"FUEL","position":{"x":33,"y":62}},
    {"type":"GEARBOX","position":{"x":88,"y":68}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_17280_TRACTOR]: {
    name: 'Volkswagen Constellation 17280 semi truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_17280_TRACTOR_IMG,
    parts: [{"type":"BRAKES","position":{"x":18,"y":72}},{"type":"SUSPENSION","position":{"x":12,"y":63}},
    {"type":"WHEELS","position":{"x":5,"y":69}},{"type":"BODY","position":{"x":38,"y":51}},
    {"type":"FRAME","position":{"x":35,"y":61}},{"type":"INTERIOR","position":{"x":49,"y":32}},
    {"type":"BATTERY","position":{"x":44,"y":55}},{"type":"ELECTRONIC","position":{"x":60,"y":41}},
    {"type":"LIGHTS","position":{"x":61,"y":54}},{"type":"FIFTH_WHEEL","position":{"x":24,"y":51}},
    {"type":"COMPRESSOR","position":{"x":65,"y":74}},{"type":"ENGINE","position":{"x":81,"y":60}},
    {"type":"EXHAUST","position":{"x":35,"y":70}},{"type":"FUEL","position":{"x":24,"y":63}},
    {"type":"GEARBOX","position":{"x":78,"y":71}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_19330]: {
    name: 'Volkswagen Constellation 19330 tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_19330_IMG,
    parts: [{"type":"WHEELS","position":{"x":14,"y":64}},{"type":"FRAME","position":{"x":30,"y":56}},
    {"type":"INTERIOR","position":{"x":67,"y":40}},{"type":"BODY","position":{"x":54,"y":48}},
    {"type":"BATTERY","position":{"x":53,"y":54}},{"type":"ELECTRONIC","position":{"x":75,"y":47}},
    {"type":"LIGHTS","position":{"x":74,"y":55}},{"type":"LOAD","position":{"x":38,"y":56}},
    {"type":"COMPRESSOR","position":{"x":75,"y":67}},{"type":"ENGINE","position":{"x":85,"y":60}},
    {"type":"EXHAUST","position":{"x":48,"y":64}},{"type":"FUEL","position":{"x":33,"y":62}},
    {"type":"GEARBOX","position":{"x":88,"y":68}},{"type":"SUSPENSION","position":{"x":19,"y":56}},
    {"type":"BRAKES","position":{"x":23,"y":64}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_19360]: {
    name: 'Volkswagen Constellation 19360 semi truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_19360_IMG,
    parts: [{"type":"BRAKES","position":{"x":23,"y":75}},{"type":"SUSPENSION","position":{"x":15,"y":61}},
    {"type":"WHEELS","position":{"x":12,"y":71}},{"type":"BODY","position":{"x":39,"y":51}},
    {"type":"FRAME","position":{"x":35,"y":62}},{"type":"INTERIOR","position":{"x":52,"y":36}},
    {"type":"BATTERY","position":{"x":41,"y":58}},{"type":"ELECTRONIC","position":{"x":63,"y":43}},
    {"type":"LIGHTS","position":{"x":61,"y":59}},{"type":"FIFTH_WHEEL","position":{"x":29,"y":60}},
    {"type":"COMPRESSOR","position":{"x":64,"y":76}},{"type":"ENGINE","position":{"x":79,"y":56}},
    {"type":"EXHAUST","position":{"x":40,"y":74}},{"type":"FUEL","position":{"x":24,"y":67}},
    {"type":"GEARBOX","position":{"x":76,"y":76}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_19420_VTRONIC]: {
    name: 'Volkswagen Constellation 19420 VTronic semi truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_19420_VTRONIC_IMG,
    parts: [{"type":"BRAKES","position":{"x":18,"y":76}},{"type":"SUSPENSION","position":{"x":12,"y":65}},
    {"type":"WHEELS","position":{"x":6,"y":73}},{"type":"BODY","position":{"x":39,"y":47}},
    {"type":"FRAME","position":{"x":33,"y":62}},{"type":"INTERIOR","position":{"x":54,"y":33}},
    {"type":"BATTERY","position":{"x":42,"y":58}},{"type":"ELECTRONIC","position":{"x":64,"y":43}},
    {"type":"LIGHTS","position":{"x":66,"y":59}},{"type":"FIFTH_WHEEL","position":{"x":24,"y":58}},
    {"type":"COMPRESSOR","position":{"x":76,"y":78}},{"type":"ENGINE","position":{"x":88,"y":63}},
    {"type":"EXHAUST","position":{"x":34,"y":75}},{"type":"FUEL","position":{"x":22,"y":69}},
    {"type":"GEARBOX","position":{"x":89,"y":78}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_25360]: {
    name: 'Volkswagen Constellation 25360 semi truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_25360_IMG,
    parts: [{"type":"BRAKES","position":{"x":22,"y":81}},{"type":"SUSPENSION","position":{"x":15,"y":64}},
    {"type":"WHEELS","position":{"x":12,"y":76}},{"type":"BODY","position":{"x":42,"y":49}},
    {"type":"FRAME","position":{"x":35,"y":74}},{"type":"INTERIOR","position":{"x":51,"y":37}},
    {"type":"BATTERY","position":{"x":43,"y":60}},{"type":"ELECTRONIC","position":{"x":63,"y":48}},
    {"type":"LIGHTS","position":{"x":64,"y":56}},{"type":"FIFTH_WHEEL","position":{"x":25,"y":64}},
    {"type":"COMPRESSOR","position":{"x":67,"y":75}},{"type":"ENGINE","position":{"x":83,"y":59}},
    {"type":"EXHAUST","position":{"x":40,"y":79}},{"type":"FUEL","position":{"x":24,"y":72}},
    {"type":"GEARBOX","position":{"x":84,"y":79}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_25420_VTRONIC]: {
    name: 'Volkswagen Constellation 25420 VTronic semi truck',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_25420_VTRONIC_IMG,
    parts: [{"type":"BRAKES","position":{"x":25,"y":75}},{"type":"SUSPENSION","position":{"x":14,"y":66}},
    {"type":"WHEELS","position":{"x":16,"y":73}},{"type":"BODY","position":{"x":46,"y":45}},
    {"type":"FRAME","position":{"x":39,"y":71}},{"type":"INTERIOR","position":{"x":53,"y":41}},
    {"type":"BATTERY","position":{"x":46,"y":56}},{"type":"ELECTRONIC","position":{"x":67,"y":50}},
    {"type":"LIGHTS","position":{"x":71,"y":61}},{"type":"FIFTH_WHEEL","position":{"x":27,"y":59}},
    {"type":"COMPRESSOR","position":{"x":69,"y":76}},{"type":"ENGINE","position":{"x":87,"y":58}},
    {"type":"EXHAUST","position":{"x":40,"y":76}},{"type":"FUEL","position":{"x":27,"y":66}},
    {"type":"GEARBOX","position":{"x":82,"y":79}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_26280_6x4]: {
    name: 'Volkswagen Constellation 26280 tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_26280_6x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":21,"y":71}},{"type":"SUSPENSION","position":{"x":13,"y":60}},
    {"type":"WHEELS","position":{"x":11,"y":68}},{"type":"BODY","position":{"x":42,"y":47}},
    {"type":"FRAME","position":{"x":29,"y":65}},{"type":"INTERIOR","position":{"x":48,"y":40}},
    {"type":"BATTERY","position":{"x":38,"y":54}},{"type":"ELECTRONIC","position":{"x":60,"y":41}},
    {"type":"LIGHTS","position":{"x":59,"y":55}},{"type":"LOAD","position":{"x":26,"y":60}},
    {"type":"COMPRESSOR","position":{"x":58,"y":69}},{"type":"ENGINE","position":{"x":80,"y":56}},
    {"type":"EXHAUST","position":{"x":30,"y":71}},{"type":"GEARBOX","position":{"x":77,"y":68}},
    {"type":"FUEL","position":{"x":18,"y":63}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_26420_VTRONIC_6x4]: {
    name: 'Volkswagen Constellation 26420 VTronic tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_26420_VTRONIC_6x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":27,"y":78}},{"type":"SUSPENSION","position":{"x":16,"y":63}},
    {"type":"WHEELS","position":{"x":12,"y":74}},{"type":"BODY","position":{"x":41,"y":47}},
    {"type":"FRAME","position":{"x":36,"y":65}},{"type":"INTERIOR","position":{"x":53,"y":40}},
    {"type":"BATTERY","position":{"x":39,"y":56}},{"type":"ELECTRONIC","position":{"x":61,"y":43}},
    {"type":"LIGHTS","position":{"x":59,"y":56}},{"type":"LOAD","position":{"x":24,"y":60}},
    {"type":"COMPRESSOR","position":{"x":65,"y":80}},{"type":"ENGINE","position":{"x":82,"y":58}},
    {"type":"EXHAUST","position":{"x":35,"y":79}},{"type":"FUEL","position":{"x":23,"y":70}},
    {"type":"GEARBOX","position":{"x":75,"y":78}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_31280_6x4]: {
    name: 'Volkswagen Constellation 31280 tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_31280_6x4_IMG,
    parts: [{"type":"BRAKES","position":{"x":25,"y":69}},{"type":"SUSPENSION","position":{"x":15,"y":61}},
    {"type":"WHEELS","position":{"x":11,"y":70}},{"type":"BODY","position":{"x":43,"y":42}},
    {"type":"FRAME","position":{"x":33,"y":63}},{"type":"INTERIOR","position":{"x":62,"y":29}},
    {"type":"BATTERY","position":{"x":38,"y":52}},{"type":"LIGHTS","position":{"x":62,"y":53}},
    {"type":"ELECTRONIC","position":{"x":61,"y":41}},{"type":"LOAD","position":{"x":26,"y":57}},
    {"type":"COMPRESSOR","position":{"x":66,"y":70}},{"type":"ENGINE","position":{"x":80,"y":53}},
    {"type":"EXHAUST","position":{"x":37,"y":69}},{"type":"FUEL","position":{"x":21,"y":63}},
    {"type":"GEARBOX","position":{"x":78,"y":68}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CONSTELLATION_31330]: {
    name: 'Volkswagen Constellation 31330 tandem truck',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T6x2,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CONSTELLATION_31330_IMG,
    parts: [{"type":"BRAKES","position":{"x":24,"y":82}},{"type":"SUSPENSION","position":{"x":19,"y":65}},
    {"type":"WHEELS","position":{"x":11,"y":77}},{"type":"BODY","position":{"x":39,"y":54}},
    {"type":"FRAME","position":{"x":33,"y":71}},{"type":"INTERIOR","position":{"x":46,"y":40}},
    {"type":"BATTERY","position":{"x":37,"y":61}},{"type":"LIGHTS","position":{"x":63,"y":60}},
    {"type":"ELECTRONIC","position":{"x":61,"y":48}},{"type":"LOAD","position":{"x":27,"y":63}},
    {"type":"COMPRESSOR","position":{"x":66,"y":76}},{"type":"ENGINE","position":{"x":81,"y":62}},
    {"type":"EXHAUST","position":{"x":35,"y":80}},{"type":"FUEL","position":{"x":24,"y":71}},
    {"type":"GEARBOX","position":{"x":82,"y":75}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CRAFTER_FRAME_L3]: {
    name: 'Volkswagen Crafter L3 Frame',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L3BODY,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CRAFTER_FRAME_L3_IMG,
    parts: [{"type":"BRAKES","position":{"x":79,"y":69}},{"type":"SUSPENSION","position":{"x":78,"y":61}},
    {"type":"WHEELS","position":{"x":88,"y":65}},{"type":"BODY","position":{"x":72,"y":54}},
    {"type":"FRAME","position":{"x":74,"y":59}},{"type":"INTERIOR","position":{"x":53,"y":33}},
    {"type":"BATTERY","position":{"x":53,"y":46}},{"type":"ELECTRONIC","position":{"x":46,"y":46}},
    {"type":"LIGHTS","position":{"x":49,"y":56}},{"type":"LOAD","position":{"x":76,"y":56}},
    {"type":"ENGINE","position":{"x":24,"y":60}},{"type":"EXHAUST","position":{"x":74,"y":67}},
    {"type":"FUEL","position":{"x":75,"y":50}},{"type":"GEARBOX","position":{"x":29,"y":71}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CRAFTER_FRAME_L4]: {
    name: 'Volkswagen Crafter L4 Frame',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L4BODY,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CRAFTER_FRAME_L4_IMG,
    parts: [{"type":"BRAKES","position":{"x":82,"y":63}},{"type":"SUSPENSION","position":{"x":81,"y":59}},
    {"type":"WHEELS","position":{"x":90,"y":62}},{"type":"BODY","position":{"x":69,"y":47}},
    {"type":"FRAME","position":{"x":74,"y":58}},{"type":"INTERIOR","position":{"x":47,"y":34}},
    {"type":"BATTERY","position":{"x":50,"y":45}},{"type":"ELECTRONIC","position":{"x":43,"y":44}},
    {"type":"LIGHTS","position":{"x":47,"y":58}},{"type":"LOAD","position":{"x":77,"y":55}},
    {"type":"ENGINE","position":{"x":22,"y":61}},{"type":"EXHAUST","position":{"x":71,"y":70}},
    {"type":"FUEL","position":{"x":70,"y":55}},{"type":"GEARBOX","position":{"x":26,"y":72}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CRAFTER_FRAME_L5]: {
    name: 'Volkswagen Crafter L5 Frame',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L4BODY,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CRAFTER_FRAME_L5_IMG,
    parts: [{"type":"BRAKES","position":{"x":80,"y":64}},{"type":"SUSPENSION","position":{"x":78,"y":59}},
    {"type":"WHEELS","position":{"x":91,"y":62}},{"type":"BODY","position":{"x":67,"y":47}},
    {"type":"FRAME","position":{"x":74,"y":58}},{"type":"INTERIOR","position":{"x":50,"y":36}},
    {"type":"BATTERY","position":{"x":48,"y":46}},{"type":"ELECTRONIC","position":{"x":42,"y":46}},
    {"type":"LIGHTS","position":{"x":47,"y":56}},{"type":"LOAD","position":{"x":77,"y":56}},
    {"type":"ENGINE","position":{"x":20,"y":61}},{"type":"EXHAUST","position":{"x":71,"y":67}},
    {"type":"FUEL","position":{"x":68,"y":53}},{"type":"GEARBOX","position":{"x":22,"y":71}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CRAFTER_L3H3]: {
    name: 'Volkswagen Crafter L3H3',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L3H3,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CRAFTER_L3H3_IMG,
    parts: [{"type":"BRAKES","position":{"x":85,"y":73}},{"type":"SUSPENSION","position":{"x":89,"y":61}},
    {"type":"WHEELS","position":{"x":91,"y":70}},{"type":"BODY","position":{"x":78,"y":52}},
    {"type":"FRAME","position":{"x":76,"y":73}},{"type":"INTERIOR","position":{"x":51,"y":39}},
    {"type":"BATTERY","position":{"x":54,"y":47}},{"type":"ELECTRONIC","position":{"x":47,"y":46}},
    {"type":"LIGHTS","position":{"x":54,"y":59}},{"type":"DOORS","position":{"x":92,"y":44}},
    {"type":"LOAD","position":{"x":86,"y":56}},{"type":"ENGINE","position":{"x":26,"y":65}},
    {"type":"EXHAUST","position":{"x":71,"y":76}},{"type":"FUEL","position":{"x":77,"y":59}},
    {"type":"GEARBOX","position":{"x":25,"y":76}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CRAFTER_L4H3]: {
    name: 'Volkswagen Crafter L4H3',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L4H3,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CRAFTER_L4H3_IMG,
    parts: [{"type":"BRAKES","position":{"x":85,"y":67}},{"type":"SUSPENSION","position":{"x":89,"y":58}},
    {"type":"WHEELS","position":{"x":92,"y":65}},{"type":"BODY","position":{"x":77,"y":37}},
    {"type":"FRAME","position":{"x":75,"y":70}},{"type":"INTERIOR","position":{"x":40,"y":38}},
    {"type":"BATTERY","position":{"x":52,"y":46}},{"type":"ELECTRONIC","position":{"x":44,"y":47}},
    {"type":"LIGHTS","position":{"x":48,"y":59}},{"type":"DOORS","position":{"x":93,"y":46}},
    {"type":"LOAD","position":{"x":81,"y":57}},{"type":"ENGINE","position":{"x":22,"y":63}},
    {"type":"EXHAUST","position":{"x":70,"y":73}},{"type":"FUEL","position":{"x":72,"y":57}},
    {"type":"GEARBOX","position":{"x":25,"y":76}}]
  },
  [EEquipmentModel.VOLKSWAGEN_CRAFTER_L5H3]: {
    name: 'Volkswagen Crafter L5H3',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L4H3,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_CRAFTER_L5H3_IMG,
    parts: [{"type":"BRAKES","position":{"x":83,"y":68}},{"type":"SUSPENSION","position":{"x":89,"y":58}},
    {"type":"WHEELS","position":{"x":88,"y":64}},{"type":"BODY","position":{"x":73,"y":48}},
    {"type":"FRAME","position":{"x":78,"y":69}},{"type":"INTERIOR","position":{"x":49,"y":35}},
    {"type":"LIGHTS","position":{"x":46,"y":56}},{"type":"ELECTRONIC","position":{"x":44,"y":48}},
    {"type":"BATTERY","position":{"x":51,"y":47}},{"type":"DOORS","position":{"x":92,"y":42}},
    {"type":"LOAD","position":{"x":83,"y":55}},{"type":"ENGINE","position":{"x":23,"y":63}},
    {"type":"EXHAUST","position":{"x":67,"y":71}},{"type":"FUEL","position":{"x":70,"y":57}},
    {"type":"GEARBOX","position":{"x":24,"y":73}}]
  },
  [EEquipmentModel.VOLKSWAGEN_DELIVERY_6160]: {
    name: 'Volkswagen Delivery 6160',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_DELIVERY_6160_IMG,
    parts: [{"type":"BRAKES","position":{"x":78,"y":68}},{"type":"SUSPENSION","position":{"x":82,"y":61}},
    {"type":"WHEELS","position":{"x":86,"y":68}},{"type":"BODY","position":{"x":47,"y":48}},
    {"type":"FRAME","position":{"x":61,"y":60}},{"type":"INTERIOR","position":{"x":24,"y":41}},
    {"type":"LIGHTS","position":{"x":29,"y":63}},{"type":"BATTERY","position":{"x":51,"y":56}},
    {"type":"ELECTRONIC","position":{"x":32,"y":50}},{"type":"LOAD","position":{"x":67,"y":61}},
    {"type":"ENGINE","position":{"x":16,"y":57}},{"type":"EXHAUST","position":{"x":54,"y":66}},
    {"type":"FUEL","position":{"x":54,"y":60}},{"type":"GEARBOX","position":{"x":14,"y":67}}]
  },
  [EEquipmentModel.VOLKSWAGEN_DELIVERY_9170]: {
    name: 'Volkswagen Delivery 9170',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_DELIVERY_9170_IMG,
    parts: [{"type":"SUSPENSION","position":{"x":82,"y":61}},{"type":"BODY","position":{"x":47,"y":48}},
    {"type":"FRAME","position":{"x":61,"y":60}},{"type":"INTERIOR","position":{"x":24,"y":41}},
    {"type":"LIGHTS","position":{"x":29,"y":63}},{"type":"BATTERY","position":{"x":51,"y":56}},
    {"type":"ELECTRONIC","position":{"x":32,"y":50}},{"type":"ENGINE","position":{"x":16,"y":57}},
    {"type":"EXHAUST","position":{"x":54,"y":66}},{"type":"FUEL","position":{"x":54,"y":60}},
    {"type":"GEARBOX","position":{"x":14,"y":67}},{"type":"LOAD","position":{"x":69,"y":56}},
    {"type":"WHEELS","position":{"x":90,"y":64}},{"type":"BRAKES","position":{"x":81,"y":68}}]
  },
  [EEquipmentModel.VOLKSWAGEN_DELIVERY_11180]: {
    name: 'Volkswagen Delivery 11180',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TRAILER_T4x2_small,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_DELIVERY_11180_IMG,
    parts: [{"type":"SUSPENSION","position":{"x":82,"y":61}},{"type":"BODY","position":{"x":47,"y":48}},
    {"type":"FRAME","position":{"x":61,"y":60}},{"type":"INTERIOR","position":{"x":24,"y":41}},
    {"type":"LIGHTS","position":{"x":29,"y":63}},{"type":"BATTERY","position":{"x":51,"y":56}},
    {"type":"ELECTRONIC","position":{"x":32,"y":50}},{"type":"ENGINE","position":{"x":16,"y":57}},
    {"type":"EXHAUST","position":{"x":54,"y":66}},{"type":"FUEL","position":{"x":54,"y":60}},
    {"type":"GEARBOX","position":{"x":14,"y":67}},{"type":"LOAD","position":{"x":69,"y":56}},
    {"type":"WHEELS","position":{"x":90,"y":64}},{"type":"BRAKES","position":{"x":81,"y":68}}]
  },
  [EEquipmentModel.VOLKSWAGEN_TRANSPORTER_L1]: {
    name: 'Volkswagen Transporter L1',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L1H1,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_TRANSPORTER_L1_IMG,
    parts: [{"type":"BRAKES","position":{"x":85,"y":67}},{"type":"SUSPENSION","position":{"x":91,"y":56}},
    {"type":"WHEELS","position":{"x":93,"y":66}},{"type":"BODY","position":{"x":83,"y":50}},
    {"type":"FRAME","position":{"x":82,"y":68}},{"type":"INTERIOR","position":{"x":56,"y":30}},
    {"type":"BATTERY","position":{"x":58,"y":43}},{"type":"ELECTRONIC","position":{"x":52,"y":43}},
    {"type":"LIGHTS","position":{"x":55,"y":51}},{"type":"DOORS","position":{"x":94,"y":40}},
    {"type":"LOAD","position":{"x":85,"y":60}},{"type":"ENGINE","position":{"x":26,"y":59}},
    {"type":"EXHAUST","position":{"x":74,"y":71}},{"type":"FUEL","position":{"x":80,"y":55}},
    {"type":"GEARBOX","position":{"x":33,"y":70}}]
  },
  [EEquipmentModel.VOLKSWAGEN_TRANSPORTER_L2]: {
    name: 'Volkswagen Transporter L2',
    type: EEquipmentModelType.VAN,
    subType: EEquipmentModelSubType[EEquipmentModelType.VAN].L2H1,
    brand: EBrand.VOLKSWAGEN,
    image: VOLKSWAGEN_TRANSPORTER_L2_IMG,
    parts: [{"type":"BRAKES","position":{"x":85,"y":67}},{"type":"SUSPENSION","position":{"x":91,"y":56}},
    {"type":"WHEELS","position":{"x":93,"y":66}},{"type":"BODY","position":{"x":83,"y":50}},
    {"type":"FRAME","position":{"x":82,"y":68}},{"type":"INTERIOR","position":{"x":56,"y":30}},
    {"type":"BATTERY","position":{"x":58,"y":43}},{"type":"ELECTRONIC","position":{"x":52,"y":43}},
    {"type":"LIGHTS","position":{"x":55,"y":51}},{"type":"DOORS","position":{"x":94,"y":40}},
    {"type":"LOAD","position":{"x":85,"y":60}},{"type":"ENGINE","position":{"x":26,"y":59}},
    {"type":"EXHAUST","position":{"x":74,"y":71}},{"type":"GEARBOX","position":{"x":33,"y":70}},
    {"type":"FUEL","position":{"x":75,"y":54}}]
  },
  [EEquipmentModel.VOLVO_FH_2_4x2]: {
    name: 'Volvo FH Mk2 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.VOLVO,
    image: VOLVO_FH_2_4x2_IMG,
    parts: [{"type":"SUSPENSION","position":{"x":53,"y":67}},{"type":"WHEELS","position":{"x":60,"y":76}},
            {"type":"BRAKES","position":{"x":53,"y":76}},{"type":"BATTERY","position":{"x":28,"y":66}},
            {"type":"LIGHTS","position":{"x":10,"y":68}},{"type":"ELECTRONIC","position":{"x":34,"y":60}},
            {"type":"FIFTH_WHEEL","position":{"x":69,"y":59}},{"type":"COMPRESSOR","position":{"x":13,"y":71}},
            {"type":"ENGINE","position":{"x":23,"y":73}},{"type":"EXHAUST","position":{"x":68,"y":73}},
            {"type":"FUEL","position":{"x":74,"y":61}},{"type":"GEARBOX","position":{"x":39,"y":66}},
            {"type":"BODY","position":{"x":14,"y":52}},{"type":"FRAME","position":{"x":22,"y":78}},
            {"type":"INTERIOR","position":{"x":33,"y":40}}]
  },
  [EEquipmentModel.VOLVO_FH_2_6x2]: {
    name: 'Volvo FH Mk2 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.VOLVO,
    image: VOLVO_FH_2_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":46,"y":75}},{"type":"WHEELS","position":{"x":55,"y":76}},
          {"type":"SUSPENSION","position":{"x":50,"y":67}},{"type":"BODY","position":{"x":10,"y":52}},
          {"type":"FRAME","position":{"x":24,"y":80}},{"type":"INTERIOR","position":{"x":26,"y":43}},
          {"type":"FIFTH_WHEEL","position":{"x":68,"y":57}},{"type":"BATTERY","position":{"x":19,"y":64}},
          {"type":"ELECTRONIC","position":{"x":31,"y":58}},{"type":"LIGHTS","position":{"x":7,"y":68}},
          {"type":"COMPRESSOR","position":{"x":10,"y":72}},{"type":"ENGINE","position":{"x":21,"y":75}},
          {"type":"EXHAUST","position":{"x":62,"y":74}},{"type":"FUEL","position":{"x":70,"y":67}},
          {"type":"GEARBOX","position":{"x":30,"y":68}}]
  },
  [EEquipmentModel.VOLVO_FH_3_4x2]: {
    name: 'Volvo FH Mk3 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.VOLVO,
    image: VOLVO_FH_3_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":75}},{"type":"WHEELS","position":{"x":59,"y":77}},
            {"type":"SUSPENSION","position":{"x":54,"y":67}},{"type":"BODY","position":{"x":11,"y":61}},
            {"type":"FRAME","position":{"x":20,"y":81}},{"type":"INTERIOR","position":{"x":25,"y":41}},
            {"type":"BATTERY","position":{"x":23,"y":61}},{"type":"ELECTRONIC","position":{"x":36,"y":63}},
            {"type":"LIGHTS","position":{"x":10,"y":72}},{"type":"FIFTH_WHEEL","position":{"x":74,"y":59}},
            {"type":"COMPRESSOR","position":{"x":15,"y":73}},{"type":"ENGINE","position":{"x":24,"y":76}},
            {"type":"EXHAUST","position":{"x":69,"y":72}},{"type":"FUEL","position":{"x":75,"y":65}},
            {"type":"GEARBOX","position":{"x":36,"y":70}}]
  },
  [EEquipmentModel.VOLVO_FH_3_6x2]: {
    name: 'Volvo FH Mk3 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2,
    brand: EBrand.VOLVO,
    image: VOLVO_FH_3_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":47,"y":77}},{"type":"WHEELS","position":{"x":56,"y":80}},
            {"type":"SUSPENSION","position":{"x":51,"y":68}},{"type":"BODY","position":{"x":8,"y":60}},
            {"type":"FRAME","position":{"x":19,"y":85}},{"type":"INTERIOR","position":{"x":28,"y":40}},
            {"type":"LIGHTS","position":{"x":8,"y":73}},{"type":"ELECTRONIC","position":{"x":31,"y":65}},
            {"type":"BATTERY","position":{"x":18,"y":67}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":62}},
            {"type":"COMPRESSOR","position":{"x":12,"y":77}},{"type":"ENGINE","position":{"x":22,"y":76}},
            {"type":"EXHAUST","position":{"x":60,"y":74}},{"type":"FUEL","position":{"x":69,"y":73}},
            {"type":"GEARBOX","position":{"x":31,"y":71}}]
  },
  [EEquipmentModel.VOLVO_FH_4]: {
    name: 'Volvo FH Mk4',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2,
    brand: EBrand.VOLVO,
    image: VOLVO_FH_4_IMG,
    parts: [{"type":"BRAKES","position":{"x":72,"y":91}},{"type":"SUSPENSION","position":{"x":75,"y":73}},
    {"type":"WHEELS","position":{"x":81,"y":90}},{"type":"BODY","position":{"x":79,"y":59}},
    {"type":"FRAME","position":{"x":77,"y":94}},{"type":"INTERIOR","position":{"x":71,"y":29}},
    {"type":"LIGHTS","position":{"x":23,"y":81}},{"type":"ELECTRONIC","position":{"x":67,"y":59}},
    {"type":"BATTERY","position":{"x":72,"y":66}},{"type":"FIFTH_WHEEL","position":{"x":49,"y":54}},
    {"type":"COMPRESSOR","position":{"x":35,"y":87}},{"type":"ENGINE","position":{"x":49,"y":67}},
    {"type":"EXHAUST","position":{"x":25,"y":90}},{"type":"FUEL","position":{"x":18,"y":85}},
    {"type":"GEARBOX","position":{"x":50,"y":88}}]
  },
  [EEquipmentModel.VOLVO_FMX]: {
    name: 'Volvo FMX',
    type: EEquipmentModelType.TANDEM,
    subType: EEquipmentModelSubType[EEquipmentModelType.TANDEM].TIPPER_T8x4,
    brand: EBrand.VOLVO,
    image: VOLVO_FMX_IMG,
    parts: [{"type":"BRAKES","position":{"x":79,"y":74}},{"type":"SUSPENSION","position":{"x":85,"y":64}},
    {"type":"WHEELS","position":{"x":88,"y":72}},{"type":"BODY","position":{"x":61,"y":46}},
    {"type":"FRAME","position":{"x":66,"y":74}},{"type":"INTERIOR","position":{"x":39,"y":29}},
    {"type":"BATTERY","position":{"x":60,"y":54}},{"type":"ELECTRONIC","position":{"x":41,"y":43}},
    {"type":"LIGHTS","position":{"x":40,"y":60}},{"type":"DOORS","position":{"x":95,"y":52}},
    {"type":"HYDRAULIC","position":{"x":68,"y":53}},{"type":"LOAD","position":{"x":79,"y":50}},
    {"type":"COMPRESSOR","position":{"x":11,"y":59}},{"type":"ENGINE","position":{"x":19,"y":52}},
    {"type":"EXHAUST","position":{"x":68,"y":71}},{"type":"FUEL","position":{"x":81,"y":69}},
    {"type":"GEARBOX","position":{"x":24,"y":67}}]
  },
  [EEquipmentModel.VOLVO_VNL_300_4x2]: {
    name: 'Volvo VNL 300 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2_big,
    brand: EBrand.VOLVO,
    image: VOLVO_VNL_300_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":81,"y":83}},{"type":"SUSPENSION","position":{"x":86,"y":71}},
    {"type":"WHEELS","position":{"x":91,"y":81}},{"type":"BODY","position":{"x":73,"y":55}},
    {"type":"FRAME","position":{"x":74,"y":84}},{"type":"INTERIOR","position":{"x":52,"y":45}},
    {"type":"BATTERY","position":{"x":74,"y":66}},{"type":"ELECTRONIC","position":{"x":49,"y":54}},
    {"type":"LIGHTS","position":{"x":40,"y":71}},{"type":"FIFTH_WHEEL","position":{"x":81,"y":68}},
    {"type":"COMPRESSOR","position":{"x":11,"y":78}},{"type":"ENGINE","position":{"x":23,"y":69}},
    {"type":"EXHAUST","position":{"x":69,"y":86}},{"type":"FUEL","position":{"x":69,"y":73}},
    {"type":"GEARBOX","position":{"x":25,"y":82}}]
  },
  [EEquipmentModel.VOLVO_VNL_300_6x2]: {
    name: 'Volvo VNL 300 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.VOLVO,
    image: VOLVO_VNL_300_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":86,"y":77}},{"type":"SUSPENSION","position":{"x":82,"y":69}},
    {"type":"WHEELS","position":{"x":92,"y":74}},{"type":"BODY","position":{"x":65,"y":55}},
    {"type":"FRAME","position":{"x":68,"y":81}},{"type":"INTERIOR","position":{"x":42,"y":46}},
    {"type":"BATTERY","position":{"x":65,"y":66}},{"type":"ELECTRONIC","position":{"x":43,"y":52}},
    {"type":"LIGHTS","position":{"x":37,"y":67}},{"type":"FIFTH_WHEEL","position":{"x":75,"y":64}},
    {"type":"COMPRESSOR","position":{"x":7,"y":74}},{"type":"ENGINE","position":{"x":20,"y":63}},
    {"type":"EXHAUST","position":{"x":56,"y":80}},{"type":"FUEL","position":{"x":60,"y":70}},
    {"type":"GEARBOX","position":{"x":22,"y":78}}]
  },
  [EEquipmentModel.VOLVO_VNL_400]: {
    name: 'Volvo VNL 400 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.VOLVO,
    image: VOLVO_VNL_400_IMG,
    parts: [{"type":"BRAKES","position":{"x":73,"y":72}},{"type":"SUSPENSION","position":{"x":78,"y":63}},
    {"type":"WHEELS","position":{"x":82,"y":70}},{"type":"BODY","position":{"x":70,"y":55}},
    {"type":"FRAME","position":{"x":67,"y":72}},{"type":"INTERIOR","position":{"x":45,"y":39}},
    {"type":"BATTERY","position":{"x":68,"y":58}},{"type":"ELECTRONIC","position":{"x":42,"y":44}},
    {"type":"LIGHTS","position":{"x":33,"y":59}},{"type":"FIFTH_WHEEL","position":{"x":74,"y":57}},
    {"type":"COMPRESSOR","position":{"x":8,"y":69}},{"type":"ENGINE","position":{"x":12,"y":59}},
    {"type":"EXHAUST","position":{"x":41,"y":25}},{"type":"GEARBOX","position":{"x":21,"y":71}},
    {"type":"FUEL","position":{"x":71,"y":65}}]
  },
  [EEquipmentModel.VOLVO_VNL_740_6x2]: {
    name: 'Volvo VNL 740 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.VOLVO,
    image: VOLVO_VNL_740_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":79,"y":71}},{"type":"SUSPENSION","position":{"x":80,"y":64}},
    {"type":"WHEELS","position":{"x":84,"y":70}},{"type":"BODY","position":{"x":71,"y":49}},
    {"type":"INTERIOR","position":{"x":42,"y":40}},{"type":"FRAME","position":{"x":72,"y":73}},
    {"type":"BATTERY","position":{"x":71,"y":60}},{"type":"ELECTRONIC","position":{"x":39,"y":50}},
    {"type":"LIGHTS","position":{"x":31,"y":63}},{"type":"FIFTH_WHEEL","position":{"x":77,"y":60}},
    {"type":"COMPRESSOR","position":{"x":8,"y":69}},{"type":"ENGINE","position":{"x":14,"y":58}},
    {"type":"EXHAUST","position":{"x":55,"y":22}},{"type":"FUEL","position":{"x":76,"y":67}},
    {"type":"GEARBOX","position":{"x":20,"y":71}}]
  },
  [EEquipmentModel.VOLVO_VNL_760]: {
    name: 'Volvo VNL 760 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.VOLVO,
    image: VOLVO_VNL_760_IMG,
    parts: [{"type":"BRAKES","position":{"x":77,"y":75}},{"type":"SUSPENSION","position":{"x":80,"y":69}},
    {"type":"WHEELS","position":{"x":85,"y":73}},{"type":"BODY","position":{"x":73,"y":58}},
    {"type":"FRAME","position":{"x":72,"y":77}},{"type":"INTERIOR","position":{"x":38,"y":42}},
    {"type":"BATTERY","position":{"x":75,"y":62}},{"type":"ELECTRONIC","position":{"x":42,"y":53}},
    {"type":"LIGHTS","position":{"x":32,"y":66}},{"type":"FIFTH_WHEEL","position":{"x":79,"y":64}},
    {"type":"COMPRESSOR","position":{"x":6,"y":75}},{"type":"ENGINE","position":{"x":11,"y":65}},
    {"type":"EXHAUST","position":{"x":47,"y":19}},{"type":"FUEL","position":{"x":69,"y":69}},
    {"type":"GEARBOX","position":{"x":16,"y":74}}]
  },
  [EEquipmentModel.VOLVO_VNL_860]: {
    name: 'Volvo VNL 860 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.VOLVO,
    image: VOLVO_VNL_860_IMG,
    parts: [{"type":"BRAKES","position":{"x":77,"y":74}},{"type":"SUSPENSION","position":{"x":79,"y":69}},
    {"type":"WHEELS","position":{"x":83,"y":73}},{"type":"BODY","position":{"x":73,"y":56}},
    {"type":"FRAME","position":{"x":74,"y":77}},{"type":"INTERIOR","position":{"x":39,"y":45}},
    {"type":"BATTERY","position":{"x":70,"y":65}},{"type":"ELECTRONIC","position":{"x":38,"y":55}},
    {"type":"LIGHTS","position":{"x":32,"y":66}},{"type":"FIFTH_WHEEL","position":{"x":78,"y":65}},
    {"type":"COMPRESSOR","position":{"x":8,"y":76}},{"type":"ENGINE","position":{"x":13,"y":66}},
    {"type":"EXHAUST","position":{"x":49,"y":18}},{"type":"FUEL","position":{"x":64,"y":74}},
    {"type":"GEARBOX","position":{"x":17,"y":77}}]
  },
  [EEquipmentModel.VOLVO_VNR_300_4x2]: {
    name: 'Volvo VNR 300 4x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T4x2_big,
    brand: EBrand.VOLVO,
    image: VOLVO_VNR_300_4x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":84,"y":70}},{"type":"SUSPENSION","position":{"x":86,"y":62}},
    {"type":"WHEELS","position":{"x":91,"y":68}},{"type":"BODY","position":{"x":67,"y":50}},
    {"type":"FRAME","position":{"x":64,"y":73}},{"type":"INTERIOR","position":{"x":47,"y":27}},
    {"type":"BATTERY","position":{"x":64,"y":57}},{"type":"ELECTRONIC","position":{"x":45,"y":44}},
    {"type":"LIGHTS","position":{"x":41,"y":59}},{"type":"FIFTH_WHEEL","position":{"x":72,"y":57}},
    {"type":"COMPRESSOR","position":{"x":11,"y":67}},{"type":"ENGINE","position":{"x":18,"y":56}},
    {"type":"EXHAUST","position":{"x":34,"y":22}},{"type":"FUEL","position":{"x":80,"y":67}},
    {"type":"GEARBOX","position":{"x":24,"y":68}}]
  },
  [EEquipmentModel.VOLVO_VNR_300_6x2]: {
    name: 'Volvo VNR 300 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.VOLVO,
    image: VOLVO_VNR_300_6x2_IMG,
    parts: [{"type":"BRAKES","position":{"x":73,"y":70}},{"type":"SUSPENSION","position":{"x":76,"y":61}},
    {"type":"WHEELS","position":{"x":81,"y":66}},{"type":"BODY","position":{"x":58,"y":49}},
    {"type":"FRAME","position":{"x":55,"y":69}},{"type":"INTERIOR","position":{"x":29,"y":36}},
    {"type":"BATTERY","position":{"x":59,"y":56}},{"type":"ELECTRONIC","position":{"x":39,"y":45}},
    {"type":"LIGHTS","position":{"x":34,"y":57}},{"type":"FIFTH_WHEEL","position":{"x":69,"y":57}},
    {"type":"COMPRESSOR","position":{"x":7,"y":62}},{"type":"ENGINE","position":{"x":17,"y":56}},
    {"type":"EXHAUST","position":{"x":33,"y":24}},{"type":"FUEL","position":{"x":69,"y":64}},
    {"type":"GEARBOX","position":{"x":20,"y":67}}]
  },
  [EEquipmentModel.VOLVO_VNR_400]: {
    name: 'Volvo VNR 400 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.VOLVO,
    image: VOLVO_VNR_400_IMG,
    parts: [{"type":"BRAKES","position":{"x":74,"y":71}},{"type":"SUSPENSION","position":{"x":78,"y":61}},
    {"type":"WHEELS","position":{"x":81,"y":66}},{"type":"BODY","position":{"x":70,"y":52}},
    {"type":"FRAME","position":{"x":55,"y":71}},{"type":"INTERIOR","position":{"x":30,"y":37}},
    {"type":"BATTERY","position":{"x":65,"y":57}},{"type":"ELECTRONIC","position":{"x":42,"y":45}},
    {"type":"LIGHTS","position":{"x":35,"y":63}},{"type":"FIFTH_WHEEL","position":{"x":73,"y":60}},
    {"type":"COMPRESSOR","position":{"x":6,"y":64}},{"type":"ENGINE","position":{"x":15,"y":58}},
    {"type":"EXHAUST","position":{"x":44,"y":25}},{"type":"FUEL","position":{"x":72,"y":64}},
    {"type":"GEARBOX","position":{"x":17,"y":65}}]
  },
  [EEquipmentModel.VOLVO_VNR_640]: {
    name: 'Volvo VNR 640 6x2',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.VOLVO,
    image: VOLVO_VNR_640_IMG,
    parts: [{"type":"BRAKES","position":{"x":74,"y":70}},{"type":"SUSPENSION","position":{"x":74,"y":64}},
    {"type":"WHEELS","position":{"x":80,"y":70}},{"type":"BODY","position":{"x":67,"y":49}},
    {"type":"FRAME","position":{"x":56,"y":73}},{"type":"INTERIOR","position":{"x":33,"y":40}},
    {"type":"BATTERY","position":{"x":69,"y":59}},{"type":"ELECTRONIC","position":{"x":42,"y":47}},
    {"type":"LIGHTS","position":{"x":35,"y":60}},{"type":"FIFTH_WHEEL","position":{"x":77,"y":61}},
    {"type":"COMPRESSOR","position":{"x":8,"y":70}},{"type":"ENGINE","position":{"x":18,"y":60}},
    {"type":"EXHAUST","position":{"x":42,"y":23}},{"type":"FUEL","position":{"x":69,"y":67}},
    {"type":"GEARBOX","position":{"x":21,"y":70}}]
  },
  [EEquipmentModel.WABASH_FLATBED_ALU]: {
    name: 'Wabash Benson Flatbed Aluminium Semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.WABASH,
    image: WABASH_FLATBED_ALU_IMG,
    parts: [{"type":"BRAKES","position":{"x":30,"y":52}},{"type":"SUSPENSION","position":{"x":25,"y":40}},
    {"type":"WHEELS","position":{"x":18,"y":48}},{"type":"FRAME","position":{"x":16,"y":35}},
    {"type":"SUPPORT","position":{"x":11,"y":41}},{"type":"LIGHTS","position":{"x":51,"y":53}},
    {"type":"LOAD","position":{"x":42,"y":41}},{"type":"TRAILER_ATTACHMENT","position":{"x":9,"y":31}}]
  },
  [EEquipmentModel.WABASH_FLATBED_ALU_DROP_DECK]: {
    name: 'Wabash Benson Flatbed Drop Deck Aluminium Semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FLATBED_1_1_AXLES,
    brand: EBrand.WABASH,
    image: WABASH_FLATBED_ALU_DROP_DECK_IMG,
    parts: [{"type":"BRAKES","position":{"x":85,"y":49}},{"type":"SUSPENSION","position":{"x":87,"y":44}},
    {"type":"WHEELS","position":{"x":90,"y":51}},{"type":"FRAME","position":{"x":60,"y":55}},
    {"type":"SUPPORT","position":{"x":49,"y":65}},{"type":"LIGHTS","position":{"x":96,"y":43}},
    {"type":"LOAD","position":{"x":68,"y":48}},{"type":"TRAILER_ATTACHMENT","position":{"x":21,"y":53}}]
  },
  [EEquipmentModel.WABASH_REEFER_ARCTIC_LITE]: {
    name: 'Wabash Reefer Arctic Lite semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_2_AXLES,
    brand: EBrand.WABASH,
    image: WABASH_REEFER_ARCTIC_LITE_IMG,
    parts: [{"type":"BRAKES","position":{"x":55,"y":74}},{"type":"SUSPENSION","position":{"x":52,"y":66}},
    {"type":"WHEELS","position":{"x":48,"y":72}},{"type":"BODY","position":{"x":19,"y":53}},
    {"type":"FRAME","position":{"x":22,"y":61}},{"type":"SUPPORT","position":{"x":14,"y":67}},
    {"type":"LIGHTS","position":{"x":71,"y":62}},{"type":"DOORS","position":{"x":82,"y":42}},
    {"type":"FRIGO","position":{"x":4,"y":45}},{"type":"LOAD","position":{"x":38,"y":54}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":10,"y":58}}]
  },
  [EEquipmentModel.WABASH_REEFER_MSC]: {
    name: 'Wabash Reefer MSC semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].FRIGO_2_AXLES,
    brand: EBrand.WABASH,
    image: WABASH_REEFER_MSC_IMG,
    parts: [{"type":"BRAKES","position":{"x":39,"y":73}},{"type":"SUSPENSION","position":{"x":37,"y":64}},
    {"type":"WHEELS","position":{"x":33,"y":70}},{"type":"BODY","position":{"x":26,"y":44}},
    {"type":"SUPPORT","position":{"x":12,"y":68}},{"type":"FRAME","position":{"x":13,"y":59}},
    {"type":"LIGHTS","position":{"x":57,"y":65}},{"type":"DOORS","position":{"x":70,"y":50}},
    {"type":"FRIGO","position":{"x":4,"y":50}},{"type":"LOAD","position":{"x":27,"y":53}},
    {"type":"TRAILER_ATTACHMENT","position":{"x":6,"y":60}}]
  },
  [EEquipmentModel.WABASH_TANK_3A_SANITARY]: {
    name: 'Wabash Walker Tank 3a Sanitary semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.WABASH,
    image: WABASH_TANK_3A_SANITARY_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":67}},{"type":"SUSPENSION","position":{"x":51,"y":57}},
    {"type":"WHEELS","position":{"x":56,"y":63}},{"type":"BODY","position":{"x":52,"y":41}},
    {"type":"FRAME","position":{"x":72,"y":49}},{"type":"SUPPORT","position":{"x":81,"y":61}},
    {"type":"LIGHTS","position":{"x":29,"y":58}},{"type":"DOORS","position":{"x":66,"y":31}},
    {"type":"LOAD","position":{"x":66,"y":41}},{"type":"TRAILER_ATTACHMENT","position":{"x":92,"y":52}}]
  },
  [EEquipmentModel.WABASH_TANK_ALU_DRY_BULK]: {
    name: 'Wabash Beall Aluminium Tank dry bulk semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.WABASH,
    image: WABASH_TANK_ALU_DRY_BULK_IMG,
    parts: [{"type":"BRAKES","position":{"x":53,"y":70}},{"type":"SUSPENSION","position":{"x":55,"y":60}},
    {"type":"WHEELS","position":{"x":60,"y":68}},{"type":"BODY","position":{"x":28,"y":50}},
    {"type":"FRAME","position":{"x":27,"y":62}},{"type":"SUPPORT","position":{"x":17,"y":74}},
    {"type":"LIGHTS","position":{"x":70,"y":60}},{"type":"DOORS","position":{"x":40,"y":32}},
    {"type":"LOAD","position":{"x":36,"y":52}},{"type":"TRAILER_ATTACHMENT","position":{"x":13,"y":66}}]
  },
  [EEquipmentModel.WABASH_TANK_ALU_PETROLEUM]: {
    name: 'Wabash Beall Aluminium Tank petroleum semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.WABASH,
    image: WABASH_TANK_ALU_PETROLEUM_IMG,
    parts: [{"type":"BRAKES","position":{"x":35,"y":64}},{"type":"SUSPENSION","position":{"x":41,"y":56}},
    {"type":"WHEELS","position":{"x":42,"y":65}},{"type":"BODY","position":{"x":50,"y":42}},
    {"type":"FRAME","position":{"x":52,"y":55}},{"type":"SUPPORT","position":{"x":79,"y":65}},
    {"type":"LIGHTS","position":{"x":23,"y":57}},{"type":"DOORS","position":{"x":55,"y":36}},
    {"type":"LOAD","position":{"x":67,"y":48}},{"type":"TRAILER_ATTACHMENT","position":{"x":90,"y":54}}]
  },
  [EEquipmentModel.WABASH_TANK_DEF]: {
    name: 'Wabash Walker Tank DEF semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.WABASH,
    image: WABASH_TANK_DEF_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":67}},{"type":"SUSPENSION","position":{"x":48,"y":56}},
    {"type":"WHEELS","position":{"x":55,"y":63}},{"type":"BODY","position":{"x":55,"y":42}},
    {"type":"FRAME","position":{"x":62,"y":50}},{"type":"SUPPORT","position":{"x":80,"y":64}},
    {"type":"LIGHTS","position":{"x":31,"y":54}},{"type":"LOAD","position":{"x":66,"y":41}},
    {"type":"DOORS","position":{"x":65,"y":28}},{"type":"TRAILER_ATTACHMENT","position":{"x":92,"y":49}}]
  },
  [EEquipmentModel.WABASH_TANK_FOOD]: {
    name: 'Wabash Walker Tank Food semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TANK_2_AXLES,
    brand: EBrand.WABASH,
    image: WABASH_TANK_FOOD_IMG,
    parts: [{"type":"BRAKES","position":{"x":49,"y":65}},{"type":"SUSPENSION","position":{"x":50,"y":56}},
    {"type":"WHEELS","position":{"x":55,"y":62}},{"type":"BODY","position":{"x":59,"y":41}},
    {"type":"FRAME","position":{"x":63,"y":55}},{"type":"SUPPORT","position":{"x":75,"y":68}},
    {"type":"LIGHTS","position":{"x":36,"y":58}},{"type":"DOORS","position":{"x":61,"y":31}},
    {"type":"LOAD","position":{"x":78,"y":46}},{"type":"TRAILER_ATTACHMENT","position":{"x":88,"y":53}}]
  },
  [EEquipmentModel.WABASH_TRAILER_DURAPLATE]: {
    name: 'Wabash Duraplate semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.WABASH,
    image: WABASH_TRAILER_DURAPLATE_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":74}},{"type":"SUSPENSION","position":{"x":47,"y":65}},
    {"type":"WHEELS","position":{"x":43,"y":72}},{"type":"FRAME","position":{"x":34,"y":62}},
    {"type":"BODY","position":{"x":28,"y":51}},{"type":"SUPPORT","position":{"x":14,"y":73}},
    {"type":"LIGHTS","position":{"x":71,"y":65}},{"type":"DOORS","position":{"x":74,"y":47}},
    {"type":"LOAD","position":{"x":41,"y":55}},{"type":"TRAILER_ATTACHMENT","position":{"x":7,"y":62}}]
  },
  [EEquipmentModel.WABASH_TRAILER_DURAPLATE_HD]: {
    name: 'Wabash Duraplate HD semi trailer',
    type: EEquipmentModelType.SEMI_TRAILER,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRAILER].TRAILER_2_AXLES,
    brand: EBrand.WABASH,
    image: WABASH_TRAILER_DURAPLATE_HD_IMG,
    parts: [{"type":"BRAKES","position":{"x":51,"y":71}},{"type":"SUSPENSION","position":{"x":46,"y":64}},
    {"type":"WHEELS","position":{"x":45,"y":72}},{"type":"BODY","position":{"x":31,"y":37}},
    {"type":"FRAME","position":{"x":21,"y":59}},{"type":"SUPPORT","position":{"x":14,"y":67}},
    {"type":"LIGHTS","position":{"x":69,"y":65}},{"type":"DOORS","position":{"x":72,"y":50}},
    {"type":"LOAD","position":{"x":31,"y":50}},{"type":"TRAILER_ATTACHMENT","position":{"x":5,"y":57}}]
  },
  [EEquipmentModel.WESTERN_STAR_TRUCKS_5700_FE]: {
    name: 'Western Star Trucks 5700 FE',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.WESTERN_STAR_TRUCKS,
    image: WESTERN_STAR_TRUCKS_5700_FE_IMG,
    parts: [{"type":"BRAKES","position":{"x":82,"y":67}},{"type":"SUSPENSION","position":{"x":82,"y":60}},
    {"type":"WHEELS","position":{"x":86,"y":66}},{"type":"BODY","position":{"x":80,"y":52}},
    {"type":"FRAME","position":{"x":78,"y":64}},{"type":"INTERIOR","position":{"x":55,"y":36}},
    {"type":"BATTERY","position":{"x":75,"y":59}},{"type":"ELECTRONIC","position":{"x":50,"y":44}},
    {"type":"LIGHTS","position":{"x":41,"y":61}},{"type":"FIFTH_WHEEL","position":{"x":85,"y":61}},
    {"type":"COMPRESSOR","position":{"x":13,"y":65}},{"type":"ENGINE","position":{"x":24,"y":57}},
    {"type":"EXHAUST","position":{"x":76,"y":73}},{"type":"FUEL","position":{"x":75,"y":64}},
    {"type":"GEARBOX","position":{"x":25,"y":73}}]
  },
  [EEquipmentModel.WESTERN_STAR_TRUCKS_5800_FE]: {
    name: 'Western Star Trucks 5800 FE',
    type: EEquipmentModelType.SEMI_TRUCK,
    subType: EEquipmentModelSubType[EEquipmentModelType.SEMI_TRUCK].T6x2_big,
    brand: EBrand.WESTERN_STAR_TRUCKS,
    image: WESTERN_STAR_TRUCKS_5800_FE_IMG,
    parts: [{"type":"BRAKES","position":{"x":28,"y":71}},{"type":"SUSPENSION","position":{"x":22,"y":64}},
    {"type":"WHEELS","position":{"x":19,"y":69}},{"type":"BODY","position":{"x":31,"y":53}},
    {"type":"FRAME","position":{"x":34,"y":71}},{"type":"INTERIOR","position":{"x":46,"y":40}},
    {"type":"BATTERY","position":{"x":34,"y":57}},{"type":"ELECTRONIC","position":{"x":54,"y":46}},
    {"type":"LIGHTS","position":{"x":63,"y":57}},{"type":"FIFTH_WHEEL","position":{"x":29,"y":60}},
    {"type":"COMPRESSOR","position":{"x":71,"y":66}},{"type":"ENGINE","position":{"x":79,"y":52}},
    {"type":"EXHAUST","position":{"x":41,"y":73}},{"type":"FUEL","position":{"x":38,"y":66}},
    {"type":"GEARBOX","position":{"x":80,"y":69}}]
  },
};


export default EEquipmentModel;
