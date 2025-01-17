const groupNames = [
  "AI",
  "Amusement",
  "China",
  "Download",
  "GAM",
  "Scholar",
  "Tech"
]

const customGroups = [
  {
    "name": "HK",
    "pattern": "/^(.*)(香港|Hong Kong|HK|澳门)+(.*)$/"
  },
  {
    "name": "TW",
    "pattern": "/^(.*)(台湾|TW|TaiWan|Taiwan)+(.*)$/"
  },
  {
    "name": "SG",
    "pattern": "/^(.*)(新加坡|SG|Singapore|狮城)+(.*)$/"
  },
  {
    "name": "KR",
    "pattern": "/^(.*)(韩国|KR|Korea)+(.*)$/"
  },
  {
    "name": "JP",
    "pattern": "/^(.*)(日本|JP|Japan)+(.*)$/"
  },
  {
    "name": "US",
    "pattern": "/^(.*)(美国|US|USA)+(.*)$/"
  },
  {
    "name": "UK",
    "pattern": "/^(.*)(英国|UK)+(.*)$/"
  },
  {
    "name": "Asia",
    "pattern": "/^(.*)(马来西亚|马尔代夫|柬埔寨|泰国|TG|缅甸|老挝|越南|不丹|文莱|朝鲜|菲律宾|印尼|Indonsia|印度|India|蒙古|约旦|伊朗|巴林|阿曼|以色列|土耳其|TR|尼泊尔|东帝汶|孟加拉|黎巴嫩|伊拉克|叙利亚|阿富汗|卡塔尔|阿联酋|阿塞拜疆|亚美尼亚|格鲁吉亚|巴基斯坦|斯里兰卡|沙特阿拉伯|哈萨克斯坦|吉尔吉斯斯坦|乌兹别克斯坦)+(.*)/"
  },
  {
    "name": "Oceania",
    "pattern": "/^(.*)(澳大利亚|Australia|AU|新西兰|关岛|斐济|南极)+(.*)/"
  },
  {
    "name": "America",
    "pattern": "/^(.*)(加拿大|Canada|墨西哥|巴拿马|百慕大|格陵兰|哥斯达黎加|英属维尔京|巴西|Brazil|智利|Chile|秘鲁|古巴|阿根廷|Argentina|乌拉圭|牙买加|苏里南|荷属库拉索|哥伦比亚|厄瓜多尔|委内瑞拉|危地马拉|波多黎各|开曼群岛|法属圭亚那|特立尼达和多巴哥)+(.*)/"
  },
  {
    "name": "Europe",
    "pattern": "/^(.*)(Netherlands|荷兰|Russia|俄罗斯|Germany|德国|DE|France|法国|Switzerland|瑞士|Sweden|瑞典|Bulgaria|保加利亚|Austria|奥地利|Ireland|爱尔兰|Turkey|Hungary|法国|英国|马恩岛|德国|丹麦|挪威|瑞典|芬兰|冰岛|瑞士|捷克|希腊|荷兰|波兰|黑山|俄罗斯|乌克兰|匈牙利|卢森堡|奥地利|意大利|梵蒂冈|比利时|爱尔兰|立陶宛|西班牙|葡萄牙|安道尔|马耳他|摩纳哥|保加利亚|克罗地亚|北马其顿|塞尔维亚|塞浦路斯|拉脱维亚|摩尔多瓦|斯洛伐克|爱沙尼亚|白俄罗斯|罗马尼亚|直布罗陀|圣马力诺|法罗群岛|奥兰群岛|斯洛文尼亚|阿尔巴尼亚|波黑共和国|列支敦士登)+(.*)/"
  },
  {
      "name": "Africa",
      "pattern": "/^(.*)(法属留尼汪|埃及|加纳|南非|摩洛哥|突尼斯|肯尼亚|卢旺达|佛得角|安哥拉|尼日利亚|毛里求斯|多哥)+(.*)/"
  }
]

function delOriginRuleAndProxys(config) {
  // 删除原始的proxy-groups和rules
  config['proxy-groups'] = [];
  config.rules = [];

  // 默认的PROXY策略组
  const defaultProxyGroup = {
    name: 'PROXY',
    type: 'select',
    proxies: []
  };

  // 为每个策略组名称生成完整的配置
  const proxyGroups = groupNames.map(name => {
    return {
      name: name,
      type: 'select',
      proxies: []
    };
  });

  // 先添加默认的PROXY策略组
  proxyGroups.unshift(defaultProxyGroup);

  // 添加默认的Reject和Final策略组
  proxyGroups.push(
    {
      name: 'Reject',
      type: 'select',
      proxies: ['REJECT', 'PROXY']
    },
    {
      name: 'Final',
      type: 'select',
      proxies: ['PROXY', 'DIRECT']
    }
  );

  // 将新的策略组添加到原始对象中
  config['proxy-groups'] = proxyGroups;

  return config;
}

function assignProxyGroups(config, { MustProxy, DirectFirst, ProxyFirst, baseProxy, AI, HamiVideo, StarPlusLogin, StarPlus }) {
  const MustProxyGroup = ["Amusement", "GAM"];
  const DirectFirstGroup = ["China", ];
  const ProxyFirstGroup = ["Download", "GAM", "Scholar", "Tech"];

  const baseGroup = groupNames;
  const { 'proxy-groups': proxy = [] } = config;

  proxy.forEach(group => {
    if (MustProxyGroup.includes(group.name)) {
      group.proxies = MustProxy;
    } else if (DirectFirstGroup.includes(group.name)) {
      group.proxies = DirectFirst;
    } else if (ProxyFirstGroup.includes(group.name)) {
      group.proxies = ProxyFirst;
    } else if (group.name === "PROXY") {
      group.proxies = baseProxy;
    } else if (group.name === "AI") {
      group.proxies = AI;
    } else if (group.name === "HamiVideo") {
      group.proxies = HamiVideo;
    } else if (group.name === "StarPlusLogin") {
      group.proxies = StarPlusLogin;
    } else if (group.name === "StarPlus") {
      group.proxies = StarPlus;
    } else if (baseGroup.includes(group.name)) {
      group.proxies = ProxyFirst;
    }
  });

  config['proxy-groups'] = proxy;
  return config;
}

function addProxyToGroup(config) {
  // 检查config对象是否存在并初始化必要的属性
  if (!config || !config.proxies) {
    throw new Error("config is undefined, null, or lacks the 'proxies' property");
  }

  // 根据加载的规则创建正则表达式对象
  const regions = customGroups.reduce((acc, group) => {
    // 从字符串格式的正则表达式中创建RegExp对象
    acc[group.name] = new RegExp(group.pattern.slice(1, -1));
    return acc;
  }, {});

  const proxyGroups = Object.keys(regions).map(region => {
    const existingGroup = config['proxy-groups'] && config['proxy-groups'].find(g => g.name === region);
    if (existingGroup) {
      if (!existingGroup.proxies) {
        existingGroup.proxies = [];
      }
      return existingGroup;
    }
    return {
      name: region,
      type: 'select',
      proxies: []
    };
  });

  config.proxies.forEach(proxy => {
    if (proxy.name.includes('[Premium]')) {
      return;   
    }

    for (const [region, regex] of Object.entries(regions)) {
      if (regex.test(proxy.name)) {
        const group = proxyGroups.find(g => g.name === region);
        if (group) {
          group.proxies.push(proxy.name);
        }
      }
    }
  });

  config['proxy-groups'] = [
        ...config['proxy-groups'], 
        ...proxyGroups.filter(group => 
            (group.proxies && group.proxies.length > 0) || 
            (group.use && group.use.length > 0)
        ).filter(group => !config['proxy-groups'].some(existingGroup => existingGroup.name === group.name))
     ];

  return config;
}

function addRegionGroupsToCustomGroups(config) {
  const combineAndDeduplicate = (...arrays) => {
      return [...new Set(arrays.flat())];
  }
  const constructGroup = (specificNames, defaultNames) => {
      return combineAndDeduplicate(specificNames.filter(name => baseProxy.includes(name)), defaultNames);
  };

  const defaultGroup = ["PROXY", "Reject", "Final"];
  const baseGroup = groupNames;

  const baseProxy = config['proxy-groups']
    .filter(group => group.type === 'select') // 检查 type 属性
    .map(group => group.name)
    // 排除 baseGroup 中的项
    .filter(name => !baseGroup.includes(name))
    // 排除 defaultGroup 中的项
    .filter(name => !defaultGroup.includes(name));
  const MustProxy = ["PROXY", ...baseProxy];
  const DirectFirst = ["DIRECT", ...MustProxy];
  const ProxyFirst = ["PROXY", "DIRECT", ...baseProxy];
  const AI = constructGroup(["US", "UK"], MustProxy);
  const HamiVideo = constructGroup(["TW"], MustProxy);
  const StarPlusLogin = constructGroup(["America"], MustProxy);
  const StarPlus = constructGroup(["US"], MustProxy);

  const updatedRawObj = assignProxyGroups(config, { MustProxy, DirectFirst, ProxyFirst, baseProxy, AI, HamiVideo, StarPlusLogin, StarPlus });
  return updatedRawObj;
}

function main(config) {
  delOriginRuleAndProxys(config);
  addProxyToGroup(config);
  addRegionGroupsToCustomGroups(config);

  return config;
}

