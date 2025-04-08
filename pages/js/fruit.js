fetch("../../food_dataset.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("데이터를 불러오지 못했습니다.");
    }
    return response.json();
  })
  .then((data) => {
    const fruits = data.fruits.map((item) => {
      return {
        id: item.id,
        title: item.title,
        classification: item.classification,
        price: item.price,
        discount_price: item.discount_price,
        discount_rate: item.discount_rate,
        imgURL: item.imgURL,
      };
    });
  })
  .catch((error) => {
    console.error("에러:", error);
  });
