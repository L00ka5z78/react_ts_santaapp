
//       const isPasswordCorrect = bcrypt.compareSync(
//         req.body.password,
//         data[0].password
//       );
//       if (isPasswordCorrect)
//         return res.status(400).json('Wrong username or password');
//
//       const token = jwt.sign({ id: data[0].id }, 'jwtkey');
//       const { password, ...otherData } = data[0];
//
//       res
//         .cookie('access_token', token, {
//           httpOnly: true,
//         })
//         .status(200)
//         .json(otherData);
//     };
// };
//
// export const logout = () => {};
