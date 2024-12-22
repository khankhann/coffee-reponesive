const arrProduct = [
  {
    name: "nước cam",
    image: "image/nuoccam.jpg",
    price: 30000,
  },
  {
    name: "nước dừa",
    image: "image/nuoc-dua.jpg",
    price: 30000,
  },
  {
    name: "trà sữa chân trâu",
    image: "image/trasuachantrau.jpg",
    price: 30000,
  },
  {
    name: "nước cam",
    image: "image/nuoccam.jpg",
    price: 30000,
  },
  {
    name: "nước dừa",
    image: "image/nuoc-dua.jpg",
    price: 30000,
  },
  {
    name: "trà sữa chân trâu",
    image: "image/trasuachantrau.jpg",
    price: 30000,
  },
  {
    name: "nước cam",
    image: "image/nuoccam.jpg",
    price: 30000,
  },
  {
    name: "nước dừa",
    image: "image/nuoc-dua.jpg",
    price: 30000,
  },
  {
    name: "trà sữa chân trâu",
    image: "image/trasuachantrau.jpg",
    price: 30000,
  },
  {
    name: "nước cam",
    image: "image/nuoccam.jpg",
    price: 30000,
  },
  {
    name: "nước dừa",
    image: "image/nuoc-dua.jpg",
    price: 30000,
  },
  {
    name: "trà sữa chân trâu",
    image: "image/trasuachantrau.jpg",
    price: 30000,
  },
  {
    name: "nước cam",
    image: "image/nuoccam.jpg",
    price: 30000,
  },
  {
    name: "nước dừa",
    image: "image/nuoc-dua.jpg",
    price: 30000,
  },
  {
    name: "trà sữa chân trâu",
    image: "image/trasuachantrau.jpg",
    price: 30000,
  },
  {
    name: "nước cam",
    image: "image/nuoccam.jpg",
    price: 30000,
  },
  {
    name: "nước dừa",
    image: "image/nuoc-dua.jpg",
    price: 30000,
  },
  {
    name: "nước dừa",
    image: "image/nuoc-dua.jpg",
    price: 30000,
  },
];

var arrInfoMember = [
  {
    name: "Nguyen Khang",
    image: "",
    role: "dev",
    link: "https://www.facebook.com/khangeward/",
  },
  {
    name: "Giang",
    image: "",
    role: "dev",
  },
  {
    name: "Nguyen",
    image: "",
    role: "dev",
  },
  {
    name: "khang",
    image: "",
    role: "dev",
  },
  {
    name: "khang",
    image: "",
    role: "dev",
  },
];
const infoMemberBox = document.querySelector(".info-member");
// laod danh sách thành viên
function loadMember(arrInfoMember) {
  const html = arrInfoMember
    .map((info) => {
      return `
          <div class="col-lg-3 col-md-6 d-flex align-items-stretch aos-init aos-animate" data-aos="fa-brandsde-up"
          data-aos-delay="400">
          <div class="team-member">
            <div class="member-img"><img src="https://prium.github.io/slick/assets/images/portraits/square/10.jpg"
                class="img-fluid" alt="">
              <div class="social"><a href="${info.link}"><i class="fa-brands fa-twitter"></i></a><a href="${info.link}"><i
                    class="fa-brands fa-facebook"></i></a><a href="${info.link}"><i class="fa-brands fa-instagram"></i></a><a
                  href="${info.link}"><i class="fa-brands fa-linkedin"></i></a></div>
            </div>
            <div class="member-info">
              <h4>${info.name}</h4><span>${info.role}</span>
            </div>
          </div>
        </div>
    `;
    })
    .join("");
  infoMemberBox.innerHTML = html;
}
loadMember(arrInfoMember);

const productList = document.querySelector(".row-product");

function loadProduct(arrProduct) {
  const html = arrProduct
    .map(function (product) {
      return `
      
      <div class="productcc col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div class="product-card">
            <div class="product-image"><img src="${product.image}"></div>
            <div class="product-information">
              <h3>${product.name} </h3>
              <p>${product.price} VNĐ</p><button class="btn btn-outline-danger btn-product"><i class="fa-solid fa-cart-plus"></i>
               Thêm vào giỏ hàng</button>
            </div>
          </div>
      </div>
      
      
    
      `;
    })
    .join("");
  productList.innerHTML = html;
}
loadProduct(arrProduct);

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = JSON.parse(localStorage.getItem("totalPrice")) || 0;

  const savedUserInfo = JSON.parse(localStorage.getItem("userInfo")) || {
    name: "",
    phone: "",
    address: "",
  };

  const cartIcon = document.querySelector("#toggle-cart");
  const cartContainer = document.querySelector(".cart-container");
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalPriceElement = document.querySelector(".total-price");
  const cartCountElement = document.querySelector(".cart-count");

  // Hiển thị/Ẩn giỏ hàng
  cartIcon.addEventListener("click", () => {
    cartContainer.style.display =
      cartContainer.style.display === "block" ? "none" : "block";
    cartContainer.classList.toggle("active");
  });

  // Thêm sản phẩm vào giỏ hàng
  document.querySelectorAll(".btn-product").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productCard = event.target.closest(".product-card");
      const imageSrc = productCard.querySelector(".product-image img").src;
      const name = productCard.querySelector("h3").textContent;
      const priceText = productCard.querySelector("p").textContent;
      const price = parseInt(priceText.replace(/[^0-9]/g, ""), 10);

      if (isNaN(price)) {
        console.error("Giá không hợp lệ:", priceText);
        return;
      }

      const existingProduct = cart.find((item) => item.name === name);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({ imageSrc, name, price, quantity: 1 });
      }

      updateCartUI();
      saveCartToLocalStorage();
    });
  });

  // Lưu giỏ hàng và tổng tiền vào localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }

  // Cập nhật giao diện giỏ hàng
  function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.imageSrc}" style="width: 50px;"></td>
        <td>${item.name}</td>
        <td>
          <button class="btn btn-sm btn-secondary btn-decrease" data-index="${index}">-</button>
          ${item.quantity}
          <button class="btn btn-sm btn-secondary btn-increase" data-index="${index}">+</button>
        </td>
        <td>${(item.price * item.quantity).toLocaleString()} đ</td>
        <td><button class="btn btn-danger btn-delete" data-index="${index}">Xóa</button></td>
      `;
      cartItemsContainer.appendChild(row);
    });

    cartCountElement.textContent = totalItems;
    totalPriceElement.textContent = totalPrice.toLocaleString();

    document.querySelectorAll(".btn-decrease").forEach((button) =>
      button.addEventListener("click", () => {
        const index = button.dataset.index;
        cart[index].quantity--;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
        updateCartUI();
        saveCartToLocalStorage();
      })
    );

    document.querySelectorAll(".btn-increase").forEach((button) =>
      button.addEventListener("click", () => {
        const index = button.dataset.index;
        cart[index].quantity++;
        updateCartUI();
        saveCartToLocalStorage();
      })
    );

    document.querySelectorAll(".btn-delete").forEach((button) =>
      button.addEventListener("click", () => {
        const index = button.dataset.index;
        cart.splice(index, 1);
        updateCartUI();
        saveCartToLocalStorage();
      })
    );
  }

  const checkoutButton = document.getElementById("checkout-button");
  const submitCheckoutButton = document.querySelector("#submit-checkout");
  const checkoutModal = document.createElement("div");

  // Tạo modal thanh toán
  checkoutModal.id = "checkoutModal";
  checkoutModal.style.display = "none";
  checkoutModal.style.position = "fixed";
  checkoutModal.style.top = "50%";
  checkoutModal.style.left = "50%";
  checkoutModal.style.transform = "translate(-50%, -50%)";
  checkoutModal.style.backgroundColor = "#CC9966";
  checkoutModal.style.padding = "20px";
  checkoutModal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.6)";
  checkoutModal.style.zIndex = "10000";

  checkoutModal.innerHTML = `
    <h3>Thông tin thanh toán</h3>
    <form id="checkout-form">
      <div class="mb-3">
        <label for="name">Tên</label>
        <input type="text" id="name" placeholder="Nhập tên của bạn" value="${savedUserInfo.name}" style="width: 100%; padding: 8px; margin: 5px 0;">
      </div>
      <div class="mb-3">
        <label for="phone">Số điện thoại</label>
        <input type="text" id="phone" placeholder="Nhập số điện thoại của bạn" value="${savedUserInfo.phone}" style="width: 100%; padding: 8px; margin: 5px 0;">
      </div>
      <div class="mb-3">
        <label for="address">Địa chỉ</label>
        <input type="text" id="address" placeholder="Nhập địa chỉ của bạn" value="${savedUserInfo.address}" style="width: 100%; padding: 8px; margin: 5px 0;">
      </div>
      <button type="button" id="close-checkout" style="padding: 10px 20px; margin-right: 10px;">Đóng</button>
      <button type="button" id="submit-checkout" style="padding: 10px 20px;">Xác nhận</button>
    </form>
  `;
  document.body.appendChild(checkoutModal);

  // Hiển thị modal khi nhấn nút "Thanh toán"
  checkoutButton.addEventListener("click", () => {
    checkoutModal.style.display = "block";
  });

  // Đóng modal
  document.getElementById("close-checkout").addEventListener("click", () => {
    checkoutModal.style.display = "none";
  });

  // Xử lý khi nhấn nút "Xác nhận"
  submitCheckoutButton.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
      alert("Vui lòng nhập đầy đủ tên, số điện thoại và địa chỉ!");
      return;
    }

    alert(
      `Cảm ơn ${name}! Đơn hàng của bạn sẽ được gửi đến địa chỉ: ${address}`
    );

    // Lưu dữ liệu người dùng vào localStorage
    localStorage.setItem("userInfo", JSON.stringify({ name, phone, address }));

    document.getElementById("checkout-form").reset();
    checkoutModal.style.display = "none";

    // Lưu giỏ hàng và tổng tiền vào localStorage
    saveCartToLocalStorage();
  });

  // Cập nhật giao diện lần đầu
});
function loadComments() {
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  const commentList = document.getElementById("comments");

  savedComments.forEach((comment) => {
    const commentItem = document.createElement("li");
    commentItem.classList.add("list-group-item");
    commentItem.textContent = comment.name + ": " + comment.text;
    commentList.appendChild(commentItem);
  });
}

// Lưu bình luận vào localStorage
function saveComment(name, commentText) {
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.push({ name: name, text: commentText });
  localStorage.setItem("comments", JSON.stringify(savedComments));
}

// Lắng nghe sự kiện khi nhấn nút gửi bình luận
document
  .getElementById("submit-comment")
  .addEventListener("click", function () {
    const name = document.getElementById("name-input").value.trim();
    const comment = document.getElementById("comment-input").value.trim();

    if (name && comment) {
      // Hiển thị bình luận ngay lập tức
      const commentList = document.getElementById("comments");
      const commentItem = document.createElement("li");
      commentItem.classList.add("list-group-item");
      commentItem.textContent = name + ": " + comment;
      commentList.appendChild(commentItem);

      // Lưu bình luận vào localStorage
      saveComment(name, comment);

      // Xóa nội dung sau khi gửi
      document.getElementById("name-input").value = "";
      document.getElementById("comment-input").value = "";
    } else {
      alert("Vui lòng nhập tên và bình luận!");
    }
  });

// Tải bình luận đã lưu từ localStorage khi trang được tải lại
loadComments();
