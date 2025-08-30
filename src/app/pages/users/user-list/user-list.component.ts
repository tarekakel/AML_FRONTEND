import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { ApiResponse } from '../../../models/shared';
import { ToastrService } from 'ngx-toastr';
// import { ApiResponse } from '../../../models/shared';
import {extractErrorMessage} from '../../../shared/helper/helper'
import { AuthService } from '../../../auth/auth.service';
@Component({
  selector: 'app-users',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UsersComponent {
  res: any;
  isEditing = false;
  editingUserId: number | null = null;
  searchTerm = '';
  page = 1;
  pageSize = 10;
  totalPages: number = 0;
  totalCount: number = 0;
  isLoading = false;
  isResetLoading = false;
  showConfirmModal = false;

  showModal = false;
  selectedUser: User | null = null;

  constructor(private userService: UserService, private toastr: ToastrService, private authService: AuthService) {

  }

  ngOnInit() {

    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;

    this.userService
      .getUsers(this.page, this.pageSize, this.searchTerm)
      .subscribe((result: ApiResponse<User[]>) => {

        this.res = result;
        this.totalCount = this.res.meta.total;
        this.totalPages = this.res.meta.totalPages;
        this.isLoading = false;
      });
  }

  onSearchChange() {
    this.page = 1;
    this.loadUsers();
  }

  goToPage(pageNumber: number) {
    // if (pageNumber < 1 || pageNumber > this.totalPages) return;
    this.page = pageNumber;
    this.loadUsers();
  }

  startEdit(user: User) {
    this.isEditing = true;
    this.editingUserId = user.id;
    // this.userForm.patchValue({
    //   name: user.username,
    //   email: user.email,
    //   role: user.role,
    // });
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingUserId = null;
    // this.userForm.reset();
  }

  saveUser(user: User) {

    // Decide which API call to make
    this.showModal = false;

    const obs$ = user.id
      ? this.userService.updateUser(user)
      : this.userService.addUser(user);
    obs$.subscribe({
      next: (result: ApiResponse<User>) => {

        const action = user.id ? 'updated' : 'created';
        if (result.isSuccess) {
          this.toastr.success(`User successfully ${action}.`);
          this.loadUsers();
        }
        else {
          const msg = extractErrorMessage(result.errors);
          this.toastr.error(msg, 'Error');
        }

      },
      error: (err: any) => {

        const action = user.id ? 'updating' : 'creating';

        const msg = extractErrorMessage(err.error);
        this.toastr.error(msg, 'Error');
      }
    });


    // if (user.id) {
    //   this.userService.updateUser(user).subscribe(console.log);;
    // } else {
    //   this.userService.addUser(user).subscribe(console.log);
    // }

    this.cancelEdit();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      //    this.userService.deleteUser(id);
    }
  }


  openModal(user: User | null) {
    this.selectedUser = user;
    this.showModal = true;
  }



  resetPassword(user: any) {
    this.selectedUser = user;
    this.showConfirmModal = true;
  }

  handleCancel() {
    this.showConfirmModal = false;
    this.selectedUser = null;
  }

  handleConfirm() {
    this.isResetLoading = true;
    this.authService.requestPasswordReset(this.selectedUser!.email).subscribe({
      next: () => {
        this.toastr.success('Password reset email sent.', 'success');
        this.showConfirmModal = false;
        this.isResetLoading = false;
      },
      error: () => {
        this.toastr.error('Error sending reset email.', 'error');
        this.showConfirmModal = false;
        this.isResetLoading = false;
      },

    });
  }

}
