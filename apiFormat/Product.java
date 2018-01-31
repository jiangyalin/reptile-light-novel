
	/** 商品条码 */
	private String barcode;

	/** 商品条码类型 */
	private Integer barcodeType;

	/** 编号 */
	private String sn;

	/** 名称 */
	private String name;

	/** 全称 */
	private String fullName;

	/** 类型 */
	private Type type;

	/**专销商品类型*/
	private String soleProductType;

	/** 产品属性 */
	private ProductAttributes productAttributes;

	@Transient
	private String productAttribute;

	/** 价格砍级 */
	private PriceLevel priceLevel;

	/** 销售价 */
	private BigDecimal price;

	/** 成本价 */
	private BigDecimal cost;

	/** 市场价 */
	private BigDecimal marketPrice;

	/** 展示图片 */
	private String image;

	/** 单位 */
	private String unit;

	/** 重量 */
	private Integer weight;

	/** 库存 */
	private Integer stock;

	/** 已分配库存 */
	private Integer allocatedStock;

	/** 库存备注 */
	private String stockMemo;

	/** 赠送积分 */
	private Long rewardPoint;

	/** 兑换积分 */
	private Long exchangePoint;

	/** 是否上架 */
	private Boolean isMarketable;

	/** 是否列出 */
	private Boolean isList;

	/** 是否置顶 */
	private Boolean isTop;

	/** 介绍 */
	private String introduction;

	/** 备注 */
	private String memo;

	/** 搜索关键词 */
	private String keyword;

	/** 页面标题 */
	private String seoTitle;

	/** 页面关键词 */
	private String seoKeywords;

	/** 页面描述 */
	private String seoDescription;

	/** 评分 */
	private Float score;

	/** 总评分 */
	private Long totalScore;

	/** 评分数 */
	private Long scoreCount;

	/** 点击数 */
	private Long hits;

	/** 周点击数 */
	private Long weekHits;

	/** 月点击数 */
	private Long monthHits;

	/** 临时销售价 */
	private BigDecimal tempPrice;

	/** 销量 */
	private Long sales;

	/** 周销量 */
	private Long weekSales;

	/** 月销量 */
	private Long monthSales;

	/** 周点击数更新日期 */
	private Date weekHitsDate;

	/** 月点击数更新日期 */
	private Date monthHitsDate;

	/** 周销量更新日期 */
	private Date weekSalesDate;

	/** 月销量更新日期 */
	private Date monthSalesDate;

	/** 商品属性值0 */
	private String attributeValue0;

	/** 商品属性值1 */
	private String attributeValue1;

	/** 商品属性值2 */
	private String attributeValue2;

	/** 商品属性值3 */
	private String attributeValue3;

	/** 商品属性值4 */
	private String attributeValue4;

	/** 商品属性值5 */
	private String attributeValue5;

	/** 商品属性值6 */
	private String attributeValue6;

	/** 商品属性值7 */
	private String attributeValue7;

	/** 商品属性值8 */
	private String attributeValue8;

	/** 商品属性值9 */
	private String attributeValue9;

	/** 商品属性值10 */
	private String attributeValue10;

	/** 商品属性值11 */
	private String attributeValue11;

	/** 商品属性值12 */
	private String attributeValue12;

	/** 商品属性值13 */
	private String attributeValue13;

	/** 商品属性值14 */
	private String attributeValue14;

	/** 商品属性值15 */
	private String attributeValue15;

	/** 商品属性值16 */
	private String attributeValue16;

	/** 商品属性值17 */
	private String attributeValue17;

	/** 商品属性值18 */
	private String attributeValue18;

	/** 商品属性值19 */
	private String attributeValue19;

	/** 商品分类 */
	private ProductCategory productCategory;

	/** 货品 */
	private Goods goods;

	/** 品牌 */
	private Brand brand;

	/** 最小单位价格(销售价)四舍五入 保留两位小树 */
	private BigDecimal minUnitPrice;

	/** 最小单位价格(市场价)四舍五入 保留两位小数 */
	private BigDecimal minUnitPrice2;

	/** 最小单位 */
	private String minUnit;

	/** 赠品数量 */
	private String donationNum;

	/** 赠品数量 */
	private String giveNum;

	/** erp中对供应商id */
	private String supplierErpCode;

	/** erp中对应供应商名称 */
	private String supplierErpName;

	/** 供应商 */
	private Supplier supplier;

	/** 审核不通过备注 */
	private String auditMemo;

	/** 强制下架备注 */
	private String offMemo;

	/** 佣金 */
	private BigDecimal commission;

	/** 是否参与特卖活动 */
	private TimebuyItem timebuyItem;
	
	/** 推荐 ：1 首页推荐 */
	private String recommend;
