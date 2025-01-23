<template>
    <div class="container my-5">
        <h2 class="text-center mb-4">Quản Lý Phiếu Nhập và Xuất Hàng</h2>

        <!-- Tabs -->
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="phieuNhap-tab" data-bs-toggle="tab" data-bs-target="#phieuNhap" type="button" role="tab" aria-controls="phieuNhap" aria-selected="true">Phiếu Nhập</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="phieuXuat-tab" data-bs-toggle="tab" data-bs-target="#phieuXuat" type="button" role="tab" aria-controls="phieuXuat" aria-selected="false">Phiếu Xuất</button>
            </li>
        </ul>

        <div class="tab-content mt-4" id="myTabContent">
            <!-- Phiếu Nhập -->
            <div class="tab-pane fade show active" id="phieuNhap" role="tabpanel" aria-labelledby="phieuNhap-tab">
                <h3 class="mb-4">Phiếu Nhập Hàng</h3>
                <form>
                    <!-- Thông tin chung -->
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="maPhieuNhap" class="form-label">Mã Phiếu</label>
                            <input type="text" class="form-control" id="maPhieuNhap" placeholder="Nhập mã phiếu">
                        </div>
                        <div class="col-md-6">
                            <label for="ngayNhap" class="form-label">Ngày Nhập</label>
                            <input type="date" class="form-control" id="ngayNhap">
                        </div>
                    </div>
                    <!-- Danh sách sản phẩm -->
                    <h4 class="my-4">Danh Sách Sản Phẩm</h4>
                    <div class="table-responsive">
                        <table class="table table-bordered text-center">
                            <thead class="table-primary">
                                <tr>
                                    <th>#</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Số Lượng</th>
                                    <th>Đơn Giá</th>
                                    <th>Thành Tiền</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><input type="text" class="form-control" placeholder="Tên sản phẩm"></td>
                                    <td><input type="number" class="form-control" placeholder="0"></td>
                                    <td><input type="number" class="form-control" placeholder="0"></td>
                                    <td>0</td>
                                    <td><button type="button" class="btn btn-danger btn-sm">Xóa</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-success">Thêm Sản Phẩm</button>
                    </div>
                    <div class="text-end">
                        <h5>Tổng Cộng: <span id="tongCongNhap">0</span> VND</h5>
                    </div>
                    <div class="text-center mt-4">
                        <button type="submit" class="btn btn-primary px-5">Lưu Phiếu Nhập</button>
                    </div>
                </form>
            </div>

            <!-- Phiếu Xuất -->
            <div class="tab-pane fade" id="phieuXuat" role="tabpanel" aria-labelledby="phieuXuat-tab">
                <h3 class="mb-4">Phiếu Xuất Hàng</h3>
                <form>
                    <!-- Thông tin chung -->
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="maPhieuXuat" class="form-label">Mã Phiếu</label>
                            <input type="text" class="form-control" id="maPhieuXuat" placeholder="Nhập mã phiếu">
                        </div>
                        <div class="col-md-6">
                            <label for="ngayXuat" class="form-label">Ngày Xuất</label>
                            <input type="date" class="form-control" id="ngayXuat">
                        </div>
                    </div>
                    <!-- Danh sách sản phẩm -->
                    <h4 class="my-4">Danh Sách Sản Phẩm</h4>
                    <div class="table-responsive">
                        <table class="table table-bordered text-center">
                            <thead class="table-warning">
                                <tr>
                                    <th>#</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Số Lượng</th>
                                    <th>Đơn Giá</th>
                                    <th>Thành Tiền</th>
                                    <th>Thao Tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td><input type="text" class="form-control" placeholder="Tên sản phẩm"></td>
                                    <td><input type="number" class="form-control" placeholder="0"></td>
                                    <td><input type="number" class="form-control" placeholder="0"></td>
                                    <td>0</td>
                                    <td><button type="button" class="btn btn-danger btn-sm">Xóa</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-success">Thêm Sản Phẩm</button>
                    </div>
                    <div class="text-end">
                        <h5>Tổng Cộng: <span id="tongCongXuat">0</span> VND</h5>
                    </div>
                    <div class="text-center mt-4">
                        <button type="submit" class="btn btn-primary px-5">Lưu Phiếu Xuất</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>