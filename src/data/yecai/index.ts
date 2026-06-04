// 自动生成 by scripts/parse-yecai-html.py

import type { ContentBlock } from "./types";

import { ZuanjingGuanliBlocks } from "./zuanjing-guanli";
import { CaiyouGuanliBlocks } from "./caiyou-guanli";
import { QiyouJishuBlocks } from "./qiyou-jishu";
import { ShebeiGuanliBlocks } from "./shebei-guanli";
import { AnquanHuanjingBlocks } from "./anquan-huanjing";
import { TanqiuJishuBlocks } from "./tanqiu-jishu";
import { ChuliangZichanBlocks } from "./chuliang-zichan";
import { XiujingZuoyeBlocks } from "./xiujing-zuoye";
import { ZhushuiKaifaBlocks } from "./zhushui-kaifa";
import { ChongyouRecaiBlocks } from "./chongyou-recai";
import { HuaxueCaishoulvBlocks } from "./huaxue-caishoulv";
import { TianranqiKaifaBlocks } from "./tianranqi-kaifa";
import { ShengchanYunxingBlocks } from "./shengchan-yunxing";
import { XinxihuaJianhuaBlocks } from "./xinxihua-jianhua";
import { RengliZhongjieBlocks } from "./rengli-zhongjie";
import { JianzhiChuzhiBlocks } from "./jianzhi-chuzhi";
import { YoujiaFengxianBlocks } from "./youjia-fengxian";
import { XiangmuJingjipingjiaBlocks } from "./xiangmu-jingjipingjia";
import { TaheCaishoulvBlocks } from "./tahe-caishoulv";

export const yecaiBlocks: Record<string, ContentBlock[]> = {
  "zuanjing-guanli": ZuanjingGuanliBlocks,
  "caiyou-guanli": CaiyouGuanliBlocks,
  "qiyou-jishu": QiyouJishuBlocks,
  "shebei-guanli": ShebeiGuanliBlocks,
  "anquan-huanjing": AnquanHuanjingBlocks,
  "tanqiu-jishu": TanqiuJishuBlocks,
  "chuliang-zichan": ChuliangZichanBlocks,
  "xiujing-zuoye": XiujingZuoyeBlocks,
  "zhushui-kaifa": ZhushuiKaifaBlocks,
  "chongyou-recai": ChongyouRecaiBlocks,
  "huaxue-caishoulv": HuaxueCaishoulvBlocks,
  "tianranqi-kaifa": TianranqiKaifaBlocks,
  "shengchan-yunxing": ShengchanYunxingBlocks,
  "xinxihua-jianhua": XinxihuaJianhuaBlocks,
  "rengli-zhongjie": RengliZhongjieBlocks,
  "jianzhi-chuzhi": JianzhiChuzhiBlocks,
  "youjia-fengxian": YoujiaFengxianBlocks,
  "xiangmu-jingjipingjia": XiangmuJingjipingjiaBlocks,
  "tahe-caishoulv": TaheCaishoulvBlocks,
};
